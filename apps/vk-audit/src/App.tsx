import { useCallback, useEffect, useMemo, useState } from 'react';
import { Panel, SplitCol, SplitLayout, View } from '@vkontakte/vkui';

import { DEFAULT_PERIOD_DAYS, DEFAULT_TZ_OFFSET } from './config';
import { buildPlan, buildTargets, findGrowthZones } from './engine/insights';
import { compute } from './engine/metrics';
import type { Finding, Metrics, PlanStage, Snapshot, Target } from './engine/types';
import { LoadingPanel } from './panels/LoadingPanel';
import { ReportPanel } from './panels/ReportPanel';
import { StartPanel } from './panels/StartPanel';
import { VKApi } from './vk/api';
import {
  authorizeViaBridge, isInsideVK, launchUserId, loadSession, readSessionFromRedirect,
  saveSession, startStandaloneAuth, type Session,
} from './vk/auth';
import { collect, listAdminGroups, type AdminGroup } from './vk/collect';
import { buildDemoSnapshot } from './vk/demo';
import {
  buildDemoRivals, collectRivals, parseRivalList, suggestRivals, type Suggestion,
} from './vk/rivals';
import type { RivalsReport } from './engine/rivals';

export interface Report {
  snapshot: Snapshot;
  metrics: Metrics;
  findings: Finding[];
  plan: PlanStage[];
  targets: Target[];
}

/** Один и тот же расчёт для живых данных и для демо. */
function buildReport(snapshot: Snapshot): Report {
  const metrics = compute(snapshot, DEFAULT_TZ_OFFSET);
  const findings = findGrowthZones(metrics, snapshot.profile);
  return {
    snapshot,
    metrics,
    findings,
    plan: buildPlan(findings, metrics),
    targets: buildTargets(metrics),
  };
}

export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [adminGroups, setAdminGroups] = useState<AdminGroup[]>([]);
  const [adminGroupsState, setAdminGroupsState] = useState<'idle' | 'busy' | 'done'>('idle');
  const [panel, setPanel] = useState<'start' | 'loading' | 'report'>('start');
  const [stage, setStage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [rivals, setRivals] = useState<RivalsReport | null>(null);
  const [rivalsBusy, setRivalsBusy] = useState(false);
  const [rivalsStage, setRivalsStage] = useState('');
  const [periodDays, setPeriodDays] = useState(DEFAULT_PERIOD_DAYS);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const insideVK = useMemo(isInsideVK, []);

  // внутри ВК идентификатор приезжает в параметрах запуска, снаружи — вместе
  // с ключом доступа; без него кнопку «моя страница» показывать нечему
  const selfId = useMemo(() => launchUserId(), []) ?? session?.userId ?? null;

  useEffect(() => {
    const restored = readSessionFromRedirect() ?? loadSession();
    if (restored) setSession(restored);
  }, []);

  // как только ключ появился — список своих сообществ подтягивается сам:
  // чаще всего аудируют именно их, и вводить ссылку руками не нужно
  useEffect(() => {
    if (!session || adminGroupsState !== 'idle') return;
    setAdminGroupsState('busy');
    const api = new VKApi(session.token, session.transport);
    listAdminGroups(api)
      .then(setAdminGroups)
      .catch(() => setAdminGroups([]))
      .finally(() => setAdminGroupsState('done'));
  }, [session, adminGroupsState]);

  /**
   * Ключ доступа — по требованию, а не отдельным экраном входа.
   *
   * Внутри ВКонтакте человек уже авторизован параметрами запуска
   * (`vk_user_id`), и просить его «войти» нельзя: правила платформы,
   * пункт 1.2.2, считают отдельную авторизацию избыточной. Ключ нужен
   * только для чтения страницы, поэтому и запрашивается в тот момент,
   * когда человек нажал «собрать» — тогда же ВК показывает окно прав
   * и понятно, зачем они.
   *
   * Возвращает сессию, а не полагается на состояние: после `setSession`
   * значение появится только на следующем проходе, а собирать надо сразу.
   */
  const ensureSession = useCallback(async (): Promise<Session | null> => {
    if (session) return session;
    if (!insideVK) {
      // вне ВК параметров запуска нет — там остаётся обычный вход
      startStandaloneAuth();
      return null;
    }
    const next = await authorizeViaBridge();
    saveSession(next);
    setSession(next);
    return next;
  }, [session, insideVK]);

  /**
   * Загрузить свои сообщества по кнопке.
   *
   * Раньше список появлялся сам после входа, но входа больше нет:
   * внутри ВК ключ запрашивается только под действие. Показывать окно
   * прав при открытии приложения нельзя — это ровно та навязчивость,
   * из-за которой правила и требуют бесшовности. Поэтому список
   * подтягивается по явному нажатию, а дальше сам.
   */
  const loadAdminGroups = useCallback(async () => {
    if (adminGroupsState === 'busy') return;
    setError(null);
    setAdminGroupsState('busy');
    try {
      const active = await ensureSession();
      if (!active) {
        setAdminGroupsState('idle');
        return;
      }
      const api = new VKApi(active.token, active.transport);
      setAdminGroups(await listAdminGroups(api));
      setAdminGroupsState('done');
    } catch {
      setAdminGroups([]);
      setAdminGroupsState('done');
    }
  }, [ensureSession, adminGroupsState]);

  const runAudit = useCallback(async (target: string) => {
    setError(null);
    let active: Session | null;
    try {
      active = await ensureSession();
    } catch {
      // отказ в правах — не ошибка приложения, объясняем и даём повторить
      setError('Без доступа к данным ВКонтакте отчёт не собрать: приложение '
        + 'читает записи и статистику страницы. Нажмите «собрать» ещё раз '
        + 'и подтвердите доступ.');
      return;
    }
    if (!active) return;

    setRivals(null);
    setSuggestion(null);
    setPanel('loading');
    setStage('Подключаемся к ВКонтакте');
    try {
      const api = new VKApi(active.token, active.transport);
      const snapshot = await collect(api, target, { periodDays, onProgress: setStage });
      setStage('Считаем метрики и зоны роста');
      setReport(buildReport(snapshot));
      setPanel('report');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось собрать аудит');
      setPanel('start');
    }
  }, [ensureSession, periodDays]);

  const runDemo = useCallback(() => {
    setError(null);
    setRivals(null);
    setReport(buildReport(buildDemoSnapshot()));
    setPanel('report');
  }, []);

  const runRivals = useCallback(async (raw: string) => {
    if (!session || !report) return;
    const targets = parseRivalList(raw);
    if (!targets.length) return;
    setRivalsBusy(true);
    setRivalsStage('');
    try {
      const api = new VKApi(session.token, session.transport);
      setRivals(await collectRivals(api, report.snapshot.meta.target, targets, {
        onProgress: setRivalsStage,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось собрать сравнение');
    } finally {
      setRivalsBusy(false);
    }
  }, [session, report]);

  /**
   * Подобрать кандидатов: сообществам — поиском по нише, личным
   * страницам — из подписок. Способы разные, кнопка одна.
   */
  const runSuggest = useCallback(async () => {
    if (!session || !report) return;
    setRivalsBusy(true);
    setRivalsStage('Подбираем кандидатов');
    try {
      const api = new VKApi(session.token, session.transport);
      setSuggestion(await suggestRivals(api, report.snapshot.profile, report.metrics, {
        onProgress: setRivalsStage,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось подобрать конкурентов');
    } finally {
      setRivalsBusy(false);
    }
  }, [session, report]);

  const runDemoRivals = useCallback(async () => {
    setRivals(await buildDemoRivals());
  }, []);

  return (
    <SplitLayout>
      <SplitCol autoSpaced>
        <View activePanel={panel}>
          <Panel id="start">
            <StartPanel
              signedIn={Boolean(session)}
              insideVK={insideVK}
              onSignIn={() => { void ensureSession().catch(() => undefined); }}
              selfId={selfId}
              adminGroups={adminGroups}
              adminGroupsState={adminGroupsState}
              onLoadAdminGroups={() => { void loadAdminGroups(); }}
              periodDays={periodDays}
              onPeriodChange={setPeriodDays}
              error={error}
              onAudit={runAudit}
              onDemo={runDemo}
            />
          </Panel>
          <Panel id="loading">
            <LoadingPanel stage={stage} />
          </Panel>
          <Panel id="report">
            {report && (
              <ReportPanel
                report={report}
                rivals={rivals}
                rivalsBusy={rivalsBusy}
                rivalsStage={rivalsStage}
                canCollectRivals={Boolean(session)}
                rivalsSuggestion={suggestion}
                onCollectRivals={runRivals}
                onSuggestRivals={runSuggest}
                onDemoRivals={runDemoRivals}
                onResetRivals={() => setRivals(null)}
                onBack={() => setPanel('start')}
              />
            )}
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}

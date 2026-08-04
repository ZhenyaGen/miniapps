import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Avatar, Button, Div, Footnote, Group, Header, HorizontalScroll,
  PanelHeader, PanelHeaderBack, Snackbar, Tabs, TabsItem,
} from '@vkontakte/vkui';

import type { Report } from '../App';
import type { RivalsReport } from '../engine/rivals';
import type { Suggestion } from '../vk/rivals';
import { AudienceView } from '../components/AudienceView';
import { ContentView } from '../components/ContentView';
import { GrowthZones } from '../components/GrowthZones';
import { PlanView } from '../components/PlanView';
import { RivalsView } from '../components/RivalsView';
import { SubscribeCard } from '../components/SubscribeCard';
import { Summary } from '../components/Summary';
import { OfferCard } from '../components/OfferCard';
import { Footer } from '../components/Footer';
import { buildBrief } from '../report/brief';
import { findGaps } from '../report/gaps';
import {
  AUTHOR_MESSAGE_URL, AUTHOR_NAME, DEEPSEEK_CHAT_URL, DONATE_URL, FEEDBACK_URL,
} from '../config';

type Tab = 'summary' | 'zones' | 'plan' | 'content' | 'rivals' | 'audience';

const TABS: Array<[Tab, string]> = [
  ['summary', 'Сводка'],
  ['zones', 'Зоны роста'],
  ['plan', 'План'],
  ['content', 'Контент'],
  ['rivals', 'Конкуренты'],
  ['audience', 'Аудитория'],
];

interface Props {
  report: Report;
  rivals: RivalsReport | null;
  rivalsBusy: boolean;
  rivalsStage: string;
  canCollectRivals: boolean;
  rivalsSuggestion: Suggestion | null;
  onCollectRivals: (targets: string) => void;
  onSuggestRivals: () => void;
  onDemoRivals: () => void;
  onResetRivals: () => void;
  onBack: () => void;
}

export function ReportPanel({
  report, rivals, rivalsBusy, rivalsStage, canCollectRivals,
  rivalsSuggestion,
  onCollectRivals, onSuggestRivals, onDemoRivals, onResetRivals, onBack,
}: Props) {
  const [tab, setTab] = useState<Tab>('summary');
  const [toast, setToast] = useState<string | null>(null);
  const { profile } = report.snapshot;
  /** Общий путь для любого текста: сначала мост, потом буфер браузера. */
  const copy = async (text: string, ok: string) => {
    try {
      await bridge.send('VKWebAppCopyText', { text });
      setToast(ok);
      return true;
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setToast(ok);
        return true;
      } catch {
        setToast('Скопировать не удалось — браузер запретил доступ к буферу');
        return false;
      }
    }
  };

  const copyBrief = () => copy(
    buildBrief(report, rivals),
    'Бриф скопирован — вставьте его в чат с ИИ',
  );

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>
        {profile.name || 'Отчёт'}
      </PanelHeader>

      <Group>
        <Div>
          <div className="report-head rise">
            <Avatar size={52} src={profile.photo ?? undefined} initials={profile.name.slice(0, 1)} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '1.0625rem', lineHeight: 1.25 }}>
                {profile.name}
              </div>
              <div style={{ color: 'var(--vkui--color_text_secondary)', fontSize: '0.8125rem', marginTop: 2 }}>
                {profile.url.replace('https://', '')}
              </div>
              <div style={{ color: 'var(--vkui--color_text_tertiary)', fontSize: '0.75rem', marginTop: 2 }}>
                {`${report.metrics.period.from} — ${report.metrics.period.to}`}
              </div>
            </div>
          </div>
        </Div>
        <Tabs
          layoutFillMode="shrinked"
          withScrollToSelectedTab
          scrollBehaviorToSelectedTab="center"
        >
          <HorizontalScroll arrowSize="m">
            {TABS.map(([id, label]) => (
              <TabsItem key={id} id={id} selected={tab === id} onClick={() => setTab(id)}>
                {label}
              </TabsItem>
            ))}
          </HorizontalScroll>
        </Tabs>
      </Group>

      {tab === 'summary' && (
        <>
          <Summary report={report} />
          <OfferCard findings={report.findings} />
          {report.snapshot.meta.source !== 'demo' && (
            <SubscribeCard target={report.snapshot.profile.screen_name} period="раз в неделю" />
          )}
        </>
      )}
      {tab === 'zones' && (
        <GrowthZones
          findings={report.findings}
          gaps={findGaps({ metrics: report.metrics, rivals })}
        />
      )}
      {tab === 'plan' && <PlanView plan={report.plan} />}
      {tab === 'content' && <ContentView metrics={report.metrics} />}
      {tab === 'rivals' && (
        <RivalsView
          report={rivals}
          busy={rivalsBusy}
          stage={rivalsStage}
          canCollect={canCollectRivals}
          isGroup={report.snapshot.profile.kind === 'group'}
          suggestion={rivalsSuggestion}
          isDemo={report.snapshot.meta.source === 'demo'}
          onCollect={onCollectRivals}
          onSuggest={onSuggestRivals}
          onDemo={onDemoRivals}
          onReset={onResetRivals}
        />
      )}
      {tab === 'audience' && <AudienceView metrics={report.metrics} />}

      <Group header={<Header subtitle="весь отчёт текстом: метрики, форматы, зоны роста, план и готовые ряды под диаграммы">
        Разобрать с ИИ
      </Header>}
      >
        <Div style={{ display: 'grid', gap: 10 }}>
          <Button
            size="l"
            stretched
            appearance="positive"
            href={DEEPSEEK_CHAT_URL}
            target="_blank"
            rel="noreferrer"
            // копируем в том же клике: открытие вкладки браузер разрешает
            // только синхронно, поэтому ссылку не подменяем на window.open
            onClick={copyBrief}
          >
            🤖 Открыть DeepSeek
          </Button>
          <Button size="l" stretched mode="secondary" onClick={copyBrief}>
            📋 Скопировать бриф
          </Button>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
            Ключ не нужен: бриф уезжает в буфер обмена, а разбор пишет ИИ
            в своём чате. Числа в брифе уже посчитаны — просить пересчитать
            их не нужно. В конце брифа лежат готовые ряды: по ним модель
            рисует диаграммы, ничего не выдумывая.
          </Footnote>
        </Div>
      </Group>

      <Group header={<Header>Сделать за вас</Header>}>
        <Div>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 10 }}>
            Разбор показывает, что не так. Если нужно, чтобы это починили —
            позиционирование, айдентика, контент-план под ваш бизнес —
            напишите мне.
          </Footnote>
          <Button
            size="l"
            stretched
            href={AUTHOR_MESSAGE_URL}
            target="_blank"
            rel="noreferrer"
          >
            {`Написать · ${AUTHOR_NAME}`}
          </Button>
          {FEEDBACK_URL && (
            <Button
              size="l"
              stretched
              mode="tertiary"
              href={FEEDBACK_URL}
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: 8 }}
            >
              Оставить отзыв о приложении
            </Button>
          )}
        </Div>
      </Group>

      {DONATE_URL && (
        <Group header={<Header>Поддержать</Header>}>
          <Div>
            <Footnote style={{ color: 'var(--vkui--color_text_secondary)', display: 'block', marginBottom: 10 }}>
              Отчёт бесплатный и таким останется. Если он оказался полезным —
              можно закинуть на развитие: это оплачивает время на новые правила
              и метрики.
            </Footnote>
            <Button
              size="l"
              stretched
              mode="secondary"
              href={DONATE_URL}
              target="_blank"
              rel="noreferrer"
            >
              💜 Поддержать проект
            </Button>
          </Div>
        </Group>
      )}

      <Footer />

      {toast && <Snackbar onClose={() => setToast(null)} onClosed={() => setToast(null)}>{toast}</Snackbar>}
    </>
  );
}

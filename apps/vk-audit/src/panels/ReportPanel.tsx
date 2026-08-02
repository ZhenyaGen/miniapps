import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Avatar, Button, Div, Footnote, Group, Header, HorizontalScroll,
  PanelHeader, PanelHeaderBack, Snackbar, Tabs, TabsItem,
} from '@vkontakte/vkui';

import type { Report } from '../App';
import type { RivalsReport } from '../engine/rivals';
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
import { DEEPSEEK_CHAT_URL } from '../config';

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
  onCollectRivals: (targets: string) => void;
  onDemoRivals: () => void;
  onResetRivals: () => void;
  onBack: () => void;
}

export function ReportPanel({
  report, rivals, rivalsBusy, rivalsStage, canCollectRivals,
  onCollectRivals, onDemoRivals, onResetRivals, onBack,
}: Props) {
  const [tab, setTab] = useState<Tab>('summary');
  const [toast, setToast] = useState<string | null>(null);
  const { profile } = report.snapshot;

  const copyBrief = async () => {
    const text = buildBrief(report, rivals);
    try {
      await bridge.send('VKWebAppCopyText', { text });
      setToast('Бриф скопирован — вставьте его в чат с ИИ');
      return true;
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setToast('Бриф скопирован в буфер обмена');
        return true;
      } catch {
        setToast('Скопировать не удалось — браузер запретил доступ к буферу');
        return false;
      }
    }
  };

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
      {tab === 'zones' && <GrowthZones findings={report.findings} />}
      {tab === 'plan' && <PlanView plan={report.plan} />}
      {tab === 'content' && <ContentView metrics={report.metrics} />}
      {tab === 'rivals' && (
        <RivalsView
          report={rivals}
          busy={rivalsBusy}
          stage={rivalsStage}
          canCollect={canCollectRivals}
          isDemo={report.snapshot.meta.source === 'demo'}
          onCollect={onCollectRivals}
          onDemo={onDemoRivals}
          onReset={onResetRivals}
        />
      )}
      {tab === 'audience' && <AudienceView metrics={report.metrics} />}

      <Group header={<Header subtitle="весь отчёт текстом: метрики, зоны роста, план и тексты постов">
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
            их не нужно.
          </Footnote>
        </Div>
      </Group>

      <Footer />

      {toast && <Snackbar onClose={() => setToast(null)} onClosed={() => setToast(null)}>{toast}</Snackbar>}
    </>
  );
}

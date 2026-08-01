import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Avatar, Banner, Button, Div, Group, PanelHeader, PanelHeaderBack, Snackbar,
  Tabs, TabsItem,
} from '@vkontakte/vkui';

import type { Report } from '../App';
import { AudienceView } from '../components/AudienceView';
import { ContentView } from '../components/ContentView';
import { GrowthZones } from '../components/GrowthZones';
import { PlanView } from '../components/PlanView';
import { Summary } from '../components/Summary';
import { buildBrief } from '../report/brief';

type Tab = 'summary' | 'zones' | 'plan' | 'content' | 'audience';

const TABS: Array<[Tab, string]> = [
  ['summary', 'Итог'],
  ['zones', 'Рост'],
  ['plan', 'План'],
  ['content', 'Посты'],
  ['audience', 'Люди'],
];

export function ReportPanel({ report, onBack }: { report: Report; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('summary');
  const [toast, setToast] = useState<string | null>(null);
  const { profile } = report.snapshot;

  const copyBrief = async () => {
    const text = buildBrief(report);
    try {
      await bridge.send('VKWebAppCopyText', { text });
      setToast('Бриф скопирован — можно вставить в чат с ИИ');
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setToast('Бриф скопирован в буфер обмена');
      } catch {
        setToast('Скопировать не удалось — браузер запретил доступ к буферу');
      }
    }
  };

  return (
    <>
      <PanelHeader before={<PanelHeaderBack onClick={onBack} />}>
        {profile.name || 'Отчёт'}
      </PanelHeader>

      <Group>
        <Banner
          before={<Avatar size={48} src={profile.photo ?? undefined} />}
          title={profile.name}
          subtitle={`${profile.url.replace('https://', '')} · период ${report.metrics.period.from} — ${report.metrics.period.to}`}
        />
        <Tabs withScrollToSelectedTab scrollBehaviorToSelectedTab="center">
          {TABS.map(([id, label]) => (
            <TabsItem key={id} selected={tab === id} onClick={() => setTab(id)}>
              {label}
            </TabsItem>
          ))}
        </Tabs>
      </Group>

      {tab === 'summary' && <Summary report={report} />}
      {tab === 'zones' && <GrowthZones findings={report.findings} />}
      {tab === 'plan' && <PlanView plan={report.plan} />}
      {tab === 'content' && <ContentView metrics={report.metrics} />}
      {tab === 'audience' && <AudienceView metrics={report.metrics} />}

      <Group>
        <Div>
          <Button size="l" stretched mode="secondary" onClick={copyBrief}>
            Скопировать бриф для ИИ
          </Button>
        </Div>
      </Group>

      {toast && <Snackbar onClose={() => setToast(null)} onClosed={() => setToast(null)}>{toast}</Snackbar>}
    </>
  );
}

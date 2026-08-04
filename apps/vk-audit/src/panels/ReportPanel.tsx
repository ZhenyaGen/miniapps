import { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  Avatar, Button, Div, Footnote, Group, Header, HorizontalScroll,
  PanelHeader, PanelHeaderBack, Snackbar, Tabs, TabsItem,
} from '@vkontakte/vkui';

import type { Report } from '../App';
import type { RivalsReport } from '../engine/rivals';
import type { Suggestion } from '../vk/rivals';
import type { CommentReport, VideoReport } from '../video/analyze';
import type { ClipsReport } from '../video/clips';
import type { PhotoReport } from '../photos/analyze';
import type { PhotoStat } from '../photos/collect';
import type { VideoStat } from '../vk/video';
import { AudienceView } from '../components/AudienceView';
import { ContentView } from '../components/ContentView';
import { GrowthZones } from '../components/GrowthZones';
import { PlanView } from '../components/PlanView';
import { RivalsView } from '../components/RivalsView';
import { VideoView } from '../components/VideoView';
import { ClipsView } from '../components/ClipsView';
import { PhotosView } from '../components/PhotosView';
import { SubscribeCard } from '../components/SubscribeCard';
import { Summary } from '../components/Summary';
import { OfferCard } from '../components/OfferCard';
import { Footer } from '../components/Footer';
import { buildBrief } from '../report/brief';
import { buildCsv, csvName, downloadCsv } from '../report/csv';
import { downloadText, fileBase } from '../report/download';
import { PrintReport } from '../components/PrintReport';
import { buildMix } from '../report/mix';
import { findGaps } from '../report/gaps';
import {
  AUTHOR_MESSAGE_URL, AUTHOR_NAME, DEEPSEEK_CHAT_URL, DONATE_URL, FEEDBACK_URL,
} from '../config';

type Tab = 'summary' | 'zones' | 'plan' | 'content' | 'clips' | 'video'
  | 'photos' | 'rivals' | 'audience';

const TABS: Array<[Tab, string]> = [
  ['summary', 'Сводка'],
  ['zones', 'Зоны роста'],
  ['plan', 'План'],
  ['content', 'Контент'],
  ['clips', 'Клипы'],
  ['video', 'Видео'],
  ['photos', 'Фото'],
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
  video: VideoReport | null;
  comments: CommentReport | null;
  clips: ClipsReport | null;
  photos: PhotoReport | null;
  /** Полные списки медиа — только для выгрузки в таблицу. */
  rawVideos: VideoStat[];
  rawPhotos: PhotoStat[];
  mediaBusy: boolean;
  mediaStage: string;
  /** Почему видео не собралось — если не собралось. */
  mediaNote: string;
  onCollectMedia: () => void;
  onCollectRivals: (targets: string) => void;
  onSuggestRivals: () => void;
  onDemoRivals: () => void;
  onResetRivals: () => void;
  onBack: () => void;
}

export function ReportPanel({
  report, rivals, rivalsBusy, rivalsStage, canCollectRivals,
  rivalsSuggestion, video, comments, clips, photos, rawVideos, rawPhotos,
  mediaBusy, mediaStage, mediaNote, onCollectMedia,
  onCollectRivals, onSuggestRivals, onDemoRivals, onResetRivals, onBack,
}: Props) {
  const [tab, setTab] = useState<Tab>('summary');
  const [toast, setToast] = useState<string | null>(null);
  const { profile } = report.snapshot;
  // профиль контента честен только после разбора медиа: до него видно
  // одни записи, и вывод «текстовая страница» был бы неправдой
  const mediaCollected = Boolean(video || clips || photos);
  const mix = mediaCollected ? buildMix({ metrics: report.metrics, video, clips, photos }) : null;
  const media = { video, clips, photos, comments, mix };

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
    buildBrief(report, rivals, media),
    'Бриф скопирован — вставьте его в чат с ИИ',
  );

  /**
   * Выгрузка таблицей: сначала честная загрузка файлом, а если
   * приложение ВКонтакте её не дало — тем же текстом в буфер.
   */
  const exportCsv = async () => {
    const text = buildCsv(report, {
      video, clips, photos, allVideos: rawVideos, allPhotos: rawPhotos,
    });
    if (downloadCsv(text, csvName(report))) {
      setToast('Таблица скачана — открывается в Excel и Google Таблицах');
      return;
    }
    await copy(text, 'Загрузка запрещена — таблица скопирована в буфер');
  };

  /**
   * Бриф текстовым файлом.
   *
   * То же самое, что уезжает в буфер, но файлом: буфер живёт до первой
   * копии чего-нибудь ещё, а отчёт хочется сохранить и переслать.
   */
  const exportTxt = async () => {
    const text = buildBrief(report, rivals, media);
    const name = `${fileBase(profile.screen_name, report.metrics.period.to)}.txt`;
    if (downloadText(text, name, 'text/plain')) {
      setToast('Бриф сохранён текстовым файлом');
      return;
    }
    await copy(text, 'Загрузка запрещена — бриф скопирован в буфер');
  };

  /**
   * PDF — через печать браузера: «Сохранить как PDF» умеют все.
   * Своей генерации нет намеренно: библиотека с кириллическим шрифтом
   * весит больше, чем всё приложение.
   */
  const printReport = () => {
    if (typeof window.print !== 'function') {
      setToast('Печать недоступна в этом окне — откройте отчёт в браузере');
      return;
    }
    window.print();
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
          <Summary report={report} mix={mix} />
          <OfferCard findings={report.findings} />
          {report.snapshot.meta.source !== 'demo' && (
            <SubscribeCard target={report.snapshot.profile.screen_name} period="раз в неделю" />
          )}
        </>
      )}
      {tab === 'zones' && (
        <GrowthZones
          findings={report.findings}
          gaps={findGaps({
            metrics: report.metrics,
            mix,
            video,
            clips,
            photos,
            comments,
            rivals,
            mediaCollected,
          })}
        />
      )}
      {tab === 'plan' && <PlanView plan={report.plan} />}
      {tab === 'content' && <ContentView metrics={report.metrics} />}
      {tab === 'clips' && (
        <ClipsView
          report={clips}
          busy={mediaBusy}
          stage={mediaStage}
          note={mediaNote}
          canCollect={canCollectRivals && report.snapshot.meta.source !== 'demo'}
          onCollect={onCollectMedia}
        />
      )}
      {tab === 'video' && (
        <VideoView
          video={video}
          comments={comments}
          busy={mediaBusy}
          stage={mediaStage}
          note={mediaNote}
          canCollect={canCollectRivals && report.snapshot.meta.source !== 'demo'}
          onCollect={onCollectMedia}
        />
      )}
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
      {tab === 'photos' && (
        <PhotosView
          report={photos}
          busy={mediaBusy}
          stage={mediaStage}
          note={mediaNote}
          canCollect={canCollectRivals && report.snapshot.meta.source !== 'demo'}
          onCollect={onCollectMedia}
        />
      )}
      {tab === 'audience' && <AudienceView metrics={report.metrics} />}

      <Group header={<Header subtitle="весь отчёт текстом: метрики, медиа, зоны роста, план и готовые ряды под диаграммы">
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

      <Group header={<Header subtitle="таблицей в Excel или страницей в PDF">
        Забрать файлом
      </Header>}
      >
        <Div style={{ display: 'grid', gap: 10 }}>
          <Button size="l" stretched mode="secondary" onClick={exportTxt}>
            📄 Скачать бриф (TXT)
          </Button>
          <Button size="l" stretched mode="secondary" onClick={exportCsv}>
            📊 Скачать таблицу (CSV)
          </Button>
          <Button size="l" stretched mode="secondary" onClick={printReport}>
            🖨 Сохранить в PDF
          </Button>
          <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
            TXT — тот же бриф, что уезжает в буфер, только файлом: буфер
            живёт до первой копии чего-нибудь ещё. В таблице каждая строка —
            запись, клип, видео или снимок, одними и теми же столбцами:
            из неё сразу строится сводная. PDF печатается
            средствами браузера — в диалоге печати выберите «Сохранить
            как PDF». В приложении ВКонтакте печать бывает недоступна;
            тогда откройте отчёт в браузере.
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

      <PrintReport report={report} rivals={rivals} media={media} />

      {toast && <Snackbar onClose={() => setToast(null)} onClosed={() => setToast(null)}>{toast}</Snackbar>}
    </>
  );
}

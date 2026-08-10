/**
 * Реклама рекламной сети ВКонтакте.
 *
 * Появилась не от хорошей жизни: продавать что-либо внутри мини-приложения
 * правила запрещают (раздел 5.4), а сервер под бота и запросы к нейросети
 * кто-то должен оплачивать. Реклама — единственный способ монетизации,
 * который платформа разрешает прямо в приложении, и модерация требует,
 * чтобы она была внедрена до проверки, а не «потом».
 *
 * Два формата и разная логика показа:
 *
 * - **баннер снизу** висит всё время работы. `layout_type: 'resize'`
 *   вместо `overlay` — принципиально: баннер отжимает содержимое вверх,
 *   а не накрывает его. Иначе он закрыл бы подвал с политикой
 *   конфиденциальности;
 * - **реклама между экранами** показывается один раз за сеанс, на стыке
 *   «собрали» → «показали отчёт». Это единственное место, где человек
 *   и так ждёт, а не читает.
 *
 * Всё молча падает наружу: вне ВКонтакте моста нет, внутри рекламных
 * материалов может не оказаться. Ни то ни другое не должно ломать отчёт.
 */

import bridge from '@vkontakte/vk-bridge';

import { isInsideVK } from './vk/auth';

/**
 * Сколько ждём ответа платформы.
 *
 * Вне ВКонтакте мост никому не отвечает и обещание не разрешается
 * никогда — приложение вставало намертво на пустом экране. Внутри ВК
 * платформа тоже может промолчать. Реклама не стоит того, чтобы из-за
 * неё человек не увидел отчёт.
 */
const AD_TIMEOUT = 4000;

function withTimeout<T>(promise: Promise<T>): Promise<T | null> {
  return Promise.race([
    promise.catch(() => null),
    new Promise<null>((resolve) => { setTimeout(() => resolve(null), AD_TIMEOUT); }),
  ]);
}

/** Показывали ли уже рекламу между экранами в этом сеансе. */
let interstitialShown = false;

/** Закрыл ли человек баннер руками — тогда навязываться не будем. */
let bannerClosedByUser = false;

bridge.subscribe((event) => {
  if (event.detail?.type === 'VKWebAppBannerAdClosedByUser') {
    bannerClosedByUser = true;
  }
});

/**
 * Баннер внизу экрана.
 *
 * Вызывается один раз при запуске. Повторные вызовы безопасны: платформа
 * вернёт уже показанный баннер.
 */
export async function showBanner(): Promise<void> {
  if (bannerClosedByUser || !isInsideVK()) return;
  await withTimeout(bridge.send('VKWebAppShowBannerAd', {
    banner_location: 'bottom',
    layout_type: 'resize',
    // компактная высота: отчёт длинный, каждый лишний пиксель
    // отъедается у содержимого
    height_type: 'compact',
    can_close: true,
  }));
}

export async function hideBanner(): Promise<void> {
  if (!isInsideVK()) return;
  await withTimeout(bridge.send('VKWebAppHideBannerAd'));
}

/**
 * Реклама между экранами — один раз за сеанс.
 *
 * Сначала проверяем, есть ли материалы: показывать «загрузку рекламы»
 * человеку, который ждёт свой отчёт, — худшее, что можно сделать.
 * Если материалов нет, молча пропускаем.
 */
export async function showInterstitial(): Promise<void> {
  if (interstitialShown || !isInsideVK()) return;
  interstitialShown = true;
  const ready = await withTimeout(
    bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' }),
  );
  if (!ready?.result) return;
  // Показ ждём без таймаута: обещание разрешается, когда ролик досмотрен
  // или закрыт, а это дольше любого разумного ожидания. Сюда мы попадаем
  // только если платформа уже подтвердила, что материалы есть, — значит,
  // отвечать ей есть чем.
  await bridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
    .catch(() => undefined);
}

/**
 * Заранее попросить платформу подготовить материалы.
 *
 * Загрузка занимает время, а показывать рекламу мы будем в момент,
 * когда отчёт уже готов. Просим заранее — тогда показ идёт без задержки.
 */
export function preloadInterstitial(): void {
  if (!isInsideVK()) return;
  void withTimeout(bridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' }));
}

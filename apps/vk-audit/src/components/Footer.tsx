import { AUTHOR_NAME, AUTHOR_URL, BRAND_NAME, privacyUrl } from '../config';

/** Подпись проекта и автора — в самом низу каждого экрана. */
export function Footer() {
  return (
    <div className="footer-credit">
      <b>{BRAND_NAME}</b>
      <br />
      Разработка — <a href={AUTHOR_URL} target="_blank" rel="noreferrer">{AUTHOR_NAME}</a>
      <br />
      © {new Date().getFullYear()} · <a href={privacyUrl()} target="_blank" rel="noreferrer noopener">Политика конфиденциальности</a>
    </div>
  );
}

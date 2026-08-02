import { AUTHOR_NAME, AUTHOR_URL, BRAND_NAME, PRIVACY_URL } from '../config';

/** Подпись проекта и автора — в самом низу каждого экрана. */
export function Footer() {
  return (
    <div className="footer-credit">
      <b>{BRAND_NAME}</b>
      <br />
      Разработка — <a href={AUTHOR_URL} target="_blank" rel="noreferrer">{AUTHOR_NAME}</a>
      <br />
      © {new Date().getFullYear()} · <a href={PRIVACY_URL} target="_blank" rel="noreferrer">Политика конфиденциальности</a>
    </div>
  );
}

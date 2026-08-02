import { AUTHOR_NAME, AUTHOR_URL } from '../config';

/** Подпись автора — показывается в самом низу каждого экрана. */
export function Footer() {
  return (
    <div className="footer-credit">
      Разработка — <a href={AUTHOR_URL} target="_blank" rel="noreferrer">{AUTHOR_NAME}</a>
      <br />
      © {new Date().getFullYear()} · Аудит страницы ВК
    </div>
  );
}

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { OAUTH_PORT } from './src/oauth.js';

export default defineConfig({
  plugins: [react()],
  // относительные пути: сборку можно положить в любую подпапку хостинга,
  // адрес которой указан в настройках мини-приложения
  base: './',
  server: {
    // тот же порт, что зашит в redirect_uri: после входа ВК возвращает
    // браузер на localhost:8910/callback, и приложение забирает ключ из hash
    port: OAUTH_PORT,
    strictPort: true,
    host: true,
  },
  preview: {
    port: OAUTH_PORT,
    strictPort: true,
    host: true,
  },
});

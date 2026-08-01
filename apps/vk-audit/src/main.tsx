import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { App } from './App';
import './index.css';

// Событие инициализации: платформа узнаёт о старте приложения и включает
// параметры, без которых остальные вызовы моста не работают.
bridge.send('VKWebAppInit').catch(() => {
  // вне ВК моста нет — приложение продолжает работать в обычном браузере
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <App />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </StrictMode>,
);

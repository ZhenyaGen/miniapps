import { PanelHeader, Placeholder, Spinner } from '@vkontakte/vkui';

export function LoadingPanel({ stage }: { stage: string }) {
  return (
    <>
      <PanelHeader>Собираем данные</PanelHeader>
      <Placeholder icon={<Spinner size="l" />} title={stage || 'Работаем'}>
        ВКонтакте отдаёт не больше трёх запросов в секунду, поэтому сбор
        занимает несколько секунд. Окно закрывать не нужно.
      </Placeholder>
    </>
  );
}

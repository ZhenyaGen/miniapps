import { Button, Div, Group, Header, Text } from '@vkontakte/vkui';

import { AUTHOR_MESSAGE_URL, AUTHOR_NAME } from '../config';
import type { Finding } from '../engine/types';

/**
 * Предложение сделать работу за человека.
 *
 * Показывается в конце сводки и опирается на то, что отчёт уже нашёл:
 * не «закажите услуги», а «вот эти три вещи можно закрыть за вас».
 * Без найденных проблем блок не появляется — предлагать нечего.
 */
export function OfferCard({ findings }: { findings: Finding[] }) {
  if (!AUTHOR_MESSAGE_URL || findings.length < 3) return null;

  const packaging = findings.filter((f_) => f_.area === 'Упаковка').length;
  const content = findings.filter((f_) => ['Контент', 'Форматы', 'Тексты'].includes(f_.area)).length;

  const lead = packaging
    ? `Из ${findings.length} находок ${packaging} — про упаковку страницы: обложка, описание, закреп.`
    : `Отчёт нашёл ${findings.length} зон роста${content ? `, из них ${content} — про контент` : ''}.`;

  return (
    <Group header={<Header>Не хотите делать сами?</Header>}>
      <Div>
        <Text style={{ display: 'block', marginBottom: 6 }}>{lead}</Text>
        <Text style={{ display: 'block', color: 'var(--vkui--color_text_secondary)' }}>
          Могу закрыть это за вас: упаковка сообщества, обложка и меню,
          макеты для постов, контент-план на месяц. Напишите — посмотрю
          отчёт вместе с вами и скажу, с чего начать.
        </Text>
        <Button
          size="l"
          stretched
          mode="secondary"
          href={AUTHOR_MESSAGE_URL}
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: 12 }}
        >
          {`Написать · ${AUTHOR_NAME}`}
        </Button>
      </Div>
    </Group>
  );
}

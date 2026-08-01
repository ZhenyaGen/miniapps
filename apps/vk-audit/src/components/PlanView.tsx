import { useState } from 'react';
import { Checkbox, Div, Footnote, Group, Header, MiniInfoCell } from '@vkontakte/vkui';

import type { PlanStage } from '../engine/types';

export function PlanView({ plan }: { plan: PlanStage[] }) {
  // галочки живут только в этом окне: план — рабочий чек-лист на встрече,
  // а не хранилище состояния клиента
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <>
      {plan.map((stage) => (
        <Group key={stage.stage} header={<Header subtitle={stage.goal}>{stage.title}</Header>}>
          {stage.tasks.map((task, i) => {
            const key = `${stage.stage}:${i}`;
            return (
              <Checkbox
                key={key}
                checked={Boolean(done[key])}
                onChange={() => setDone((prev) => ({ ...prev, [key]: !prev[key] }))}
                description={task.source === 'База' ? undefined : task.source}
              >
                {task.text}
              </Checkbox>
            );
          })}
          <MiniInfoCell textWrap="full">{stage.metric}</MiniInfoCell>
        </Group>
      ))}
      <Div>
        <Footnote style={{ color: 'var(--vkui--color_text_secondary)' }}>
          План собран из найденных зон роста: задачи каждой недели — это действия
          по проблемам, отнесённым к этому этапу.
        </Footnote>
      </Div>
    </>
  );
}

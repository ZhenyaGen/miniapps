/**
 * Слой DeepSeek: превращает посчитанные метрики в человеческий разбор.
 *
 * Модель ничего не считает — числа приходят готовыми, а системный промпт прямо
 * запрещает их выдумывать. Тот же приём, что в десктопной версии: иначе
 * в отчёте появляются проценты с потолка.
 */

const SYSTEM = 'Ты — практикующий SMM-редактор. Пишешь по-русски, коротко и по делу, '
  + 'без канцелярита, без воды и без обращений «дорогие друзья». '
  + 'ЖЁСТКОЕ ПРАВИЛО: все числа бери только из блока ДАННЫЕ, никогда не выдумывай '
  + 'и не округляй метрики. Если данных для вывода не хватает — так и напиши. '
  + 'Это личное сообщение во ВКонтакте: без заголовков, без markdown, без списков '
  + 'со звёздочками. Обычный текст, короткие абзацы, не длиннее 1800 знаков.';

export class LLMError extends Error {}

export interface LLMOptions {
  key: string;
  base?: string;
  model?: string;
  timeoutMs?: number;
}

interface ChatResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
  usage?: { prompt_tokens?: number; completion_tokens?: number };
}

export class DeepSeek {
  private readonly key: string;

  private readonly base: string;

  private readonly model: string;

  private readonly timeoutMs: number;

  tokensIn = 0;

  tokensOut = 0;

  constructor({ key, base, model, timeoutMs }: LLMOptions) {
    if (!key) throw new LLMError('Не указан ключ DeepSeek');
    this.key = key.trim();
    this.base = (base || 'https://api.deepseek.com/v1').replace(/\/$/, '');
    this.model = model || 'deepseek-chat';
    this.timeoutMs = timeoutMs ?? 120_000;
  }

  async chat(prompt: string, maxTokens = 1200, temperature = 0.6): Promise<string> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const resp = await fetch(`${this.base}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.key}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: SYSTEM },
            { role: 'user', content: prompt },
          ],
          max_tokens: maxTokens,
          temperature,
        }),
        signal: controller.signal,
      });

      const data = (await resp.json()) as ChatResponse;
      if (!resp.ok || data.error) {
        throw new LLMError(data.error?.message ?? `DeepSeek ответил ${resp.status}`);
      }
      const text = data.choices?.[0]?.message?.content?.trim();
      if (!text) throw new LLMError('DeepSeek вернул пустой ответ');

      this.tokensIn += data.usage?.prompt_tokens ?? 0;
      this.tokensOut += data.usage?.completion_tokens ?? 0;
      return text;
    } catch (err) {
      if (err instanceof LLMError) throw err;
      if ((err as Error).name === 'AbortError') {
        throw new LLMError('DeepSeek не ответил вовремя');
      }
      throw new LLMError(`Не удалось связаться с DeepSeek: ${(err as Error).message}`);
    } finally {
      clearTimeout(timer);
    }
  }

  /** Проверка ключа при старте — чтобы не выяснять это в момент рассылки. */
  async check(): Promise<void> {
    await this.chat('Ответь одним словом: готов', 20, 0);
  }
}

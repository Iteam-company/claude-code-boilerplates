---
name: claude-feature
description: Add an AI feature powered by Claude (Anthropic) to this Next.js project — lib/claude.ts client, streaming chat route, tool-use pattern, prompt caching, and credit deduction per AI call. Use this skill whenever the user asks about Claude AI, Anthropic API, streaming AI responses, AI chat, tool use, prompt caching, or wiring AI into any feature.
---

# Claude API Feature Skill

Wires Claude into the product via a streaming `/api/ai/chat` endpoint. Covers the Anthropic SDK client, Server-Sent Events streaming, tool use, prompt caching, and credit deduction via the existing `creditService`.

## Setup

```bash
npm install @anthropic-ai/sdk
```

```env
ANTHROPIC_API_KEY=sk-ant-...
AI_CREDITS_PER_MESSAGE=10
```

Get the API key from console.anthropic.com → API Keys.

---

## `lib/claude.ts`

Single SDK instance. Prompt caching is opt-in per request — pass `cache: true` to `buildMessages`.

```ts
import Anthropic from '@anthropic-ai/sdk';

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export const DEFAULT_MODEL = 'claude-sonnet-4-6';
export const AI_CREDITS_PER_MESSAGE = Number(
  process.env.AI_CREDITS_PER_MESSAGE ?? 10,
);

/**
 * Wraps a system prompt with a cache-control breakpoint so Claude caches it
 * across requests (reduces cost for long static prompts).
 */
export function cachedSystem(
  text: string,
): Anthropic.Messages.MessageParam['content'] {
  return [
    {
      type: 'text',
      text,
      cache_control: { type: 'ephemeral' },
    } as Anthropic.Messages.TextBlockParam & {
      cache_control: { type: 'ephemeral' };
    },
  ];
}
```

---

## Streaming Chat Route — `app/api/ai/chat/route.ts`

Protected endpoint. Validates input, deducts credits, then streams the Claude response as Server-Sent Events.

```ts
import { claude, DEFAULT_MODEL, AI_CREDITS_PER_MESSAGE } from '@/lib/claude';
import { getUserFromRequest } from '@/lib/auth';
import { handleError, HttpError } from '@/lib/errors';
import { creditService } from '@/modules/credit/credit.service';
import { z } from 'zod';

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1),
      }),
    )
    .min(1),
  system: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);

    // Deduct credits before calling Claude — fail fast on insufficient balance
    await creditService.deductCredits(
      userId,
      AI_CREDITS_PER_MESSAGE,
      'AI chat message',
    );

    const { messages, system } = parsed.data;

    const stream = claude.messages.stream({
      model: DEFAULT_MODEL,
      max_tokens: 1024,
      system: system ?? 'You are a helpful assistant.',
      messages,
    });

    // Stream SSE back to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(chunk));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

---

## Tool Use Route — `app/api/ai/agent/route.ts`

Non-streaming variant with tool use. Define tools; Claude calls them; you execute them and continue the loop.

```ts
import Anthropic from '@anthropic-ai/sdk';
import { claude, DEFAULT_MODEL, AI_CREDITS_PER_MESSAGE } from '@/lib/claude';
import { getUserFromRequest } from '@/lib/auth';
import { handleError, HttpError } from '@/lib/errors';
import { creditService } from '@/modules/credit/credit.service';
import { z } from 'zod';

const schema = z.object({
  prompt: z.string().min(1).max(4000),
});

const tools: Anthropic.Tool[] = [
  {
    name: 'get_weather',
    description: 'Get the current weather for a city.',
    input_schema: {
      type: 'object' as const,
      properties: {
        city: { type: 'string', description: 'City name' },
      },
      required: ['city'],
    },
  },
];

async function executeTool(
  name: string,
  input: Record<string, unknown>,
): Promise<string> {
  if (name === 'get_weather') {
    const city = input.city as string;
    // Replace with a real weather API call
    return JSON.stringify({ city, temperature: '22°C', condition: 'Sunny' });
  }
  throw new Error(`Unknown tool: ${name}`);
}

export async function POST(req: Request) {
  try {
    const { id: userId } = getUserFromRequest(req);

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success)
      throw new HttpError(400, parsed.error.issues[0].message);

    await creditService.deductCredits(
      userId,
      AI_CREDITS_PER_MESSAGE,
      'AI agent call',
    );

    const messages: Anthropic.MessageParam[] = [
      { role: 'user', content: parsed.data.prompt },
    ];

    // Agentic loop — keep going until Claude stops calling tools
    while (true) {
      const response = await claude.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: 1024,
        tools,
        messages,
      });

      messages.push({ role: 'assistant', content: response.content });

      if (response.stop_reason !== 'tool_use') {
        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('');
        return Response.json({ reply: text });
      }

      // Execute all tool calls in this turn
      const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
        response.content
          .filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use')
          .map(async (toolUse) => ({
            type: 'tool_result' as const,
            tool_use_id: toolUse.id,
            content: await executeTool(
              toolUse.name,
              toolUse.input as Record<string, unknown>,
            ),
          })),
      );

      messages.push({ role: 'user', content: toolResults });
    }
  } catch (error: unknown) {
    return handleError(error);
  }
}
```

---

## Prompt Caching — large system prompts

For system prompts longer than ~1 000 tokens, enable caching to cut costs by up to 90 %.
Pass the cached content directly as the `system` array:

```ts
import { cachedSystem } from '@/lib/claude';

const response = await claude.messages.create({
  model: DEFAULT_MODEL,
  max_tokens: 1024,
  system: cachedSystem(
    myVeryLongSystemPrompt,
  ) as Anthropic.Messages.TextBlockParam[],
  messages,
});
```

Claude will serve the cached prefix on subsequent requests with the same prompt — you pay only for uncached input tokens.
Set `anthropic-beta: prompt-caching-2024-07-31` header if the SDK version requires it (≥ 0.30 it is automatic).

---

## Client Hook — `hooks/api/useAiChat.ts`

Reads the SSE stream and appends text chunks to local state.

```ts
import { useState, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useAiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    async (userText: string, system?: string) => {
      const next: Message[] = [
        ...messages,
        { role: 'user', content: userText },
      ];
      setMessages(next);
      setStreaming(true);
      setError(null);

      const token = localStorage.getItem('token');

      try {
        const res = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ messages: next, system }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? 'AI request failed');
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let assistantText = '';

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const raw = decoder.decode(value, { stream: true });
          for (const line of raw.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const payload = line.slice(6).trim();
            if (payload === '[DONE]') break;
            const { text } = JSON.parse(payload) as { text: string };
            assistantText += text;
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: 'assistant',
                content: assistantText,
              };
              return updated;
            });
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setStreaming(false);
      }
    },
    [messages],
  );

  return { messages, send, streaming, error };
}
```

---

## Chat UI Component — `components/AiChat.tsx`

```tsx
'use client';

import { useRef, useEffect, FormEvent } from 'react';
import { useAiChat } from '@/hooks/api/useAiChat';
import { cn } from '@/lib/utils';

export function AiChat({ system }: { system?: string }) {
  const { messages, send, streaming, error } = useAiChat();
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const text = inputRef.current?.value.trim();
    if (!text || streaming) return;
    inputRef.current!.value = '';
    await send(text, system);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex-1 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'max-w-[80%] rounded-lg px-4 py-2 text-sm',
              msg.role === 'user'
                ? 'bg-primary text-primary-foreground ml-auto'
                : 'bg-muted text-foreground',
            )}
          >
            {msg.content}
          </div>
        ))}
        {error && <p className="text-destructive text-sm">{error}</p>}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask something…"
          disabled={streaming}
          className="border-border bg-background flex-1 rounded-md border px-3 py-2 text-sm outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={streaming}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {streaming ? 'Thinking…' : 'Send'}
        </button>
      </form>
    </div>
  );
}
```

---

## Conventions

- Always deduct credits **before** calling Claude — fail fast on `402 Insufficient credits`
- Never log `ANTHROPIC_API_KEY` or raw message content containing PII
- Keep `lib/claude.ts` as the single SDK instance — never instantiate `Anthropic` inline
- Use `claude.messages.stream()` for chat, `claude.messages.create()` for tool-use loops
- Set `max_tokens` explicitly — Claude has no default cap
- Use prompt caching (`cachedSystem`) for system prompts > 1 000 tokens to reduce cost
- Tool names must be `snake_case` and match the `name` field exactly when you call `executeTool`
- The agentic loop terminates when `stop_reason !== 'tool_use'` — always check this
- `AI_CREDITS_PER_MESSAGE` should be configurable via env so you can adjust pricing without a deploy

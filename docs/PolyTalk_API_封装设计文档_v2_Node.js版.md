# PolyTalk API 封装设计文档 v2（Node.js版）
**兵部 张居正** | 2026-03-03
**更新原因**：陛下圣裁，技术栈调整
**交付时间**：2026-03-04 12:00

---

## 📋 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| v1 | 03-03 04:30 | Python + FastAPI + 单厂商 |
| v2 | 03-03 06:01 | **Node.js + 多厂商 + 双云部署** |

---

## 一、架构总览（Node.js）

```
┌─────────────────────────────────────────────────────┐
│              Oracle Cloud (海外)                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  Hono/Fastify Router (统一入口)               │   │
│  │  /chat /stt /tts /health                      │   │
│  └──────────────────────────────────────────────┘   │
│                      │                               │
│  ┌───────────────────┼───────────────────┐          │
│  │                   ▼                   │          │
│  │          AI Provider Gateway          │          │
│  │  ┌──────┬──────┬──────┬──────┬─────┐ │          │
│  │  │ GLM  │文心  │通义  │OpenAI│Claude│ │          │
│  │  └──────┴──────┴──────┴──────┴─────┘ │          │
│  └──────────────────────────────────────┘          │
├─────────────────────────────────────────────────────┤
│              阿里云 (国内)                           │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ 火山 TTS     │  │ SQLite/MySQL │                │
│  └──────────────┘  └──────────────┘                │
└─────────────────────────────────────────────────────┘
```

---

## 二、技术栈选型

### 2.1 后端框架对比

| 框架 | 性能 | TypeScript | 生态 | 推荐度 |
|------|------|------------|------|--------|
| **Hono** | ⭐⭐⭐⭐⭐ | ✅ | 轻量 | ✅ **推荐** |
| Fastify | ⭐⭐⭐⭐⭐ | ✅ | 成熟 | ⭐⭐⭐⭐ |
| Express | ⭐⭐⭐ | ✅ | 最丰富 | ⭐⭐⭐ |

**推荐**：**Hono**（轻量、快速、边缘友好）

### 2.2 AI SDK 选型

| 厂商 | SDK | API 兼容性 |
|------|-----|-----------|
| GLM | zhipu-sdk-node | OpenAI 兼容 |
| 文心 | @baidu/ernie-bot | 自定义 |
| 通义 | @alicloud/qwen | OpenAI 兼容 |
| OpenAI | openai | 原生 |
| Claude | @anthropic-ai/sdk | 自定义 |
| Gemini | @google/generative-ai | 自定义 |

**方案**：统一封装为 OpenAI 兼容接口

---

## 三、目录结构

```
polytalk/
├── src/
│   ├── index.ts                 # 入口
│   ├── app.ts                   # Hono 应用
│   ├── config/
│   │   └── index.ts             # 配置管理
│   ├── routers/
│   │   ├── chat.ts              # NLP 对话
│   │   ├── stt.ts               # 语音识别
│   │   ├── tts.ts               # 语音合成
│   │   └── health.ts            # 健康检查
│   ├── services/
│   │   ├── ai/
│   │   │   ├── index.ts         # AI 统一网关
│   │   │   ├── providers/
│   │   │   │   ├── glm.ts       # 智谱 GLM
│   │   │   │   ├── ernie.ts     # 百度文心
│   │   │   │   ├── qwen.ts      # 阿里通义
│   │   │   │   ├── openai.ts    # OpenAI
│   │   │   │   ├── claude.ts    # Anthropic
│   │   │   │   └── gemini.ts    # Google Gemini
│   │   │   └── types.ts         # 统一类型定义
│   │   ├── stt.ts               # Whisper 封装
│   │   └── tts.ts               # 火山 TTS 封装
│   ├── models/
│   │   ├── conversation.ts
│   │   └── user.ts
│   └── utils/
│       ├── logger.ts
│       └── cache.ts
├── tests/
│   ├── ai.test.ts
│   ├── stt.test.ts
│   └── tts.test.ts
├── package.json
├── tsconfig.json
├── wrangler.toml                # Cloudflare Workers (可选)
├── Dockerfile
└── README.md
```

---

## 四、依赖清单

```json
{
  "dependencies": {
    "hono": "^4.0.0",
    "@hono/node-server": "^1.0.0",
    
    "zhipu-sdk-node": "^1.0.0",
    "@baidu/ernie-bot": "^1.0.0",
    "@alicloud/qwen": "^1.0.0",
    "openai": "^4.0.0",
    "@anthropic-ai/sdk": "^0.20.0",
    "@google/generative-ai": "^0.2.0",
    
    "better-sqlite3": "^9.0.0",
    "drizzle-orm": "^0.29.0",
    
    "whisper-node": "^1.1.1",
    "axios": "^1.6.0",
    
    "dotenv": "^16.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "@types/better-sqlite3": "^7.6.0",
    "vitest": "^1.0.0",
    "tsx": "^4.0.0"
  }
}
```

---

## 五、AI 多厂商统一接口

### 5.1 统一类型定义

```typescript
// src/services/ai/types.ts

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
}

export interface AIProvider {
  name: string;
  chat(request: ChatRequest): Promise<ChatResponse>;
  chatStream(request: ChatRequest): AsyncIterable<string>;
  isAvailable(): Promise<boolean>;
}

export type ProviderType = 'glm' | 'ernie' | 'qwen' | 'openai' | 'claude' | 'gemini';
```

### 5.2 AI 统一网关

```typescript
// src/services/ai/index.ts

import { Hono } from 'hono';
import { GLMProvider } from './providers/glm';
import { ErnieProvider } from './providers/ernie';
import { QwenProvider } from './providers/qwen';
import { OpenAIProvider } from './providers/openai';
import { ClaudeProvider } from './providers/claude';
import { GeminiProvider } from './providers/gemini';
import type { ProviderType, ChatRequest, ChatResponse, AIProvider } from './types';

export class AIGateway {
  private providers: Map<ProviderType, AIProvider>;
  private defaultProvider: ProviderType;
  private fallbackOrder: ProviderType[];

  constructor(config: {
    defaultProvider: ProviderType;
    fallbackOrder?: ProviderType[];
  }) {
    this.defaultProvider = config.defaultProvider;
    this.fallbackOrder = config.fallbackOrder || ['glm', 'qwen', 'openai', 'claude'];
    
    this.providers = new Map([
      ['glm', new GLMProvider()],
      ['ernie', new ErnieProvider()],
      ['qwen', new QwenProvider()],
      ['openai', new OpenAIProvider()],
      ['claude', new ClaudeProvider()],
      ['gemini', new GeminiProvider()],
    ]);
  }

  async chat(
    request: ChatRequest,
    provider?: ProviderType
  ): Promise<ChatResponse> {
    const targetProvider = provider || this.defaultProvider;
    
    // 尝试指定供应商
    try {
      const p = this.providers.get(targetProvider);
      if (p && await p.isAvailable()) {
        return await p.chat(request);
      }
    } catch (error) {
      console.error(`${targetProvider} failed:`, error);
    }

    // 降级到其他供应商
    for (const fallbackType of this.fallbackOrder) {
      if (fallbackType === targetProvider) continue;
      
      try {
        const p = this.providers.get(fallbackType);
        if (p && await p.isAvailable()) {
          console.log(`Fallback to ${fallbackType}`);
          return await p.chat(request);
        }
      } catch (error) {
        console.error(`${fallbackType} failed:`, error);
        continue;
      }
    }

    throw new Error('All AI providers unavailable');
  }

  async *chatStream(
    request: ChatRequest,
    provider?: ProviderType
  ): AsyncIterable<string> {
    const targetProvider = provider || this.defaultProvider;
    const p = this.providers.get(targetProvider);
    
    if (!p || !(await p.isAvailable())) {
      throw new Error(`${targetProvider} not available`);
    }

    yield* p.chatStream(request);
  }

  getProvider(name: ProviderType): AIProvider | undefined {
    return this.providers.get(name);
  }

  listProviders(): ProviderType[] {
    return Array.from(this.providers.keys());
  }
}

// 单例
let aiGateway: AIGateway | null = null;

export function getAIGateway(): AIGateway {
  if (!aiGateway) {
    aiGateway = new AIGateway({
      defaultProvider: (process.env.DEFAULT_AI_PROVIDER as ProviderType) || 'glm',
      fallbackOrder: ['glm', 'qwen', 'openai', 'claude', 'gemini', 'ernie'],
    });
  }
  return aiGateway;
}
```

### 5.3 各厂商实现

#### GLM (智谱)

```typescript
// src/services/ai/providers/glm.ts

import type { AIProvider, ChatRequest, ChatResponse } from '../types';

export class GLMProvider implements AIProvider {
  name = 'GLM-4-Flash';
  private apiKey: string;
  private baseURL = 'https://open.bigmodel.cn/api/paas/v4';

  constructor() {
    this.apiKey = process.env.ZHIPUAI_API_KEY || '';
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'glm-4-flash',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 1024,
      }),
    });

    if (!response.ok) {
      throw new Error(`GLM API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
      },
      finishReason: data.choices[0].finish_reason,
    };
  }

  async *chatStream(request: ChatRequest): AsyncIterable<string> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'glm-4-flash',
        messages: request.messages,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));
      
      for (const line of lines) {
        const data = line.replace('data: ', '');
        if (data === '[DONE]') return;
        
        try {
          const json = JSON.parse(data);
          const content = json.choices[0]?.delta?.content;
          if (content) yield content;
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
}
```

#### OpenAI

```typescript
// src/services/ai/providers/openai.ts

import OpenAI from 'openai';
import type { AIProvider, ChatRequest, ChatResponse } from '../types';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  private client: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.client = new OpenAI({ apiKey });
    }
  }

  async isAvailable(): Promise<boolean> {
    return this.client !== null;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.client) throw new Error('OpenAI not configured');

    const response = await this.client.chat.completions.create({
      model: request.model || 'gpt-4o-mini',
      messages: request.messages,
      temperature: request.temperature,
      max_tokens: request.maxTokens,
    });

    return {
      content: response.choices[0].message.content || '',
      model: response.model,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
      finishReason: response.choices[0].finish_reason || 'stop',
    };
  }

  async *chatStream(request: ChatRequest): AsyncIterable<string> {
    if (!this.client) throw new Error('OpenAI not configured');

    const stream = await this.client.chat.completions.create({
      model: request.model || 'gpt-4o-mini',
      messages: request.messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) yield content;
    }
  }
}
```

#### Claude

```typescript
// src/services/ai/providers/claude.ts

import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider, ChatRequest, ChatResponse } from '../types';

export class ClaudeProvider implements AIProvider {
  name = 'Claude';
  private client: Anthropic | null = null;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey) {
      this.client = new Anthropic({ apiKey });
    }
  }

  async isAvailable(): Promise<boolean> {
    return this.client !== null;
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.client) throw new Error('Claude not configured');

    // Claude 需要单独处理 system prompt
    const systemMessage = request.messages.find(m => m.role === 'system');
    const otherMessages = request.messages.filter(m => m.role !== 'system');

    const response = await this.client.messages.create({
      model: request.model || 'claude-3-haiku-20240307',
      max_tokens: request.maxTokens || 1024,
      system: systemMessage?.content,
      messages: otherMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    const textBlock = response.content.find(b => b.type === 'text');
    
    return {
      content: textBlock?.text || '',
      model: response.model,
      usage: {
        promptTokens: response.usage.input_tokens,
        completionTokens: response.usage.output_tokens,
        totalTokens: response.usage.input_tokens + response.usage.output_tokens,
      },
      finishReason: response.stop_reason || 'end_turn',
    };
  }

  async *chatStream(request: ChatRequest): AsyncIterable<string> {
    if (!this.client) throw new Error('Claude not configured');

    const systemMessage = request.messages.find(m => m.role === 'system');
    const otherMessages = request.messages.filter(m => m.role !== 'system');

    const stream = await this.client.messages.stream({
      model: request.model || 'claude-3-haiku-20240307',
      max_tokens: request.maxTokens || 1024,
      system: systemMessage?.content,
      messages: otherMessages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text;
      }
    }
  }
}
```

---

## 六、STT Service（Whisper Node.js）

```typescript
// src/services/stt.ts

import whisper from 'whisper-node';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

export class STTService {
  private model: string;

  constructor() {
    this.model = process.env.WHISPER_MODEL || 'small';
  }

  async transcribe(
    audioBuffer: Buffer,
    language: string = 'zh'
  ): Promise<{
    text: string;
    language: string;
    duration: number;
  }> {
    // 写入临时文件
    const tempPath = join(tmpdir(), `audio-${Date.now()}.wav`);
    await writeFile(tempPath, audioBuffer);

    try {
      const result = await whisper.transcribe(tempPath, {
        modelName: this.model,
        language,
      });

      return {
        text: result.join(' ').trim(),
        language,
        duration: result.length * 0.5, // 估算
      };
    } finally {
      await unlink(tempPath).catch(() => {});
    }
  }
}

export const sttService = new STTService();
```

---

## 七、TTS Service（火山引擎）

```typescript
// src/services/tts.ts

import axios from 'axios';

export class TTSService {
  private appId: string;
  private accessToken: string;
  private defaultVoice: string;
  private baseURL = 'https://openspeech.bytedance.com/api/v1/tts';

  constructor() {
    this.appId = process.env.VOLCENGINE_APP_ID || '';
    this.accessToken = process.env.VOLCENGINE_ACCESS_TOKEN || '';
    this.defaultVoice = process.env.DEFAULT_VOICE || 'zh_female_shuangkuaisisi_moon_bigtts';
  }

  async synthesize(
    text: string,
    voiceType?: string,
    speed: number = 1.0
  ): Promise<Buffer> {
    // 长文本分段
    if (Buffer.byteLength(text, 'utf8') > 900) {
      return this.synthesizeLongText(text, voiceType, speed);
    }

    const response = await axios.post(
      this.baseURL,
      {
        app: {
          appid: this.appId,
          token: 'access_token',
          cluster: 'volcano_tts',
        },
        user: { uid: 'polytalk' },
        audio: {
          voice_type: voiceType || this.defaultVoice,
          encoding: 'mp3',
          speed_ratio: speed,
          volume_ratio: 1.0,
          pitch_ratio: 1.0,
        },
        request: {
          reqid: `${Date.now()}`,
          text,
          operation: 'query',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        responseType: 'arraybuffer',
      }
    );

    return Buffer.from(response.data);
  }

  private async synthesizeLongText(
    text: string,
    voiceType?: string,
    speed: number
  ): Promise<Buffer> {
    const chunks: string[] = [];
    for (let i = 0; i < text.length; i += 300) {
      chunks.push(text.slice(i, i + 300));
    }

    const audioParts = await Promise.all(
      chunks.map(chunk => this.synthesize(chunk, voiceType, speed))
    );

    return Buffer.concat(audioParts);
  }
}

export const ttsService = new TTSService();
```

---

## 八、Hono 路由

### 8.1 主入口

```typescript
// src/app.ts

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import chatRouter from './routers/chat';
import sttRouter from './routers/stt';
import ttsRouter from './routers/tts';

const app = new Hono();

// 中间件
app.use('*', cors());
app.use('*', logger());

// 路由
app.route('/chat', chatRouter);
app.route('/stt', sttRouter);
app.route('/tts', ttsRouter);

// 健康检查
app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'PolyTalk API', version: '2.0' });
});

export default app;
```

```typescript
// src/index.ts

import { serve } from '@hono/node-server';
import app from './app';

const port = parseInt(process.env.PORT || '8000');

console.log(`🚀 PolyTalk API 启动`);
console.log(`📍 http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
```

### 8.2 Chat 路由

```typescript
// src/routers/chat.ts

import { Hono } from 'hono';
import { getAIGateway } from '../services/ai';

const router = new Hono();

router.post('/', async (c) => {
  try {
    const body = await c.req.json();
    const { message, history = [], provider } = body;

    const ai = getAIGateway();
    
    const response = await ai.chat({
      messages: [
        ...history,
        { role: 'user', content: message },
      ],
    }, provider);

    return c.json({
      success: true,
      reply: response.content,
      model: response.model,
      usage: response.usage,
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

router.post('/stream', async (c) => {
  const body = await c.req.json();
  const { message, history = [], provider } = body;

  const ai = getAIGateway();
  
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      try {
        for await (const chunk of ai.chatStream({
          messages: [
            ...history,
            { role: 'user', content: message },
          ],
        }, provider)) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      } catch (error: any) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: error.message })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
});

// 获取可用供应商列表
router.get('/providers', (c) => {
  const ai = getAIGateway();
  return c.json({ providers: ai.listProviders() });
});

export default router;
```

### 8.3 STT/TTS 路由

```typescript
// src/routers/stt.ts

import { Hono } from 'hono';
import { sttService } from '../services/stt';

const router = new Hono();

router.post('/transcribe', async (c) => {
  try {
    const formData = await c.req.parseBody();
    const audio = formData['audio'] as File;
    const language = (formData['language'] as string) || 'zh';

    const buffer = Buffer.from(await audio.arrayBuffer());
    const result = await sttService.transcribe(buffer, language);

    return c.json({
      success: true,
      text: result.text,
      language: result.language,
      duration: result.duration,
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default router;
```

```typescript
// src/routers/tts.ts

import { Hono } from 'hono';
import { ttsService } from '../services/tts';

const router = new Hono();

router.post('/synthesize', async (c) => {
  try {
    const body = await c.req.json();
    const { text, voiceType, speed = 1.0 } = body;

    const audioBuffer = await ttsService.synthesize(text, voiceType, speed);

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename=output.mp3',
      },
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

router.get('/voices', (c) => {
  return c.json({
    voices: [
      { id: 'zh_female_shuangkuaisisi_moon_bigtts', name: '情感女声', gender: 'female' },
      { id: 'zh_male_chunhou_moon_bigtts', name: '醇厚男声', gender: 'male' },
      { id: 'zh_female_tianmei_bigtts', name: '甜美女声', gender: 'female' },
      { id: 'zh_male_wennuan_bigtts', name: '温暖男声', gender: 'male' },
    ],
  });
});

export default router;
```

---

## 九、配置管理

```env
# .env.example

# AI Providers (按需配置)
ZHIPUAI_API_KEY=your_glm_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_AI_KEY=your_gemini_key
BAIDU_ERNIE_KEY=your_ernie_key
ALI_QWEN_KEY=your_qwen_key

# 默认供应商
DEFAULT_AI_PROVIDER=glm

# 火山引擎 TTS
VOLCENGINE_APP_ID=your_app_id
VOLCENGINE_ACCESS_TOKEN=your_access_token
DEFAULT_VOICE=zh_female_shuangkuaisisi_moon_bigtts

# Whisper
WHISPER_MODEL=small

# Server
PORT=8000
NODE_ENV=production
```

---

## 十、部署方案

### 10.1 Oracle Cloud（海外）

```dockerfile
# Dockerfile

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY .env.example .env

EXPOSE 8000

CMD ["node", "dist/index.js"]
```

```yaml
# docker-compose.yml

version: '3.8'

services:
  polytalk-api:
    build: .
    ports:
      - "8000:8000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
```

### 10.2 阿里云（国内 TTS）

```bash
# 部署到阿里云 ECS
# TTS 服务单独部署，提供国内访问
```

---

## 十一、跨境 API 调用评估

### 11.1 延迟对比

| 供应商 | 服务器位置 | 国内延迟 | 海外延迟 | 推荐 |
|--------|------------|----------|----------|------|
| GLM | 国内 | 50-100ms | 200-300ms | ✅ 国内优先 |
| 文心 | 国内 | 50-100ms | 200-300ms | ✅ 国内优先 |
| 通义 | 国内 | 50-100ms | 200-300ms | ✅ 国内优先 |
| OpenAI | 海外 | 300-500ms | 50-100ms | ✅ 海外优先 |
| Claude | 海外 | 300-500ms | 50-100ms | ✅ 海外优先 |
| Gemini | 海外 | 300-500ms | 50-100ms | ✅ 海外优先 |
| 火山 TTS | 国内 | 50-100ms | - | ✅ 国内部署 |

### 11.2 推荐策略

```
Oracle Cloud (海外) → OpenAI / Claude / Gemini (低延迟)
         ↓
    AI Gateway (统一接口)
         ↓
阿里云 (国内) → GLM / 文心 / 通义 / 火山 TTS (低延迟)
```

---

## 十二、成本对比

| 方案 | 月成本 | 备注 |
|------|--------|------|
| **原方案**（Python 单厂商） | ¥0-75 | 仅 GLM + 火山 TTS |
| **新方案**（Node.js 多厂商） | ¥0-200 | 多厂商冗余，更高可用 |

**成本增加原因**：
- 多厂商 API Key（但免费额度叠加）
- 双云部署（Oracle 免费层 + 阿里云最低配）

---

## 十三、测试用例

```typescript
// tests/ai.test.ts

import { describe, it, expect } from 'vitest';
import { getAIGateway } from '../src/services/ai';

describe('AI Gateway', () => {
  it('should chat with GLM', async () => {
    const ai = getAIGateway();
    const response = await ai.chat({
      messages: [{ role: 'user', content: '你好' }],
    }, 'glm');

    expect(response.content).toBeTruthy();
    expect(response.model).toContain('glm');
  });

  it('should fallback to next provider', async () => {
    const ai = getAIGateway();
    // 假设 GLM 不可用，应降级到 qwen
    const response = await ai.chat({
      messages: [{ role: 'user', content: '测试' }],
    });

    expect(response.content).toBeTruthy();
  });
});
```

---

## 十四、启动方式

```bash
# 安装依赖
npm install

# 构建
npm run build

# 开发
npm run dev

# 生产
npm start
```

---

## 十五、API 文档

启动后访问：
- http://localhost:8000/health
- POST http://localhost:8000/chat
- POST http://localhost:8000/stt/transcribe
- POST http://localhost:8000/tts/synthesize

---

**状态**：✅ v2 设计完成

**变更总结**：
- ✅ Python → Node.js (Hono)
- ✅ 单厂商 → 6厂商统一接口
- ✅ 单机 → Oracle Cloud + 阿里云双部署
- ✅ 降级策略 → 智能故障转移

—— 兵部 张居正

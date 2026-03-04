# PolyTalk AI Provider 实现
**兵部 张居正** | 2026-03-03 18:05
**状态**：待工部脚手架就绪后集成

---

## 一、目录结构（NestJS）

```
src/
├── modules/
│   └── ai/
│       ├── ai.module.ts
│       ├── ai.controller.ts
│       ├── ai.service.ts
│       ├── interfaces/
│       │   ├── ai-provider.interface.ts
│       │   └── chat.dto.ts
│       ├── providers/
│       │   ├── provider.registry.ts
│       │   ├── base.provider.ts
│       │   ├── glm.provider.ts
│       │   ├── openai.provider.ts
│       │   ├── claude.provider.ts
│       │   ├── gemini.provider.ts
│       │   ├── ernie.provider.ts
│       │   └── qwen.provider.ts
│       └── dto/
│           ├── chat-request.dto.ts
│           └── chat-response.dto.ts
```

---

## 二、核心接口定义

```typescript
// src/modules/ai/interfaces/ai-provider.interface.ts

export type Role = 'system' | 'user' | 'assistant';

export interface ChatMessage {
  role: Role;
  content: string;
  name?: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  stop?: string[];
  metadata?: Record<string, any>;
}

export interface ChatUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface ChatResponse {
  id: string;
  content: string;
  model: string;
  provider: string;
  usage: ChatUsage;
  finishReason: 'stop' | 'length' | 'content_filter' | string;
  latencyMs: number;
  created: Date;
}

export interface StreamChunk {
  id: string;
  content: string;
  done: boolean;
}

export interface AIProvider {
  readonly name: string;
  readonly provider: string;
  readonly models: string[];
  readonly defaultModel: string;
  
  chat(request: ChatRequest): Promise<ChatResponse>;
  chatStream(request: ChatRequest): AsyncGenerator<StreamChunk>;
  isAvailable(): Promise<boolean>;
  estimateCost(tokens: number): number;
  validateRequest(request: ChatRequest): void;
}

export interface ProviderConfig {
  apiKey?: string;
  baseURL?: string;
  timeout?: number;
  retries?: number;
}
```

---

## 三、Base Provider（抽象基类）

```typescript
// src/modules/ai/providers/base.provider.ts

import { Logger } from '@nestjs/common';
import { AIProvider, ChatRequest, ChatResponse, ProviderConfig } from '../interfaces/ai-provider.interface';

export abstract class BaseProvider implements AIProvider {
  abstract readonly name: string;
  abstract readonly provider: string;
  abstract readonly models: string[];
  abstract readonly defaultModel: string;
  
  protected logger: Logger;
  protected config: ProviderConfig;
  
  constructor(config: ProviderConfig = {}) {
    this.logger = new Logger(this.constructor.name);
    this.config = {
      timeout: 30000,
      retries: 3,
      ...config,
    };
  }
  
  abstract chat(request: ChatRequest): Promise<ChatResponse>;
  abstract chatStream(request: ChatRequest): AsyncGenerator<{ id: string; content: string; done: boolean }>;
  
  async isAvailable(): Promise<boolean> {
    return !!this.config.apiKey;
  }
  
  estimateCost(tokens: number): number {
    // 默认实现，子类可覆盖
    return 0;
  }
  
  validateRequest(request: ChatRequest): void {
    if (!request.messages || request.messages.length === 0) {
      throw new Error('Messages array cannot be empty');
    }
    
    for (const msg of request.messages) {
      if (!msg.role || !msg.content) {
        throw new Error('Each message must have role and content');
      }
    }
    
    if (request.temperature && (request.temperature < 0 || request.temperature > 2)) {
      throw new Error('Temperature must be between 0 and 2');
    }
    
    if (request.maxTokens && request.maxTokens < 1) {
      throw new Error('maxTokens must be at least 1');
    }
  }
  
  protected generateId(): string {
    return `${this.provider}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  protected handleError(error: any, context: string): never {
    this.logger.error(`${context}: ${error.message}`, error.stack);
    
    if (error.response?.status === 429) {
      throw new Error(`${this.name} rate limit exceeded`);
    }
    
    if (error.response?.status === 401) {
      throw new Error(`${this.name} authentication failed`);
    }
    
    throw new Error(`${this.name} error: ${error.message}`);
  }
}
```

---

## 四、GLM Provider 实现

```typescript
// src/modules/ai/providers/glm.provider.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseProvider } from './base.provider';
import { ChatRequest, ChatResponse, StreamChunk } from '../interfaces/ai-provider.interface';

@Injectable()
export class GLMProvider extends BaseProvider {
  readonly name = '智谱 GLM';
  readonly provider = 'glm';
  readonly models = ['glm-4-flash', 'glm-4', 'glm-4-plus', 'glm-3-turbo'];
  readonly defaultModel = 'glm-4-flash';
  
  private apiKey: string;
  private readonly baseURL = 'https://open.bigmodel.cn/api/paas/v4';
  
  constructor(private configService: ConfigService) {
    super({
      apiKey: configService.get<string>('ZHIPUAI_API_KEY'),
      timeout: 30000,
    });
    this.apiKey = this.config.apiKey || '';
  }
  
  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }
  
  async chat(request: ChatRequest): Promise<ChatResponse> {
    this.validateRequest(request);
    
    const startTime = Date.now();
    const model = request.model || this.defaultModel;
    
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: request.messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 1024,
          stop: request.stop,
        }),
        signal: AbortSignal.timeout(this.config.timeout!),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `GLM API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        id: data.id || this.generateId(),
        content: data.choices[0].message.content,
        model: data.model,
        provider: this.provider,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        },
        finishReason: data.choices[0].finish_reason,
        latencyMs: Date.now() - startTime,
        created: new Date(),
      };
    } catch (error: any) {
      this.handleError(error, 'GLM chat');
    }
  }
  
  async *chatStream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    this.validateRequest(request);
    
    const model = request.model || this.defaultModel;
    const messageId = this.generateId();
    
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: request.messages,
          stream: true,
          temperature: request.temperature ?? 0.7,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`GLM stream error: ${response.status}`);
      }
      
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');
      
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
        
        for (const line of lines) {
          const data = line.replace('data: ', '').trim();
          
          if (data === '[DONE]') {
            yield { id: messageId, content: '', done: true };
            return;
          }
          
          try {
            const json = JSON.parse(data);
            const content = json.choices[0]?.delta?.content;
            
            if (content) {
              yield { id: messageId, content, done: false };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
      
      yield { id: messageId, content: '', done: true };
    } catch (error: any) {
      this.handleError(error, 'GLM stream');
    }
  }
  
  estimateCost(tokens: number): number {
    // GLM-4-Flash 免费
    return 0;
  }
}
```

---

## 五、OpenAI Provider 实现

```typescript
// src/modules/ai/providers/openai.provider.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { BaseProvider } from './base.provider';
import { ChatRequest, ChatResponse, StreamChunk } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider extends BaseProvider {
  readonly name = 'OpenAI';
  readonly provider = 'openai';
  readonly models = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'];
  readonly defaultModel = 'gpt-4o-mini';
  
  private client: OpenAI | null = null;
  
  constructor(private configService: ConfigService) {
    const apiKey = configService.get<string>('OPENAI_API_KEY');
    super({ apiKey });
    
    if (apiKey) {
      this.client = new OpenAI({ 
        apiKey,
        timeout: 30000,
      });
    }
  }
  
  async isAvailable(): Promise<boolean> {
    return this.client !== null;
  }
  
  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.client) throw new Error('OpenAI not configured');
    this.validateRequest(request);
    
    const startTime = Date.now();
    const model = request.model || this.defaultModel;
    
    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: request.messages as any,
        temperature: request.temperature,
        max_tokens: request.maxTokens,
        stop: request.stop,
      });
      
      return {
        id: response.id,
        content: response.choices[0].message.content || '',
        model: response.model,
        provider: this.provider,
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
        finishReason: response.choices[0].finish_reason || 'stop',
        latencyMs: Date.now() - startTime,
        created: new Date(response.created * 1000),
      };
    } catch (error: any) {
      this.handleError(error, 'OpenAI chat');
    }
  }
  
  async *chatStream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    if (!this.client) throw new Error('OpenAI not configured');
    this.validateRequest(request);
    
    const model = request.model || this.defaultModel;
    const messageId = this.generateId();
    
    try {
      const stream = await this.client.chat.completions.create({
        model,
        messages: request.messages as any,
        stream: true,
        temperature: request.temperature,
      });
      
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        
        if (content) {
          yield { id: messageId, content, done: false };
        }
      }
      
      yield { id: messageId, content: '', done: true };
    } catch (error: any) {
      this.handleError(error, 'OpenAI stream');
    }
  }
  
  estimateCost(tokens: number): number {
    // GPT-4o-mini: $0.15/1M input, $0.60/1M output
    // 粗略估算：平均 $0.375/1M tokens
    return (tokens / 1_000_000) * 0.375;
  }
}
```

---

## 六、Claude Provider 实现

```typescript
// src/modules/ai/providers/claude.provider.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';
import { BaseProvider } from './base.provider';
import { ChatRequest, ChatResponse, StreamChunk } from '../interfaces/ai-provider.interface';

@Injectable()
export class ClaudeProvider extends BaseProvider {
  readonly name = 'Claude';
  readonly provider = 'claude';
  readonly models = ['claude-3-5-sonnet-20241022', 'claude-3-haiku-20240307', 'claude-3-opus-20240229'];
  readonly defaultModel = 'claude-3-haiku-20240307';
  
  private client: Anthropic | null = null;
  
  constructor(private configService: ConfigService) {
    const apiKey = configService.get<string>('ANTHROPIC_API_KEY');
    super({ apiKey });
    
    if (apiKey) {
      this.client = new Anthropic({ apiKey });
    }
  }
  
  async isAvailable(): Promise<boolean> {
    return this.client !== null;
  }
  
  async chat(request: ChatRequest): Promise<ChatResponse> {
    if (!this.client) throw new Error('Claude not configured');
    this.validateRequest(request);
    
    const startTime = Date.now();
    const model = request.model || this.defaultModel;
    
    // Claude 需要单独处理 system prompt
    const systemMessage = request.messages.find(m => m.role === 'system');
    const otherMessages = request.messages.filter(m => m.role !== 'system');
    
    try {
      const response = await this.client.messages.create({
        model,
        max_tokens: request.maxTokens || 1024,
        system: systemMessage?.content,
        messages: otherMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      });
      
      const textBlock = response.content.find(b => b.type === 'text');
      
      return {
        id: response.id,
        content: (textBlock as any)?.text || '',
        model: response.model,
        provider: this.provider,
        usage: {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
        },
        finishReason: response.stop_reason || 'end_turn',
        latencyMs: Date.now() - startTime,
        created: new Date(),
      };
    } catch (error: any) {
      this.handleError(error, 'Claude chat');
    }
  }
  
  async *chatStream(request: ChatRequest): AsyncGenerator<StreamChunk> {
    if (!this.client) throw new Error('Claude not configured');
    this.validateRequest(request);
    
    const model = request.model || this.defaultModel;
    const messageId = this.generateId();
    
    const systemMessage = request.messages.find(m => m.role === 'system');
    const otherMessages = request.messages.filter(m => m.role !== 'system');
    
    try {
      const stream = await this.client.messages.stream({
        model,
        max_tokens: request.maxTokens || 1024,
        system: systemMessage?.content,
        messages: otherMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      });
      
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          yield { id: messageId, content: (event.delta as any).text, done: false };
        }
      }
      
      yield { id: messageId, content: '', done: true };
    } catch (error: any) {
      this.handleError(error, 'Claude stream');
    }
  }
  
  estimateCost(tokens: number): number {
    // Claude Haiku: $0.25/1M input, $1.25/1M output
    // 粗略估算：平均 $0.75/1M tokens
    return (tokens / 1_000_000) * 0.75;
  }
}
```

---

## 七、Provider 注册表

```typescript
// src/modules/ai/providers/provider.registry.ts

import { Injectable, Logger } from '@nestjs/common';
import { AIProvider } from '../interfaces/ai-provider.interface';

export type ProviderType = 'glm' | 'openai' | 'claude' | 'gemini' | 'ernie' | 'qwen';

@Injectable()
export class ProviderRegistry {
  private readonly logger = new Logger(ProviderRegistry.name);
  private readonly providers = new Map<ProviderType, AIProvider>();
  
  register(type: ProviderType, provider: AIProvider): void {
    this.providers.set(type, provider);
    this.logger.log(`Registered AI provider: ${provider.name}`);
  }
  
  get(type: ProviderType): AIProvider | undefined {
    return this.providers.get(type);
  }
  
  has(type: ProviderType): boolean {
    return this.providers.has(type);
  }
  
  list(): ProviderType[] {
    return Array.from(this.providers.keys());
  }
  
  async listAvailable(): Promise<Array<{ type: ProviderType; name: string; available: boolean }>> {
    const results = [];
    
    for (const [type, provider] of this.providers) {
      const available = await provider.isAvailable();
      results.push({
        type,
        name: provider.name,
        available,
      });
    }
    
    return results;
  }
}
```

---

## 八、AI Gateway Service

```typescript
// src/modules/ai/ai.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProviderRegistry, ProviderType } from './providers/provider.registry';
import { ChatRequest, ChatResponse, StreamChunk } from './interfaces/ai-provider.interface';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly defaultProvider: ProviderType;
  private readonly fallbackOrder: ProviderType[];
  
  constructor(
    private readonly registry: ProviderRegistry,
    private readonly configService: ConfigService,
  ) {
    this.defaultProvider = (this.configService.get('DEFAULT_AI_PROVIDER') as ProviderType) || 'glm';
    this.fallbackOrder = ['glm', 'qwen', 'openai', 'claude', 'gemini', 'ernie'];
  }
  
  async chat(request: ChatRequest, provider?: ProviderType): Promise<ChatResponse> {
    const targetProvider = provider || this.defaultProvider;
    
    // 尝试指定供应商
    try {
      const p = this.registry.get(targetProvider);
      if (p && await p.isAvailable()) {
        this.logger.debug(`Using provider: ${targetProvider}`);
        return await p.chat(request);
      }
    } catch (error: any) {
      this.logger.warn(`${targetProvider} failed: ${error.message}`);
    }
    
    // 降级到其他供应商
    for (const fallbackType of this.fallbackOrder) {
      if (fallbackType === targetProvider) continue;
      
      try {
        const p = this.registry.get(fallbackType);
        if (p && await p.isAvailable()) {
          this.logger.log(`Fallback to ${fallbackType}`);
          return await p.chat(request);
        }
      } catch (error: any) {
        this.logger.warn(`${fallbackType} failed: ${error.message}`);
        continue;
      }
    }
    
    throw new Error('All AI providers unavailable');
  }
  
  async *chatStream(request: ChatRequest, provider?: ProviderType): AsyncGenerator<StreamChunk> {
    const targetProvider = provider || this.defaultProvider;
    const p = this.registry.get(targetProvider);
    
    if (!p) {
      throw new Error(`Provider ${targetProvider} not registered`);
    }
    
    if (!(await p.isAvailable())) {
      throw new Error(`Provider ${targetProvider} not available`);
    }
    
    this.logger.debug(`Streaming from provider: ${targetProvider}`);
    yield* p.chatStream(request);
  }
  
  async listProviders() {
    return this.registry.listAvailable();
  }
  
  getProvider(type: ProviderType): AIProvider | undefined {
    return this.registry.get(type);
  }
}
```

---

## 九、AI Module

```typescript
// src/modules/ai/ai.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';
import { ProviderRegistry } from './providers/provider.registry';
import { GLMProvider } from './providers/glm.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { ClaudeProvider } from './providers/claude.provider';

@Module({
  imports: [ConfigModule],
  controllers: [AIController],
  providers: [
    ProviderRegistry,
    AIService,
    GLMProvider,
    OpenAIProvider,
    ClaudeProvider,
    {
      provide: 'PROVIDER_SETUP',
      useFactory: (
        registry: ProviderRegistry,
        glm: GLMProvider,
        openai: OpenAIProvider,
        claude: ClaudeProvider,
      ) => {
        registry.register('glm', glm);
        registry.register('openai', openai);
        registry.register('claude', claude);
        return registry;
      },
      inject: [ProviderRegistry, GLMProvider, OpenAIProvider, ClaudeProvider],
    },
  ],
  exports: [AIService],
})
export class AIModule {}
```

---

## 十、AI Controller

```typescript
// src/modules/ai/ai.controller.ts

import { Controller, Post, Body, Sse, MessageEvent } from '@nestjs/common';
import { AIService } from './ai.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { Observable } from 'rxjs';

@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}
  
  @Post('chat')
  async chat(@Body() dto: ChatRequestDto) {
    return this.aiService.chat(dto.toRequest(), dto.provider);
  }
  
  @Sse('chat/stream')
  chatStream(@Body() dto: ChatRequestDto): Observable<MessageEvent> {
    return new Observable((subscriber) => {
      (async () => {
        try {
          for await (const chunk of this.aiService.chatStream(dto.toRequest(), dto.provider)) {
            subscriber.next({ data: chunk });
            
            if (chunk.done) {
              subscriber.complete();
              break;
            }
          }
        } catch (error: any) {
          subscriber.error(error);
        }
      })();
    });
  }
  
  @Post('providers')
  async listProviders() {
    return this.aiService.listProviders();
  }
}
```

---

## 十一、DTO

```typescript
// src/modules/ai/dto/chat-request.dto.ts

import { IsArray, IsOptional, IsNumber, IsString, IsEnum, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ChatRequest, ChatMessage, ProviderType } from '../interfaces/ai-provider.interface';

class ChatMessageDto implements ChatMessage {
  @IsEnum(['system', 'user', 'assistant'])
  role: 'system' | 'user' | 'assistant';
  
  @IsString()
  content: string;
  
  @IsOptional()
  @IsString()
  name?: string;
}

export class ChatRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatMessageDto)
  messages: ChatMessageDto[];
  
  @IsOptional()
  @IsString()
  model?: string;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;
  
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxTokens?: number;
  
  @IsOptional()
  @IsBoolean()
  stream?: boolean;
  
  @IsOptional()
  @IsEnum(['glm', 'openai', 'claude', 'gemini', 'ernie', 'qwen'])
  provider?: ProviderType;
  
  toRequest(): ChatRequest {
    return {
      messages: this.messages,
      model: this.model,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
      stream: this.stream,
    };
  }
}
```

---

## 十二、使用示例

```typescript
// 在 ChatService 中使用

import { Injectable } from '@nestjs/common';
import { AIService } from '../ai/ai.service';

@Injectable()
export class ChatService {
  constructor(private readonly aiService: AIService) {}
  
  async sendMessage(convId: string, content: string) {
    const history = await this.getHistory(convId);
    
    const response = await this.aiService.chat({
      messages: [
        { role: 'system', content: 'You are a language teacher...' },
        ...history,
        { role: 'user', content },
      ],
      temperature: 0.8,
      maxTokens: 1024,
    }, 'glm');
    
    // 保存到数据库...
    return response;
  }
}
```

---

## 十三、环境变量

```env
# AI Providers
ZHIPUAI_API_KEY=your_glm_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_AI_KEY=your_gemini_key

# Default Provider
DEFAULT_AI_PROVIDER=glm

# Timeouts
AI_REQUEST_TIMEOUT=30000
AI_STREAM_TIMEOUT=60000
```

---

**状态**：✅ 代码就绪，待工部脚手架集成

**下一步**：
1. 工部初始化 NestJS 项目
2. 安装依赖：`npm install openai @anthropic-ai/sdk`
3. 复制 `src/modules/ai` 目录到项目
4. 在 `app.module.ts` 导入 `AIModule`

—— 兵部 张居正

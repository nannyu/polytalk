# PolyTalk API 限流策略 v1
**兵部 张居正** | 2026-03-03 18:07
**状态**：已完成

---

## 一、限流方案概述

### 1.1 限流目标

- 防止 API 滥用
- 保护服务器资源
- 公平分配资源
- 防止 DDoS 攻击

### 1.2 限流维度

| 维度 | 说明 | 默认值 |
|------|------|--------|
| IP 全局限流 | 单 IP 所有接口总请求 | 1000次/分钟 |
| 用户全局限流 | 单用户所有接口总请求 | 500次/分钟 |
| 接口级别 | 单接口请求频率 | 按接口类型 |
| AI 接口 | AI 对话成本高 | 特殊限制 |

---

## 二、NestJS 限流集成

### 2.1 依赖安装

```bash
npm install @nestjs/throttler
```

### 2.2 全局配置

```typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    // 全局限流配置
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,  // 1秒
        limit: 3,   // 最多3次
      },
      {
        name: 'medium',
        ttl: 10000, // 10秒
        limit: 20,  // 最多20次
      },
      {
        name: 'long',
        ttl: 60000, // 1分钟
        limit: 100, // 最多100次
      },
    ]),
    // 其他模块...
  ],
  providers: [
    // 全局启用限流守卫
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
```

---

## 三、分级限流策略

### 3.1 限流级别定义

```typescript
// src/common/guards/rate-limit.config.ts

export const RateLimitPolicy = {
  // 认证接口（宽松）
  auth: {
    login: { ttl: 60000, limit: 10 },       // 登录：10次/分钟
    register: { ttl: 3600000, limit: 5 },   // 注册：5次/小时
    refresh: { ttl: 60000, limit: 30 },     // 刷新：30次/分钟
  },
  
  // 读取接口（中等）
  read: {
    list: { ttl: 60000, limit: 60 },        // 列表：60次/分钟
    detail: { ttl: 60000, limit: 100 },     // 详情：100次/分钟
  },
  
  // 写入接口（严格）
  write: {
    create: { ttl: 60000, limit: 20 },      // 创建：20次/分钟
    update: { ttl: 60000, limit: 30 },      // 更新：30次/分钟
    delete: { ttl: 60000, limit: 10 },      // 删除：10次/分钟
  },
  
  // AI 接口（最严格）
  ai: {
    chat: { ttl: 60000, limit: 20 },        // 对话：20次/分钟
    stream: { ttl: 60000, limit: 10 },      // 流式：10次/分钟
    stt: { ttl: 60000, limit: 30 },         // 语音识别：30次/分钟
    tts: { ttl: 60000, limit: 30 },         // 语音合成：30次/分钟
  },
  
  // WebSocket
  websocket: {
    message: { ttl: 60000, limit: 60 },     // 消息：60次/分钟
  },
} as const;
```

### 3.2 用户等级配额

```typescript
// src/common/guards/tier-limits.config.ts

export const TierLimits = {
  free: {
    dailyMessages: 50,          // 每日消息数
    dailyTokens: 10000,         // 每日 Token 数
    conversations: 5,           // 最大会话数
    courses: 1,                 // 最大报名课程数
  },
  
  basic: {
    dailyMessages: 200,
    dailyTokens: 50000,
    conversations: 20,
    courses: 3,
  },
  
  pro: {
    dailyMessages: 1000,
    dailyTokens: 500000,
    conversations: 100,
    courses: 10,
  },
} as const;
```

---

## 四、自定义限流守卫

### 4.1 基于用户的限流

```typescript
// src/common/guards/user-throttler.guard.ts

import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // 优先使用用户 ID，否则使用 IP
    const userId = req.user?.userId;
    return userId ? `user_${userId}` : `ip_${req.ip}`;
  }
  
  protected async generateKey(
    context: ExecutionContext,
    suffix: string,
    name: string,
  ): Promise<string> {
    const req = context.switchToHttp().getRequest();
    const tracker = await this.getTracker(req);
    return `throttler:${tracker}:${suffix}:${name}`;
  }
}
```

### 4.2 基于角色的限流

```typescript
// src/common/guards/role-throttler.guard.ts

import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TierLimits } from './tier-limits.config';

@Injectable()
export class RoleThrottlerGuard extends ThrottlerGuard {
  protected async getLimit(
    context: ExecutionContext,
    name: string,
  ): Promise<number> {
    const req = context.switchToHttp().getRequest();
    const tier = req.user?.tier || 'free';
    
    // Pro 用户翻倍配额
    const multiplier = tier === 'pro' ? 2 : tier === 'basic' ? 1.5 : 1;
    
    const handler = context.getHandler();
    const classRef = context.getClass();
    const limit = this.reflector.get<number>(
      'throttler:limit',
      handler || classRef,
    );
    
    return Math.floor((limit || 100) * multiplier);
  }
}
```

### 4.3 AI 接口特殊限流

```typescript
// src/common/guards/ai-throttler.guard.ts

import { Injectable, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { TierLimits } from './tier-limits.config';

@Injectable()
export class AIThrottlerGuard extends ThrottlerGuard {
  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user?.userId;
    
    if (!userId) {
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED);
    }
    
    return false;
  }
  
  protected async throwThrottlingException(
    context: ExecutionContext,
    ttl: number,
    limit: number,
  ): Promise<void> {
    const req = context.switchToHttp().getRequest();
    const tier = req.user?.tier || 'free';
    
    throw new HttpException(
      {
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: `请求过于频繁，请稍后再试`,
          details: {
            retryAfter: Math.ceil(ttl / 1000),
            tier,
            upgradeHint: tier === 'free' 
              ? '升级到 Pro 可获得更高配额' 
              : undefined,
          },
        },
        timestamp: new Date().toISOString(),
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
```

---

## 五、装饰器使用

### 5.1 Skip Throttle（跳过限流）

```typescript
import { SkipThrottle } from '@nestjs/throttler';

@Controller('health')
export class HealthController {
  @SkipThrottle()
  @Get()
  check() {
    return { status: 'ok' };
  }
}
```

### 5.2 Throttle（自定义限流）

```typescript
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  login() {
    // 登录：5次/分钟
  }
  
  @Throttle({ default: { limit: 3, ttl: 3600000 } })
  @Post('register')
  register() {
    // 注册：3次/小时
  }
}
```

### 5.3 自定义装饰器

```typescript
// src/common/decorators/rate-limit.decorator.ts

import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate_limit';

export interface RateLimitConfig {
  ttl: number;
  limit: number;
  key?: string;
}

export const RateLimit = (config: RateLimitConfig) => 
  SetMetadata(RATE_LIMIT_KEY, config);

// 使用示例
@Controller('chat')
export class ChatController {
  @RateLimit({ ttl: 60000, limit: 20, key: 'ai_chat' })
  @Post('messages')
  sendMessage() {}
}
```

---

## 六、Redis 存储（分布式限流）

### 6.1 依赖安装

```bash
npm install @nestjs/throttler ioredis
```

### 6.2 Redis 配置

```typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from './common/storage/throttler-redis.storage';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
        storage: new ThrottlerStorageRedisService({
          host: 'localhost',
          port: 6379,
        }),
      },
    ]),
  ],
})
export class AppModule {}
```

### 6.3 自定义 Redis 存储

```typescript
// src/common/storage/throttler-redis.storage.ts

import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import Redis from 'ioredis';

@Injectable()
export class ThrottlerStorageRedisService implements ThrottlerStorage {
  private readonly redis: Redis;
  
  constructor(options: Redis.RedisOptions) {
    this.redis = new Redis(options);
  }
  
  async increment(key: string, ttl: number): Promise<{ totalHits: number; timeToExpire: number }> {
    const current = await this.redis.get(key);
    const totalHits = current ? parseInt(current, 10) + 1 : 1;
    
    if (totalHits === 1) {
      await this.redis.setex(key, Math.ceil(ttl / 1000), '1');
    } else {
      await this.redis.incr(key);
    }
    
    const ttlRemaining = await this.redis.ttl(key);
    
    return {
      totalHits,
      timeToExpire: ttlRemaining * 1000,
    };
  }
}
```

---

## 七、限流响应格式

### 7.1 429 响应

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "请求过于频繁，请稍后再试",
    "details": {
      "retryAfter": 45,
      "limit": 20,
      "window": "1 minute",
      "tier": "free",
      "upgradeHint": "升级到 Pro 可获得更高配额"
    }
  },
  "timestamp": "2026-03-03T18:07:00Z"
}
```

### 7.2 响应头

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1709473620
Retry-After: 45
```

### 7.3 响应头中间件

```typescript
// src/common/middleware/rate-limit-headers.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitHeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalSend = res.send;
    
    res.send = function (body: any) {
      // 添加限流头
      if (req.rateLimit) {
        res.setHeader('X-RateLimit-Limit', req.rateLimit.limit);
        res.setHeader('X-RateLimit-Remaining', req.rateLimit.remaining);
        res.setHeader('X-RateLimit-Reset', req.rateLimit.reset);
      }
      
      return originalSend.call(this, body);
    };
    
    next();
  }
}
```

---

## 八、限流监控与告警

### 8.1 限流日志

```typescript
// src/common/interceptors/rate-limit-logger.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RateLimitLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger('RateLimit');
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      catchError((error) => {
        if (error.status === 429) {
          this.logger.warn(
            `Rate limit exceeded - IP: ${req.ip}, User: ${req.user?.userId}, Path: ${req.path}`,
          );
        }
        return throwError(() => error);
      }),
    );
  }
}
```

### 8.2 Prometheus 指标

```typescript
// src/common/metrics/rate-limit.metrics.ts

import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Registry } from 'prom-client';

@Injectable()
export class RateLimitMetrics {
  private readonly rateLimitExceeded: Counter;
  private readonly rateLimitCheck: Histogram;
  
  constructor(private readonly registry: Registry) {
    this.rateLimitExceeded = new Counter({
      name: 'rate_limit_exceeded_total',
      help: 'Total number of rate limit exceeded events',
      labelNames: ['endpoint', 'tier', 'user_id'],
      registers: [registry],
    });
    
    this.rateLimitCheck = new Histogram({
      name: 'rate_limit_check_duration_seconds',
      help: 'Duration of rate limit checks',
      labelNames: ['endpoint'],
      registers: [registry],
    });
  }
  
  recordExceeded(endpoint: string, tier: string, userId: string) {
    this.rateLimitExceeded.inc({ endpoint, tier, user_id: userId });
  }
  
  startTimer(endpoint: string) {
    return this.rateLimitCheck.startTimer({ endpoint });
  }
}
```

### 8.3 告警规则（Prometheus）

```yaml
# prometheus/alerts.yml

groups:
  - name: rate_limit
    interval: 30s
    rules:
      - alert: HighRateLimitExceeded
        expr: rate(rate_limit_exceeded_total[5m]) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "高频限流触发"
          description: "过去5分钟限流触发率 > 10/min"
      
      - alert: RateLimitAbuse
        expr: rate(rate_limit_exceeded_total[1m]) > 50
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "疑似滥用攻击"
          description: "过去1分钟限流触发率 > 50/min，可能存在恶意攻击"
```

---

## 九、特殊场景处理

### 9.1 白名单

```typescript
// src/common/guards/whitelist.guard.ts

import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class WhitelistThrottlerGuard extends ThrottlerGuard {
  private readonly whitelist = new Set([
    '127.0.0.1',
    '::1',
    // 内网 IP
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
  ]);
  
  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const ip = req.ip;
    
    return this.isWhitelisted(ip);
  }
  
  private isWhitelisted(ip: string): boolean {
    if (this.whitelist.has(ip)) return true;
    
    // 检查内网段
    return ip.startsWith('10.') || 
           ip.startsWith('172.16.') || 
           ip.startsWith('192.168.');
  }
}
```

### 9.2 管理员豁免

```typescript
// src/common/guards/admin-throttler.guard.ts

import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class AdminThrottlerGuard extends ThrottlerGuard {
  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.user?.role === 'admin';
  }
}
```

### 9.3 滑动窗口算法

```typescript
// src/common/algorithms/sliding-window.ts

export class SlidingWindow {
  private requests: number[] = [];
  
  constructor(
    private readonly windowMs: number,
    private readonly maxRequests: number,
  ) {}
  
  isAllowed(): { allowed: boolean; remaining: number; retryAfter: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // 移除过期请求
    this.requests = this.requests.filter(time => time > windowStart);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return {
        allowed: true,
        remaining: this.maxRequests - this.requests.length - 1,
        retryAfter: 0,
      };
    }
    
    const oldestRequest = this.requests[0];
    const retryAfter = Math.ceil((oldestRequest + this.windowMs - now) / 1000);
    
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }
}
```

---

## 十、前端限流提示

### 10.1 错误处理

```typescript
// frontend/src/utils/api.ts

import { toast } from 'react-hot-toast';

export async function apiRequest(url: string, options?: RequestInit) {
  const response = await fetch(url, options);
  
  if (response.status === 429) {
    const data = await response.json();
    const retryAfter = data.error?.details?.retryAfter || 60;
    
    toast.error(`请求过于频繁，请等待 ${retryAfter} 秒后再试`, {
      duration: retryAfter * 1000,
      icon: '⏱️',
    });
    
    // 可选：自动重试
    if (options?.retry !== false) {
      await sleep(retryAfter * 1000);
      return apiRequest(url, { ...options, retry: false });
    }
    
    throw new Error('RATE_LIMIT_EXCEEDED');
  }
  
  return response;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### 10.2 请求队列

```typescript
// frontend/src/utils/request-queue.ts

export class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private readonly delay: number;
  
  constructor(delayMs: number = 1000) {
    this.delay = delayMs;
  }
  
  async add<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await request();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.process();
    });
  }
  
  private async process() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const request = this.queue.shift();
      if (request) {
        await request();
        await sleep(this.delay);
      }
    }
    
    this.processing = false;
  }
}

// 使用示例
const queue = new RequestQueue(1000); // 1秒间隔

async function sendMessage(content: string) {
  return queue.add(() => 
    apiRequest('/api/chat/messages', {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
  );
}
```

---

## 十一、配置汇总

### 11.1 环境变量

```env
# Rate Limit
RATE_LIMIT_TTL=60000
RATE_LIMIT_LIMIT=100
RATE_LIMIT_AI_TTL=60000
RATE_LIMIT_AI_LIMIT=20

# Redis (可选)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Whitelist
RATE_LIMIT_WHITELIST=127.0.0.1,::1
```

### 11.2 配置文件

```typescript
// src/config/rate-limit.config.ts

export default () => ({
  rateLimit: {
    default: {
      ttl: parseInt(process.env.RATE_LIMIT_TTL, 10) || 60000,
      limit: parseInt(process.env.RATE_LIMIT_LIMIT, 10) || 100,
    },
    ai: {
      ttl: parseInt(process.env.RATE_LIMIT_AI_TTL, 10) || 60000,
      limit: parseInt(process.env.RATE_LIMIT_AI_LIMIT, 10) || 20,
    },
    whitelist: (process.env.RATE_LIMIT_WHITELIST || '127.0.0.1').split(','),
  },
});
```

---

## 十二、测试

### 12.1 单元测试

```typescript
// src/common/guards/user-throttler.guard.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { UserThrottlerGuard } from './user-throttler.guard';

describe('UserThrottlerGuard', () => {
  let guard: UserThrottlerGuard;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserThrottlerGuard],
    }).compile();
    
    guard = module.get<UserThrottlerGuard>(UserThrottlerGuard);
  });
  
  it('should use user ID for authenticated users', async () => {
    const req = {
      user: { userId: 'user-123' },
      ip: '127.0.0.1',
    };
    
    const tracker = await guard.getTracker(req);
    expect(tracker).toBe('user_user-123');
  });
  
  it('should use IP for unauthenticated users', async () => {
    const req = {
      user: null,
      ip: '192.168.1.1',
    };
    
    const tracker = await guard.getTracker(req);
    expect(tracker).toBe('ip_192.168.1.1');
  });
});
```

### 12.2 E2E 测试

```typescript
// test/chat.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Rate Limiting (e2e)', () => {
  let app: INestApplication;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  it('should return 429 after exceeding limit', async () => {
    const token = 'valid-jwt-token';
    
    // 连续发送 25 次请求（超过 20 次限制）
    const requests = Array(25)
      .fill(null)
      .map(() =>
        request(app.getHttpServer())
          .post('/api/chat/conversations/conv-1/messages')
          .set('Authorization', `Bearer ${token}`)
          .send({ content: 'test' }),
      );
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status === 429);
    
    expect(rateLimited.length).toBeGreaterThan(0);
    expect(rateLimited[0].body.error.code).toBe('RATE_LIMIT_EXCEEDED');
  });
});
```

---

## 十三、监控仪表板

### 13.1 Grafana 仪表板

```json
{
  "dashboard": {
    "title": "PolyTalk Rate Limiting",
    "panels": [
      {
        "title": "Rate Limit Exceeded (per minute)",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(rate_limit_exceeded_total[1m])",
            "legendFormat": "{{endpoint}} - {{tier}}"
          }
        ]
      },
      {
        "title": "Top Abusers",
        "type": "table",
        "targets": [
          {
            "expr": "topk(10, rate_limit_exceeded_total)",
            "legendFormat": "{{user_id}}"
          }
        ]
      }
    ]
  }
}
```

---

**状态**：✅ API 限流策略完成

**包含**：
- ✅ 全局/接口/用户三级限流
- ✅ NestJS Throttler 集成
- ✅ Redis 分布式限流
- ✅ 用户等级配额
- ✅ 限流监控与告警
- ✅ 前端错误处理

—— 兵部 张居正

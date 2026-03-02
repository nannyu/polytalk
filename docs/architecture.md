# PolyTalk 架构设计文档

> **版本**: v2.0  
> **日期**: 2026-03-03  
> **作者**: 工部严世蕃  
> **状态**: 根据 2026-03-03 圣裁更新

---

## 1. 项目概述

### 1.1 项目定位

PolyTalk 是一个**多语言启蒙与学习的智能代理**平台，面向全年龄段用户，提供：
- 多语言对话练习（初期支持英语/西班牙语）
- 语音识别与发音纠正
- AI 语伴实时交互
- 双模式学习（启蒙/学习，年龄自动匹配）
- 自适应学习路径

### 1.2 核心原则

| 原则   | 说明                           |
|--------|--------------------------------|
| 轻量   | 单机部署，最小依赖             |
| 低成本 | 全栈免费/开源方案，零 API 成本 |
| 快速   | 2 周 MVP，快速迭代             |
| 扩展性 | 预留多语言/多云/多 AI 厂商扩展  |

### 1.3 目标用户

- **儿童启蒙**（3-12岁）：游戏化学习，家长监督
- **成人自学**（13+岁）：职场提升，兴趣学习
- **教育机构**（二期）：B2B 接入

**年龄自动匹配**：系统根据用户年龄自动切换启蒙/学习模式

### 1.4 语言支持

**初期上线**：
- 🇺🇸 英语（English）
- 🇪🇸 西班牙语（Español）

**架构预留扩展**：
- 🇯🇵 日语（日本語）
- 🇰🇷 韩语（한국어）
- 🇫🇷 法语（Français）
- 🇩🇪 德语（Deutsch）
- 其他 99+ 语言（Whisper 支持）

---

## 2. 技术栈

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    用户界面层                            │
│                   Next.js (React)                       │
│              /app, /components, /lib                    │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP/WebSocket
┌─────────────────────▼───────────────────────────────────┐
│                    API 网关层                            │
│              NestJS (Node.js)                           │
│          /api/v1/{chat,voice,users,courses}            │
└──┬──────────────┬──────────────┬───────────────────┬───┘
   │              │              │                   │
   ▼              ▼              ▼                   ▼
┌──────┐   ┌──────────┐   ┌──────────┐        ┌─────────┐
│SQLite│   │多AI厂商   │   │ Whisper  │        │Edge TTS │
│/PG   │   │GLM/GPT   │   │ 本地STT  │        │  TTS    │
└──────┘   └──────────┘   └──────────┘        └─────────┘
```

### 2.2 技术选型明细（圣裁 v2.0）

| 层级     | 组件          | 技术选型              | 版本   | 说明                | 变更 |
|----------|---------------|-----------------------|--------|---------------------|------|
| **前端** | 框架          | Next.js               | 14.x   | React SSR 框架      | - |
|          | UI 库         | Tailwind CSS          | 3.x    | 原子化 CSS          | - |
|          | 状态管理      | Zustand               | 4.x    | 轻量状态管理        | - |
|          | 语音录制      | MediaRecorder API     | 原生   | 浏览器原生          | - |
| **后端** | **框架**      | **NestJS**            | **10.x**| **Node.js 企业级**  | **⚠️ 新** |
|          | 语言          | TypeScript            | 5.x    | 类型安全            | **⚠️ 新** |
|          | ORM           | Prisma                | 5.x    | 现代 ORM            | **⚠️ 新** |
|          | 数据库        | SQLite / PostgreSQL   | -      | 开发/生产分离       | - |
|          | 数据验证      | class-validator       | 0.14+  | 装饰器验证          | **⚠️ 新** |
| **AI**   | **多厂商**    | **GLM / GPT / Claude**| -      | **国内外主流**      | **⚠️ 新** |
|          | 国内首选      | GLM-4-Flash           | API    | 智谱免费额度        | - |
|          | 国际备选      | GPT-4 / Claude        | API    | 付费方案            | **⚠️ 新** |
|          | STT           | Whisper               | base   | faster-whisper      | - |
|          | TTS           | Edge TTS              | 0.10+  | 微软免费 TTS        | - |
| **部署** | 云厂商        | **Oracle + 阿里云**   | -      | **双云部署**        | **⚠️ 新** |
|          | 容器化        | Docker                | 24.x   | 单容器或 compose    | - |
|          | 反向代理      | Nginx                 | 1.24+  | 生产环境            | - |

### 2.3 技术栈变更说明

| 组件 | 原方案 | 新方案（圣裁） | 变更原因 |
|------|--------|----------------|----------|
| 后端框架 | FastAPI (Python) | **NestJS (Node.js)** | 前后端统一 TypeScript，共享类型定义 |
| ORM | SQLAlchemy | **Prisma** | 现代 ORM，类型安全，迁移友好 |
| AI 服务 | GLM-4-Flash 单一 | **多厂商 API** | 国内外主流，提升可用性 |
| 云厂商 | 阿里云 | **Oracle + 阿里云** | Oracle Always Free 降低成本 |

### 2.4 NestJS 选型理由

| 特性 | NestJS | Express | Fastify |
|------|--------|---------|---------|
| **TypeScript 原生** | ✅ 首等支持 | ⚠️ 需配置 | ✅ 支持 |
| **企业级架构** | ✅ 模块化/DI | ❌ 自由度高 | ⚠️ 需自行设计 |
| **与 Next.js 共享类型** | ✅ 完美 | ⚠️ 需手动 | ⚠️ 需手动 |
| **学习曲线** | ⚠️ 较陡 | ✅ 平缓 | ✅ 平缓 |
| **生态成熟度** | ✅ 企业首选 | ✅ 最成熟 | ⚠️ 较新 |
| **性能** | ✅ 优秀 | ⚠️ 一般 | ✅ 最佳 |

**结论**：NestJS 是本项目最佳选择（与 Next.js 形成全栈 TypeScript 体系）

### 2.5 运行环境

- **开发环境**: Mac mini M4 16G
- **生产环境（Oracle Always Free）**:
  - 4个 ARM Ampere A1 核心
  - 24GB 内存
  - 200GB 存储
- **并发支持**: 50-100 用户（MVP 阶段）

---

## 3. 系统架构

### 3.1 目录结构（v2.0）

```
polytalk/
├── frontend/                # Next.js 前端
│   ├── app/                 # App Router 路由
│   │   ├── page.tsx         # 首页
│   │   ├── chat/            # 对话页面
│   │   ├── learn/           # 学习页面
│   │   └── profile/         # 用户中心
│   ├── components/          # 可复用组件
│   │   ├── ui/              # 基础 UI 组件
│   │   ├── chat/            # 对话相关组件
│   │   └── voice/           # 语音相关组件
│   ├── lib/                 # 工具库
│   │   ├── api.ts           # API 调用封装
│   │   ├── stores/          # Zustand stores
│   │   └── hooks/           # 自定义 hooks
│   └── public/              # 静态资源
│
├── backend/                 # NestJS 后端
│   ├── src/
│   │   ├── main.ts          # NestJS 入口
│   │   ├── app.module.ts    # 根模块
│   │   ├── modules/         # 功能模块
│   │   │   ├── chat/        # 对话模块
│   │   │   ├── voice/       # 语音模块
│   │   │   ├── users/       # 用户模块
│   │   │   └── courses/     # 课程模块
│   │   ├── common/          # 公共模块
│   │   │   ├── decorators/  # 自定义装饰器
│   │   │   ├── filters/     # 异常过滤器
│   │   │   ├── guards/      # 守卫（认证/授权）
│   │   │   └── interceptors/# 拦截器
│   │   ├── config/          # 配置管理
│   │   │   ├── database.config.ts
│   │   │   ├── ai.config.ts
│   │   │   └── app.config.ts
│   │   └── prisma/          # Prisma ORM
│   │       ├── schema.prisma
│   │       └── migrations/
│   ├── test/                # 测试
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── package.json
│
├── shared/                  # 前后端共享代码
│   ├── types/               # TypeScript 类型定义
│   │   ├── chat.types.ts
│   │   ├── user.types.ts
│   │   └── api.types.ts
│   └── constants/           # 常量定义
│
├── ai-services/             # AI 服务封装
│   ├── providers/           # 多厂商 API
│   │   ├── glm.provider.ts  # 智谱 GLM
│   │   ├── openai.provider.ts # OpenAI
│   │   └── claude.provider.ts # Anthropic Claude
│   ├── stt/                 # 语音识别
│   │   └── whisper.service.ts
│   ├── tts/                 # 语音合成
│   │   └── edge-tts.service.ts
│   └── router/              # AI 路由器（智能选择）
│       └── ai-router.ts
│
├── data/                    # 数据存储
│   ├── polytalk.db          # SQLite 数据库文件
│   └── models/              # 本地模型缓存
│
├── docs/                    # 文档
│   ├── architecture.md      # 本文档
│   ├── database_schema.md   # 数据库设计
│   ├── api_spec.md          # API 规范
│   └── deployment.md        # 部署指南
│
├── scripts/                 # 工具脚本
│   ├── init_db.ts           # 初始化数据库
│   ├── seed_data.ts         # 种子数据
│   └── security_check.py    # 安全检查
│
├── docker/                  # Docker 配置
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── .env.example             # 环境变量模板
├── .gitignore
├── README.md
└── LICENSE
```

### 3.2 核心模块

#### 3.2.1 前端模块

| 模块        | 职责                              | 关键文件                  |
|-------------|-----------------------------------|---------------------------|
| **Chat**    | 实时对话、消息展示、流式响应      | `app/chat/page.tsx`       |
| **Voice**   | 语音录制、播放、波形可视化        | `components/voice/`       |
| **Learn**   | 课程列表、学习进度、练习题        | `app/learn/`              |
| **Profile** | 用户信息、学习统计、设置          | `app/profile/`            |
| **Mode**    | 启蒙/学习模式切换、年龄识别       | `lib/mode-detector.ts`    |

#### 3.2.2 后端模块（NestJS）

| 模块        | 职责                              | API 路由                  |
|-------------|-----------------------------------|---------------------------|
| **Chat**    | 对话管理、上下文、流式响应        | `/api/v1/chat/*`          |
| **Voice**   | STT/TTS 转换、语音存储            | `/api/v1/voice/*`         |
| **Users**   | 用户注册、登录、进度同步          | `/api/v1/users/*`         |
| **Courses** | 课程管理、内容获取、进度更新      | `/api/v1/courses/*`       |
| **AI**      | 多厂商 AI 路由、负载均衡          | `/api/v1/ai/*`            |

#### 3.2.3 AI 服务模块

| 服务    | 技术方案        | 接口设计              |
|---------|-----------------|-----------------------|
| **GLM** | GLM-4-Flash API | `generate(prompt, context)` |
| **GPT** | OpenAI API      | `generate(prompt, context)` |
| **Claude** | Anthropic API | `generate(prompt, context)` |
| **STT** | faster-whisper  | `transcribe(audio_path)`    |
| **TTS** | edge-tts        | `synthesize(text, voice)`   |
| **Router** | 智能路由      | `route(prompt, priority)`   |

---

## 4. 多 AI 厂商架构

### 4.1 AI 路由策略

```typescript
// ai-services/router/ai-router.ts
enum AIProvider {
  GLM = 'glm',      // 国内首选（免费）
  GPT = 'openai',   // 国际备选（付费）
  CLAUDE = 'claude' // 国际备选（付费）
}

class AIRouter {
  // 智能选择 AI 提供商
  selectProvider(priority: 'speed' | 'quality' | 'cost'): AIProvider {
    if (this.isChinaUser() && this.hasGLMQuota()) {
      return AIProvider.GLM; // 国内用户优先 GLM
    }
    
    switch (priority) {
      case 'speed': return AIProvider.GLM;
      case 'quality': return AIProvider.GPT;
      case 'cost': return AIProvider.GLM;
    }
  }
  
  // 故障转移
  async generateWithFallback(prompt: string): Promise<string> {
    try {
      return await this.glm.generate(prompt);
    } catch (e) {
      return await this.gpt.generate(prompt); // 降级到 GPT
    }
  }
}
```

### 4.2 厂商配置

| 厂商 | API 端点 | 成本 | 额度 | 适用场景 |
|------|---------|------|------|---------|
| **GLM-4-Flash** | `open.bigmodel.cn` | 免费 | 100万 tokens/月 | 国内首选 |
| **GPT-4** | `api.openai.com` | 付费 | - | 高质量需求 |
| **Claude** | `api.anthropic.com` | 付费 | - | 长文本处理 |

---

## 5. 双云部署架构

### 5.1 Oracle Cloud（主）

**Always Free 资源**：
- 4个 ARM Ampere A1 核心
- 24GB 内存
- 200GB 块存储
- 10TB/月 出站流量

**部署方案**：
```
Oracle Cloud (ARM)
├── NestJS Backend (2 cores, 4GB)
├── Next.js Frontend (1 core, 2GB)
├── PostgreSQL (1 core, 4GB)
└── Whisper (CPU inference)
```

### 5.2 阿里云（备）

**资源**：
- 1台 ECS（2核 4GB）
- 1个 SLB（负载均衡）
- OSS 对象存储

**部署方案**：
- 静态资源（OSS + CDN）
- 数据库备份（RDS）
- 灾备切换（DNS 轮询）

### 5.3 部署拓扑

```
                    ┌─────────────┐
                    │   用户请求   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  DNS 轮询   │
                    └──────┬──────┘
                    ┌──────┴──────┐
                    │             │
           ┌────────▼──┐    ┌────▼────────┐
           │ Oracle 云 │    │  阿里云      │
           │  (主)     │    │  (备)        │
           └───────────┘    └─────────────┘
```

---

## 6. 双模式学习设计

### 6.1 模式识别

```typescript
// frontend/lib/mode-detector.ts
enum LearningMode {
  ENLIGHTENMENT = 'enlightenment', // 启蒙模式（3-12岁）
  LEARNING = 'learning'           // 学习模式（13+岁）
}

function detectMode(age: number): LearningMode {
  if (age >= 3 && age <= 12) {
    return LearningMode.ENLIGHTENMENT;
  }
  return LearningMode.LEARNING;
}
```

### 6.2 模式差异

| 特性 | 启蒙模式 | 学习模式 |
|------|---------|---------|
| 界面风格 | 卡通化、大按钮 | 简洁、专业 |
| 对话语调 | 亲切、鼓励 | 直接、高效 |
| 课程内容 | 游戏化、渐进式 | 系统化、评测导向 |
| 难度调整 | 自动降级 | 自适应 |
| 家长监控 | ✅ 启用 | ❌ 禁用 |

---

## 7. 安全设计

### 7.1 认证授权

| 方案         | 说明                           |
|--------------|--------------------------------|
| **JWT**      | 无状态认证，适合单机部署       |
| **Passport** | NestJS 集成，多策略支持        |
| **API Key**  | 第三方服务调用（GLM/GPT）      |
| **环境变量** | 敏感信息不提交代码仓库         |

### 7.2 数据安全

- **API Key 加密存储**: 环境变量 + .env 文件
- **用户数据隔离**: 按 user_id 分表查询
- **数据库 SSL**: 生产环境强制启用
- **CORS 配置**: 仅允许指定域名

### 7.3 合规性

- 儿童隐私保护（COPPA 参考）
- 数据最小化原则
- 用户可导出/删除数据

---

## 8. 性能设计

### 8.1 性能目标

| 指标           | 目标值         | 测量方式          |
|----------------|----------------|-------------------|
| 首屏加载       | < 2s           | Lighthouse        |
| 语音识别延迟   | < 1s           | 端到端测量        |
| 对话响应延迟   | < 3s（首字）   | SSE 首字节时间    |
| 并发用户       | 50-100         | 压力测试          |

### 8.2 优化策略

- **前端**: Next.js SSR + 代码分割 + 图片优化
- **后端**: NestJS 异步 I/O + Redis 缓存 + 连接池
- **AI**: 流式响应 + 上下文压缩 + 批量请求

---

## 9. 扩展性设计

### 9.1 多语言扩展

- 新增语言仅需配置课程内容
- Whisper 原生支持 99 种语言
- Edge TTS 支持 40+ 语言

### 9.2 服务拆分路径

单体 → 微服务（三期）：
- AI 服务独立部署
- 语音服务独立部署
- 消息队列解耦

---

## 10. 部署架构

### 10.1 开发环境

```bash
# 后端
cd backend && npm run start:dev

# 前端
cd frontend && npm run dev
```

### 10.2 生产环境（Docker）

```yaml
# docker/docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ../frontend
    ports:
      - "3000:3000"
  
  backend:
    build: ../backend
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://...
      - GLM_API_KEY=${GLM_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
```

---

## 11. 风险与应对

| 风险                  | 影响 | 应对策略                          |
|-----------------------|------|-----------------------------------|
| GLM-4 API 限流        | 高   | 多厂商故障转移 + 本地缓存         |
| Oracle 云资源限制     | 中   | 监控 + 自动扩容到阿里云           |
| Whisper CPU 性能不足  | 中   | 使用 smaller 模型 + GPU 加速（阿里云）|
| NestJS 学习曲线       | 低   | 文档 + 代码模板                   |

---

## 12. 里程碑

| 阶段   | 时间       | 交付物                           |
|--------|------------|----------------------------------|
| **M1** | 2026-03-03 | 架构文档 v2.0（Node.js）         |
| **M2** | 2026-03-07 | 核心对话功能 + 语音 STT/TTS      |
| **M3** | 2026-03-10 | 用户系统 + 双模式学习            |
| **M4** | 2026-03-14 | Oracle 云部署 + 文档完善         |

---

## 附录

### A. NestJS 核心依赖

```json
{
  "@nestjs/core": "^10.0.0",
  "@nestjs/common": "^10.0.0",
  "@nestjs/platform-express": "^10.0.0",
  "@nestjs/config": "^3.0.0",
  "@nestjs/passport": "^10.0.0",
  "@nestjs/websockets": "^10.0.0",
  "@prisma/client": "^5.0.0",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

### B. 环境变量

见 `.env.example`

### C. 变更历史

| 版本 | 日期       | 变更内容         | 作者   |
|------|------------|------------------|--------|
| v1.0 | 2026-03-03 | 初稿（FastAPI）  | 工部严世蕃 |
| v2.0 | 2026-03-03 | 圣裁更新（Node.js + 多AI + 双云） | 工部严世蕃 |

---

**工部严世蕃 呈**
2026-03-03 06:30

# PolyTalk 架构设计文档

> **版本**: v1.0  
> **日期**: 2026-03-03  
> **作者**: 工部严世蕃  
> **状态**: 初稿待评审

---

## 1. 项目概述

### 1.1 项目定位

PolyTalk 是一个**多语言启蒙与学习的智能代理**平台，面向儿童及成人用户，提供：
- 多语言对话练习
- 语音识别与发音纠正
- AI 语伴实时交互
- 自适应学习路径

### 1.2 核心原则

| 原则   | 说明                           |
|--------|--------------------------------|
| 轻量   | 单机部署，最小依赖             |
| 低成本 | 全栈免费/开源方案，零 API 成本 |
| 快速   | 2 周 MVP，快速迭代             |

### 1.3 目标用户

- **儿童启蒙**（3-12岁）：游戏化学习，家长监督
- **成人自学**：职场提升，兴趣学习
- **教育机构**（二期）：B2B 接入

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
│              FastAPI (Python)                           │
│          /api/v1/{chat,voice,users,courses}            │
└──┬──────────────┬──────────────┬───────────────────┬───┘
   │              │              │                   │
   ▼              ▼              ▼                   ▼
┌──────┐   ┌──────────┐   ┌──────────┐        ┌─────────┐
│SQLite│   │ GLM-4    │   │ Whisper  │        │Edge TTS │
│ 数据库│   │ Flash API│   │ 本地STT  │        │  TTS    │
└──────┘   └──────────┘   └──────────┘        └─────────┘
```

### 2.2 技术选型明细

| 层级     | 组件          | 技术选型              | 版本   | 说明                |
|----------|---------------|-----------------------|--------|---------------------|
| **前端** | 框架          | Next.js               | 14.x   | React SSR 框架      |
|          | UI 库         | Tailwind CSS          | 3.x    | 原子化 CSS          |
|          | 状态管理      | Zustand               | 4.x    | 轻量状态管理        |
|          | 语音录制      | MediaRecorder API     | 原生   | 浏览器原生          |
| **后端** | 框架          | FastAPI               | 0.109+ | Python 异步框架     |
|          | ORM           | SQLAlchemy            | 2.x    | 异步支持            |
|          | 数据库        | SQLite                | 3.x    | 轻量级，文件存储    |
|          | 数据验证      | Pydantic              | 2.x    | 类型安全            |
| **AI**   | NLP 对话      | GLM-4-Flash           | API    | 智谱免费额度        |
|          | STT           | Whisper               | base   | faster-whisper      |
|          | TTS           | Edge TTS              | 0.10+  | 微软免费 TTS        |
| **部署** | 容器化        | Docker                | 24.x   | 单容器或 docker-compose |
|          | 反向代理      | Nginx（可选）         | 1.24+  | 生产环境            |

### 2.3 运行环境

- **开发环境**: Mac mini M4 16G
- **生产环境**: 单机部署（Docker）
- **并发支持**: 10-50 用户（MVP 阶段）

---

## 3. 系统架构

### 3.1 目录结构

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
├── backend/                 # FastAPI 后端
│   ├── app/
│   │   ├── main.py          # FastAPI 入口
│   │   ├── api/             # API 路由
│   │   │   ├── v1/
│   │   │   │   ├── chat.py
│   │   │   │   ├── voice.py
│   │   │   │   ├── users.py
│   │   │   │   └── courses.py
│   │   ├── models/          # 数据模型
│   │   │   ├── user.py
│   │   │   ├── conversation.py
│   │   │   └── course.py
│   │   ├── services/        # 业务逻辑
│   │   │   ├── nlp.py       # GLM-4 接口
│   │   │   ├── stt.py       # Whisper STT
│   │   │   └── tts.py       # Edge TTS
│   │   └── core/
│   │       ├── config.py    # 配置管理
│   │       ├── database.py  # 数据库连接
│   │       └── security.py  # 认证授权
│   ├── alembic/             # 数据库迁移
│   └── tests/               # 后端测试
│
├── services/                # 独立服务（可选）
│   ├── nlp/                 # NLP 服务封装
│   └── voice/               # 语音服务封装
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
│   ├── init_db.py           # 初始化数据库
│   └── seed_data.py         # 种子数据
│
├── docker/                  # Docker 配置
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
│
├── config/                  # 全局配置
│   └── settings.yaml
│
├── tests/                   # 集成测试
│   ├── frontend/
│   └── backend/
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

#### 3.2.2 后端模块

| 模块        | 职责                              | API 路由                  |
|-------------|-----------------------------------|---------------------------|
| **Chat**    | 对话管理、上下文、流式响应        | `/api/v1/chat/*`          |
| **Voice**   | STT/TTS 转换、语音存储            | `/api/v1/voice/*`         |
| **Users**   | 用户注册、登录、进度同步          | `/api/v1/users/*`         |
| **Courses** | 课程管理、内容获取、进度更新      | `/api/v1/courses/*`       |

#### 3.2.3 服务模块

| 服务    | 技术方案        | 接口设计              |
|---------|-----------------|-----------------------|
| **NLP** | GLM-4-Flash API | `generate(prompt, context)` |
| **STT** | faster-whisper  | `transcribe(audio_path)`    |
| **TTS** | edge-tts        | `synthesize(text, voice)`   |

---

## 4. 数据流设计

### 4.1 对话流程

```
用户语音输入
    ↓
[前端] MediaRecorder 采集音频
    ↓
[后端] /api/v1/voice/stt
    ↓
[服务] Whisper STT 转文字
    ↓
[后端] /api/v1/chat/message
    ↓
[服务] GLM-4-Flash 生成回复
    ↓
[后端] /api/v1/voice/tts
    ↓
[服务] Edge TTS 合成语音
    ↓
[前端] 播放音频 + 显示文字
```

### 4.2 流式响应

为降低延迟，对话采用 **SSE (Server-Sent Events)** 流式传输：

```python
# backend/app/api/v1/chat.py
from fastapi.responses import StreamingResponse

@router.post("/stream")
async def chat_stream(request: ChatRequest):
    async def generate():
        async for chunk in nlp_service.stream_generate(request.message):
            yield f"data: {chunk}\n\n"
    
    return StreamingResponse(generate(), media_type="text/event-stream")
```

### 4.3 上下文管理

- **短期上下文**: 当前会话最近 10 轮对话（内存缓存）
- **长期上下文**: 用户学习历史、偏好（数据库存储）
- **多模态上下文**: 语音 + 文字混合输入

---

## 5. 安全设计

### 5.1 认证授权

| 方案         | 说明                           |
|--------------|--------------------------------|
| **JWT**      | 无状态认证，适合单机部署       |
| **API Key**  | 第三方服务调用（GLM-4）        |
| **环境变量** | 敏感信息不提交代码仓库         |

### 5.2 数据安全

- **API Key 加密存储**: 环境变量 + .env 文件
- **用户数据隔离**: 按 user_id 分表查询
- **SQLite 文件权限**: 仅应用进程可读写

### 5.3 合规性

- 儿童隐私保护（COPPA 参考）
- 数据最小化原则
- 用户可导出/删除数据

---

## 6. 性能设计

### 6.1 性能目标

| 指标           | 目标值         | 测量方式          |
|----------------|----------------|-------------------|
| 首屏加载       | < 2s           | Lighthouse        |
| 语音识别延迟   | < 1s           | 端到端测量        |
| 对话响应延迟   | < 3s（首字）   | SSE 首字节时间    |
| 并发用户       | 10-50          | 压力测试          |

### 6.2 优化策略

- **前端**: Next.js SSR + 代码分割 + 图片优化
- **后端**: 异步 I/O + 连接池 + 响应缓存
- **AI**: 流式响应 + 上下文压缩 + 批量请求

---

## 7. 扩展性设计

### 7.1 数据库迁移路径

SQLite → PostgreSQL（二期）：
- 预留 SQLAlchemy 抽象层
- 使用 Alembic 管理迁移
- 保持 SQL 兼容性

### 7.2 服务拆分路径

单体 → 微服务（三期）：
- NLP 服务独立部署
- 语音服务独立部署
- 消息队列解耦

### 7.3 多语言扩展

- 新增语言仅需配置 GLM-4 prompt 模板
- Whisper 原生支持 99 种语言
- Edge TTS 支持 40+ 语言

---

## 8. 部署架构

### 8.1 开发环境

```bash
# 后端
cd backend && uvicorn app.main:app --reload

# 前端
cd frontend && npm run dev
```

### 8.2 生产环境（Docker）

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
      - "8000:8000"
    volumes:
      - ../data:/app/data
    environment:
      - GLM_API_KEY=${GLM_API_KEY}
```

### 8.3 资源需求

| 组件      | CPU  | 内存  | 存储    |
|-----------|------|-------|---------|
| Frontend  | 0.5核| 512MB | 100MB   |
| Backend   | 1核  | 1GB   | 200MB   |
| Whisper   | 2核  | 4GB   | 1GB(模型)|
| **总计**  | 3.5核| 5.5GB | 1.3GB   |

---

## 9. 风险与应对

| 风险                  | 影响 | 应对策略                          |
|-----------------------|------|-----------------------------------|
| GLM-4 API 限流        | 高   | 本地缓存 + 降级回复               |
| Whisper CPU 性能不足  | 中   | 使用 smaller 模型 + 预热          |
| SQLite 并发瓶颈       | 低   | 连接池 + 写队列 + 早期迁移 PG     |
| Edge TTS 服务不可用   | 中   | 备选方案：Coqui TTS（本地）       |

---

## 10. 里程碑

| 阶段   | 时间       | 交付物                           |
|--------|------------|----------------------------------|
| **M1** | 2026-03-04 | 架构文档 + 项目结构              |
| **M2** | 2026-03-07 | 核心对话功能 + 语音 STT/TTS      |
| **M3** | 2026-03-10 | 用户系统 + 学习进度              |
| **M4** | 2026-03-14 | Docker 部署 + 文档完善           |

---

## 附录

### A. 参考文档
- [Next.js 官方文档](https://nextjs.org/docs)
- [FastAPI 官方文档](https://fastapi.tiangolo.com/)
- [GLM-4 API 文档](https://open.bigmodel.cn/dev/api)
- [faster-whisper GitHub](https://github.com/guillaumekln/faster-whisper)

### B. 变更历史
| 版本 | 日期       | 变更内容         | 作者   |
|------|------------|------------------|--------|
| v1.0 | 2026-03-03 | 初稿             | 工部严世蕃 |

---

**工部严世蕃 呈**
2026-03-03 00:30

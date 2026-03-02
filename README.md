# PolyTalk

> 多语言启蒙与学习的智能代理

## 项目简介

PolyTalk 是一个轻量级、低成本的多语言学习平台，通过 AI 语伴实时对话，帮助用户掌握英语、西班牙语等多种语言。

### 核心特性

- 🎤 **语音对话** - 真实语音交互，AI 实时纠正发音
- 🤖 **多 AI 厂商** - GLM-4/GPT-4/Claude 智能路由
- 💰 **零成本** - Oracle Always Free + 开源方案
- 📚 **双模式学习** - 启蒙模式（3-12岁）/ 学习模式（13+岁）
- 🌍 **多语言** - 初期支持英语/西班牙语，架构预留扩展
- ☁️ **双云部署** - Oracle（主）+ 阿里云（备）

## 技术栈

| 层级     | 技术                |
|----------|---------------------|
| 前端     | Next.js 14 + React  |
| 后端     | **NestJS (Node.js)** |
| 数据库   | SQLite / PostgreSQL |
| AI       | GLM-4/GPT-4/Claude  |
| STT      | faster-whisper      |
| TTS      | Edge TTS            |
| 云厂商   | Oracle + 阿里云     |

## 快速开始

### 环境要求

- Node.js 20+
- Python 3.11+（语音服务）
- Docker（可选）

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/nannyu/polytalk.git
cd polytalk

# 后端
cd backend
npm install
cp ../.env.example ../.env  # 配置环境变量
npm run start:dev

# 前端（新终端）
cd frontend
npm install
npm run dev
```

### Docker 部署

```bash
cd docker
cp ../.env.example .env  # 配置环境变量
docker-compose up -d
```

## 项目结构

```
polytalk/
├── frontend/          # Next.js 前端
│   ├── app/           # App Router 路由
│   ├── components/    # 可复用组件
│   └── lib/           # 工具库
├── backend/           # NestJS 后端
│   ├── src/
│   │   ├── modules/   # 功能模块
│   │   ├── common/    # 公共模块
│   │   └── config/    # 配置管理
│   └── prisma/        # Prisma ORM
├── ai-services/       # AI 服务封装
│   ├── providers/     # 多厂商 API
│   ├── stt/           # 语音识别
│   └── tts/           # 语音合成
├── shared/            # 前后端共享代码
│   └── types/         # TypeScript 类型
├── docs/              # 文档
└── docker/            # Docker 配置
```

## 文档

- [架构设计文档](docs/architecture.md)
- [数据库设计文档](docs/database_schema.md)
- [API 规范文档](docs/api_spec.md)

## 开发路线

- [x] 架构设计 v1.0（FastAPI）
- [x] 安全漏洞修复
- [x] 架构设计 v2.0（NestJS + 多AI + 双云）
- [ ] 后端重构（FastAPI → NestJS）
- [ ] 核心对话功能
- [ ] 语音 STT/TTS
- [ ] 用户系统
- [ ] 双模式学习
- [ ] Oracle 云部署

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发团队**: 六部工坊  
**技术支持**: 工部严世蕃 🔧

# PolyTalk

> 多语言启蒙与学习的智能代理

## 项目简介

PolyTalk 是一个轻量级、低成本的多语言学习平台，通过 AI 语伴实时对话，帮助用户掌握英语、日语、韩语等多种语言。

### 核心特性

- 🎤 **语音对话** - 真实语音交互，AI 实时纠正发音
- 🤖 **智能 AI** - GLM-4-Flash 驱动，支持 99 种语言
- 💰 **零成本** - 全栈开源方案，无需付费订阅
- 📚 **课程体系** - 游戏化学习路径，适合各年龄段

## 技术栈

| 层级     | 技术                |
|----------|---------------------|
| 前端     | Next.js 14 + React  |
| 后端     | FastAPI + Python    |
| 数据库   | SQLite              |
| NLP      | GLM-4-Flash API     |
| STT      | faster-whisper      |
| TTS      | Edge TTS            |
| 部署     | Docker              |

## 快速开始

### 环境要求

- Node.js 20+
- Python 3.11+
- Docker（可选）

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/nannyu/polytalk.git
cd polytalk

# 后端
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env  # 配置环境变量
uvicorn app.main:app --reload

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
├── backend/           # FastAPI 后端
│   ├── app/
│   │   ├── api/       # API 路由
│   │   ├── models/    # 数据模型
│   │   ├── services/  # 业务逻辑
│   │   └── core/      # 核心配置
│   └── tests/         # 测试
├── docs/              # 文档
│   ├── architecture.md
│   ├── database_schema.md
│   └── api_spec.md
├── docker/            # Docker 配置
└── data/              # 数据存储
```

## 文档

- [架构设计文档](docs/architecture.md)
- [数据库设计文档](docs/database_schema.md)
- [API 规范文档](docs/api_spec.md)

## 开发路线

- [x] 架构设计
- [x] 项目结构搭建
- [ ] 核心对话功能
- [ ] 语音 STT/TTS
- [ ] 用户系统
- [ ] 课程管理
- [ ] Docker 部署

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**开发团队**: 六部工坊  
**技术支持**: 工部严世蕃 🔧

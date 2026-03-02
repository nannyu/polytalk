# PolyTalk FastAPI 主入口
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db

# 创建应用
app = FastAPI(
    title=settings.APP_NAME,
    description="多语言启蒙与学习的智能代理平台",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境应限制
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 启动事件
@app.on_event("startup")
async def startup_event():
    """应用启动时初始化"""
    init_db()
    print(f"🚀 {settings.APP_NAME} 启动成功")
    print(f"📖 API 文档: http://localhost:8000/docs")

# 健康检查
@app.get("/health")
async def health_check():
    return {"status": "ok", "app": settings.APP_NAME}

# 根路径
@app.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": "1.0.0",
        "docs": "/docs"
    }

# 注册路由
# from app.api.v1 import chat, voice, users, courses
# app.include_router(chat.router, prefix="/api/v1/chat", tags=["Chat"])
# app.include_router(voice.router, prefix="/api/v1/voice", tags=["Voice"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["Users"])
# app.include_router(courses.router, prefix="/api/v1/courses", tags=["Courses"])

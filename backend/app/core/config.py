# FastAPI 后端核心配置
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # 应用配置
    APP_NAME: str = "PolyTalk"
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "change-me-in-production"
    
    # 数据库配置
    DATABASE_URL: str = "sqlite:///./data/polytalk.db"
    
    # GLM-4 API 配置
    GLM_API_KEY: str = ""
    GLM_API_BASE: str = "https://open.bigmodel.cn/api/paas/v4"
    
    # JWT 配置
    JWT_SECRET: str = "change-me-in-production"
    JWT_EXPIRE_HOURS: int = 168
    
    # 语音服务配置
    WHISPER_MODEL: str = "base"
    WHISPER_DEVICE: str = "cpu"
    EDGE_TTS_DEFAULT_VOICE: str = "en-US-AriaNeural"
    
    # 日志配置
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "./logs/polytalk.log"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()

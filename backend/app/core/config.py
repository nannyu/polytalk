# FastAPI 后端核心配置
from pydantic_settings import BaseSettings
from pydantic import Field, validator
from functools import lru_cache
import os
import warnings


class Settings(BaseSettings):
    # 应用配置
    APP_NAME: str = "PolyTalk"
    APP_ENV: str = Field(default="development", env="APP_ENV")
    DEBUG: bool = Field(default=True, env="DEBUG")
    
    # 安全配置 - 强制从环境变量读取，无默认值
    SECRET_KEY: str = Field(default="", env="SECRET_KEY")
    JWT_SECRET: str = Field(default="", env="JWT_SECRET")
    JWT_EXPIRE_HOURS: int = Field(default=168, env="JWT_EXPIRE_HOURS")
    
    # 数据库配置
    DATABASE_URL: str = Field(
        default="sqlite:///./data/polytalk.db",
        env="DATABASE_URL"
    )
    DATABASE_SSL: bool = Field(default=False, env="DATABASE_SSL")
    
    # GLM-4 API 配置
    GLM_API_KEY: str = Field(default="", env="GLM_API_KEY")
    GLM_API_BASE: str = Field(
        default="https://open.bigmodel.cn/api/paas/v4",
        env="GLM_API_BASE"
    )
    
    # 语音服务配置
    WHISPER_MODEL: str = Field(default="base", env="WHISPER_MODEL")
    WHISPER_DEVICE: str = Field(default="cpu", env="WHISPER_DEVICE")
    EDGE_TTS_DEFAULT_VOICE: str = Field(
        default="en-US-AriaNeural",
        env="EDGE_TTS_DEFAULT_VOICE"
    )
    
    # 日志配置
    LOG_LEVEL: str = Field(default="INFO", env="LOG_LEVEL")
    LOG_FILE: str = Field(default="./logs/polytalk.log", env="LOG_FILE")
    
    # 限流配置
    RATE_LIMIT_CHAT: str = Field(default="60/minute", env="RATE_LIMIT_CHAT")
    RATE_LIMIT_VOICE: str = Field(default="30/minute", env="RATE_LIMIT_VOICE")
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @validator("SECRET_KEY", pre=True, always=True)
    def validate_secret_key(cls, v, values):
        """验证 SECRET_KEY 安全性"""
        app_env = values.get("APP_ENV", "development")
        
        if app_env == "production":
            if not v or v == "change-me-in-production":
                raise ValueError(
                    "🔴 安全错误: 生产环境必须设置 SECRET_KEY 环境变量！"
                    "\n请在 .env 文件中设置: SECRET_KEY=<your-secure-key>"
                )
        elif not v or v == "change-me-in-production":
            warnings.warn(
                "⚠️ 警告: 使用默认 SECRET_KEY，仅限开发环境！"
                "\n生产环境请设置: SECRET_KEY=<your-secure-key>",
                UserWarning
            )
            # 开发环境使用随机 key
            import secrets
            return secrets.token_urlsafe(32)
        
        return v
    
    @validator("JWT_SECRET", pre=True, always=True)
    def validate_jwt_secret(cls, v, values):
        """验证 JWT_SECRET 安全性"""
        app_env = values.get("APP_ENV", "development")
        secret_key = values.get("SECRET_KEY", "")
        
        # 如果未设置 JWT_SECRET，使用 SECRET_KEY
        if not v or v == "change-me-in-production":
            if app_env == "production":
                raise ValueError(
                    "🔴 安全错误: 生产环境必须设置 JWT_SECRET 环境变量！"
                )
            warnings.warn(
                "⚠️ 警告: JWT_SECRET 未设置，将使用 SECRET_KEY",
                UserWarning
            )
            return secret_key
        
        return v


@lru_cache()
def get_settings() -> Settings:
    """获取配置单例"""
    return Settings()


# 导出配置实例
settings = get_settings()

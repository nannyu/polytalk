# PolyTalk API 封装设计文档
**兵部 张居正** | 2026-03-03
**交付时间**：2026-03-04 12:00

---

## 一、架构总览

```
┌─────────────────────────────────────────────────────┐
│                   FastAPI Router                     │
│  /chat  /stt  /tts  /health                          │
├─────────────────────────────────────────────────────┤
│                  Service Layer                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │NLPService│ │ STTService│ │ TTSService│             │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘             │
│       │            │            │                    │
├───────┼────────────┼────────────┼────────────────────┤
│       ▼            ▼            ▼                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │GLM-4-Flash│ │Whisper   │ │火山TTS   │             │
│  │(zhipuai) │ │(local)   │ │(API)     │             │
│  └──────────┘ └──────────┘ └──────────┘             │
├─────────────────────────────────────────────────────┤
│                    SQLite                            │
│  conversations | users | settings                    │
└─────────────────────────────────────────────────────┘
```

---

## 二、目录结构

```
polytalk/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI 入口
│   ├── config.py               # 配置管理
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── chat.py             # NLP 对话路由
│   │   ├── stt.py              # 语音识别路由
│   │   ├── tts.py              # 语音合成路由
│   │   └── health.py           # 健康检查
│   ├── services/
│   │   ├── __init__.py
│   │   ├── nlp_service.py      # GLM-4-Flash 封装
│   │   ├── stt_service.py      # Whisper 封装
│   │   └── tts_service.py      # 火山TTS 封装
│   ├── models/
│   │   ├── __init__.py
│   │   ├── conversation.py     # 对话模型
│   │   └── user.py             # 用户模型
│   └── utils/
│       ├── __init__.py
│       ├── audio.py            # 音频处理工具
│       └── cache.py            # 缓存工具
├── docs/
│   ├── architecture.md
│   ├── api_spec.md
│   └── database_schema.md
├── tests/
│   ├── test_nlp.py
│   ├── test_stt.py
│   └── test_tts.py
├── requirements.txt
├── .env.example
└── README.md
```

---

## 三、依赖清单

```txt
# requirements.txt

# Web Framework
fastapi>=0.109.0
uvicorn[standard]>=0.27.0
python-multipart>=0.0.6

# Database
sqlalchemy>=2.0
aiosqlite>=0.19

# NLP - GLM-4-Flash
zhipuai>=2.0

# STT - Whisper
faster-whisper>=1.0
torch>=2.0
torchaudio>=2.0

# TTS - 火山引擎
httpx>=0.27.0

# Audio Processing
pydub>=0.25
ffmpeg-python>=0.2

# Utils
pydantic>=2.0
pydantic-settings>=2.0
python-dotenv>=1.0
aiofiles>=23.0

# Testing
pytest>=8.0
pytest-asyncio>=0.23
httpx>=0.27.0
```

---

## 四、配置管理

### 4.1 环境变量

```env
# .env.example

# GLM-4-Flash
ZHIPUAI_API_KEY=your_api_key_here
GLM_MODEL=glm-4-flash

# 火山引擎 TTS
VOLCENGINE_APP_ID=your_app_id
VOLCENGINE_ACCESS_TOKEN=your_access_token
DEFAULT_VOICE=zh_female_shuangkuaisisi_moon_bigtts

# Whisper
WHISPER_MODEL=small
WHISPER_DEVICE=cpu
WHISPER_COMPUTE_TYPE=int8

# Database
DATABASE_URL=sqlite+aiosqlite:///./polytalk.db

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=true
```

### 4.2 配置类

```python
# app/config.py

from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # GLM-4-Flash
    zhipuai_api_key: str
    glm_model: str = "glm-4-flash"
    
    # 火山引擎 TTS
    volcengine_app_id: str
    volcengine_access_token: str
    default_voice: str = "zh_female_shuangkuaisisi_moon_bigtts"
    
    # Whisper
    whisper_model: str = "small"
    whisper_device: str = "cpu"
    whisper_compute_type: str = "int8"
    
    # Database
    database_url: str = "sqlite+aiosqlite:///./polytalk.db"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
```

---

## 五、NLP Service（GLM-4-Flash）

### 5.1 服务封装

```python
# app/services/nlp_service.py

from zhipuai import ZhipuAI
from typing import AsyncGenerator, List, Dict
from app.config import settings

class NLPService:
    def __init__(self):
        self.client = ZhipuAI(api_key=settings.zhipuai_api_key)
        self.model = settings.glm_model
    
    async def chat(
        self,
        message: str,
        history: List[Dict[str, str]] = None,
        system_prompt: str = None
    ) -> str:
        """
        同步对话
        
        Args:
            message: 用户消息
            history: 对话历史 [{"role": "user/assistant", "content": "..."}]
            system_prompt: 系统提示词
        
        Returns:
            助手回复
        """
        messages = []
        
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        
        if history:
            messages.extend(history)
        
        messages.append({"role": "user", "content": message})
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages
        )
        
        return response.choices[0].message.content
    
    async def chat_stream(
        self,
        message: str,
        history: List[Dict[str, str]] = None,
        system_prompt: str = None
    ) -> AsyncGenerator[str, None]:
        """
        流式对话（适合 TTS 实时合成）
        """
        messages = []
        
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        
        if history:
            messages.extend(history)
        
        messages.append({"role": "user", "content": message})
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            stream=True
        )
        
        for chunk in response:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

# 单例
nlp_service = NLPService()
```

### 5.2 API 路由

```python
# app/routers/chat.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Optional
from app.services.nlp_service import nlp_service

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = None
    system_prompt: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    success: bool

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    对话接口
    
    - **message**: 用户消息
    - **history**: 对话历史（可选）
    - **system_prompt**: 系统提示词（可选）
    """
    try:
        reply = await nlp_service.chat(
            message=request.message,
            history=request.history,
            system_prompt=request.system_prompt
        )
        return ChatResponse(reply=reply, success=True)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 六、STT Service（本地 Whisper）

### 6.1 服务封装

```python
# app/services/stt_service.py

from faster_whisper import WhisperModel
from typing import Optional
import tempfile
import os
from app.config import settings

class STTService:
    def __init__(self):
        self.model = WhisperModel(
            settings.whisper_model,
            device=settings.whisper_device,
            compute_type=settings.whisper_compute_type
        )
    
    async def transcribe(
        self,
        audio_data: bytes,
        language: str = "zh",
        task: str = "transcribe"
    ) -> dict:
        """
        语音识别
        
        Args:
            audio_data: 音频二进制数据（WAV/MP3/M4A）
            language: 语言代码（zh/en/auto）
            task: transcribe 或 translate
        
        Returns:
            {
                "text": "识别文本",
                "segments": [...],
                "language": "zh"
            }
        """
        # 写入临时文件
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as f:
            f.write(audio_data)
            temp_path = f.name
        
        try:
            segments, info = self.model.transcribe(
                temp_path,
                language=language if language != "auto" else None,
                task=task
            )
            
            text = " ".join([seg.text for seg in segments])
            
            return {
                "text": text.strip(),
                "language": info.language,
                "duration": info.duration,
                "segments": [
                    {
                        "start": seg.start,
                        "end": seg.end,
                        "text": seg.text
                    }
                    for seg in segments
                ]
            }
        finally:
            os.unlink(temp_path)

# 单例（延迟加载）
_stt_service = None

def get_stt_service():
    global _stt_service
    if _stt_service is None:
        _stt_service = STTService()
    return _stt_service
```

### 6.2 API 路由

```python
# app/routers/stt.py

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional
from app.services.stt_service import get_stt_service

router = APIRouter(prefix="/stt", tags=["STT"])

class TranscribeResponse(BaseModel):
    text: str
    language: str
    duration: float
    success: bool

@router.post("/transcribe", response_model=TranscribeResponse)
async def transcribe(
    audio: UploadFile = File(...),
    language: str = "zh"
):
    """
    语音识别
    
    - **audio**: 音频文件（WAV/MP3/M4A）
    - **language**: 语言代码（zh/en/auto）
    """
    try:
        audio_data = await audio.read()
        stt_service = get_stt_service()
        
        result = await stt_service.transcribe(
            audio_data=audio_data,
            language=language
        )
        
        return TranscribeResponse(
            text=result["text"],
            language=result["language"],
            duration=result["duration"],
            success=True
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 七、TTS Service（火山引擎）

### 7.1 服务封装

```python
# app/services/tts_service.py

import httpx
import uuid
from typing import Optional
from app.config import settings

class TTSService:
    def __init__(self):
        self.app_id = settings.volcengine_app_id
        self.access_token = settings.volcengine_access_token
        self.default_voice = settings.default_voice
        self.base_url = "https://openspeech.bytedance.com/api/v1/tts"
    
    async def synthesize(
        self,
        text: str,
        voice_type: Optional[str] = None,
        speed: float = 1.0,
        output_format: str = "mp3"
    ) -> bytes:
        """
        语音合成
        
        Args:
            text: 待合成文本（最长1024字节）
            voice_type: 音色ID（默认使用配置）
            speed: 语速（0.5-2.0）
            output_format: 输出格式（mp3/wav/pcm）
        
        Returns:
            音频二进制数据
        """
        voice = voice_type or self.default_voice
        
        # 长文本分段处理
        if len(text.encode('utf-8')) > 900:
            return await self._synthesize_long_text(text, voice, speed, output_format)
        
        payload = {
            "app": {
                "appid": self.app_id,
                "token": "access_token",
                "cluster": "volcano_tts"
            },
            "user": {"uid": "polytalk"},
            "audio": {
                "voice_type": voice,
                "encoding": output_format,
                "speed_ratio": speed,
                "volume_ratio": 1.0,
                "pitch_ratio": 1.0
            },
            "request": {
                "reqid": str(uuid.uuid4()),
                "text": text,
                "operation": "query"
            }
        }
        
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                self.base_url,
                json=payload,
                headers={"Authorization": f"Bearer {self.access_token}"}
            )
        
        if response.status_code != 200:
            raise Exception(f"TTS failed: {response.status_code} - {response.text}")
        
        return response.content
    
    async def _synthesize_long_text(
        self,
        text: str,
        voice: str,
        speed: float,
        fmt: str
    ) -> bytes:
        """分段处理长文本（按300字符分段）"""
        chunks = [text[i:i+300] for i in range(0, len(text), 300)]
        audio_parts = []
        
        for chunk in chunks:
            audio = await self.synthesize(chunk, voice, speed, fmt)
            audio_parts.append(audio)
        
        # 简单拼接（实际需要音频合并）
        return b"".join(audio_parts)
    
    async def get_voices(self) -> list:
        """获取可用音色列表"""
        return [
            {"id": "zh_female_shuangkuaisisi_moon_bigtts", "name": "情感女声", "gender": "female"},
            {"id": "zh_male_chunhou_moon_bigtts", "name": "醇厚男声", "gender": "male"},
            {"id": "zh_female_tianmei_bigtts", "name": "甜美女声", "gender": "female"},
            {"id": "zh_male_wennuan_bigtts", "name": "温暖男声", "gender": "male"}
        ]

# 单例
tts_service = TTSService()
```

### 7.2 API 路由

```python
# app/routers/tts.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from typing import Optional
from app.services.tts_service import tts_service

router = APIRouter(prefix="/tts", tags=["TTS"])

class SynthesizeRequest(BaseModel):
    text: str
    voice_type: Optional[str] = None
    speed: float = 1.0

class VoiceInfo(BaseModel):
    id: str
    name: str
    gender: str

@router.post("/synthesize")
async def synthesize(request: SynthesizeRequest):
    """
    文本转语音
    
    - **text**: 待合成文本
    - **voice_type**: 音色ID（可选）
    - **speed**: 语速（0.5-2.0）
    
    返回音频文件（MP3）
    """
    try:
        audio_data = await tts_service.synthesize(
            text=request.text,
            voice_type=request.voice_type,
            speed=request.speed
        )
        
        return Response(
            content=audio_data,
            media_type="audio/mpeg",
            headers={
                "Content-Disposition": "attachment; filename=output.mp3"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/voices", response_model=list[VoiceInfo])
async def list_voices():
    """获取可用音色列表"""
    return await tts_service.get_voices()
```

---

## 八、主入口

```python
# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import chat, stt, tts, health

app = FastAPI(
    title="PolyTalk API",
    description="多模态对话系统",
    version="0.1.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(chat.router)
app.include_router(stt.router)
app.include_router(tts.router)
app.include_router(health.router)

@app.on_event("startup")
async def startup():
    print(f"🚀 PolyTalk API 启动")
    print(f"📍 http://{settings.host}:{settings.port}")
    print(f"📖 文档: http://{settings.host}:{settings.port}/docs")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
```

```python
# app/routers/health.py

from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health")
async def health_check():
    """健康检查"""
    return {"status": "ok", "service": "PolyTalk API"}
```

---

## 九、数据库设计

```python
# app/models/conversation.py

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.config import settings
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    conversations = relationship("Conversation", back_populates="user")

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    session_id = Column(String(100), index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation")

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    role = Column(String(20))  # user / assistant
    content = Column(Text)
    audio_url = Column(String(500), nullable=True)  # 音频文件路径
    created_at = Column(DateTime, default=datetime.utcnow)
    
    conversation = relationship("Conversation", back_populates="messages")

# 数据库引擎
engine = create_async_engine(settings.database_url, echo=settings.debug)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
```

---

## 十、测试用例

```python
# tests/test_nlp.py

import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_chat():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/chat/",
            json={"message": "你好"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert len(data["reply"]) > 0

# tests/test_stt.py

@pytest.mark.asyncio
async def test_transcribe():
    async with AsyncClient(app=app, base_url="http://test") as client:
        # 准备测试音频文件
        with open("tests/fixtures/test.wav", "rb") as f:
            audio_data = f.read()
        
        response = await client.post(
            "/stt/transcribe",
            files={"audio": ("test.wav", audio_data, "audio/wav")},
            data={"language": "zh"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True

# tests/test_tts.py

@pytest.mark.asyncio
async def test_synthesize():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/tts/synthesize",
            json={"text": "测试语音合成", "speed": 1.0}
        )
        assert response.status_code == 200
        assert response.headers["content-type"] == "audio/mpeg"
```

---

## 十一、启动方式

```bash
# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 API Keys

# 初始化数据库
python -c "from app.models.conversation import init_db; import asyncio; asyncio.run(init_db())"

# 启动服务
python -m app.main

# 或使用 uvicorn
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 十二、API 文档

启动后访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 十三、降级方案

| 场景 | 降级策略 |
|------|----------|
| GLM-4-Flash 不可用 | 返回缓存回复 / 提示稍后重试 |
| Whisper 内存不足 | 降级到 tiny 模型 |
| 火山 TTS 超时 | 切换到 Edge TTS（免费） |
| SQLite 写入失败 | 内存缓存 + 后期持久化 |

---

## 十四、性能预估

| 模块 | 延迟 | 备注 |
|------|------|------|
| GLM-4-Flash | 500ms-2s | 取决于回复长度 |
| Whisper (small) | 实时 0.5x | 1分钟音频约30秒处理 |
| 火山 TTS | 300-800ms | 取决于文本长度 |

---

**状态**：✅ 设计完成，待实施

—— 兵部 张居正

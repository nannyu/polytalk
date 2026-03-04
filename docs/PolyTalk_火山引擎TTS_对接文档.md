# 火山引擎 TTS 对接文档
**兵部 张居正** | 2026-03-03

---

## 一、服务概述

| 项目 | 内容 |
|------|------|
| 服务商 | 火山引擎（字节跳动） |
| 产品 | 豆包大模型语音合成 |
| 文档 | https://www.volcengine.com/docs/6561/1359370 |
| 特点 | 超自然音色、中文优化、免费额度 |

---

## 二、计费方案

### 免费额度
- 大模型语音合成：有免费额度（控制台确认）
- 适合 MVP 阶段测试和小规模使用

### 付费方案（超出免费额度）

| 规格 | 价格 | 适用场景 |
|------|------|----------|
| 按量付费 | ¥5/万字符 | 低频使用 |
| 10万字符包 | ¥45（¥4.5/万字符） | 小规模 |
| 200万字符包 | ¥8000（¥4/万字符） | 中规模 |
| 2000万字符包 | ¥70000（¥3.5/万字符） | 大规模 |

**预估成本**：日1000次对话（约5000字符）→ ¥2.5/日 ≈ ¥75/月

---

## 三、接入方式

### 方式A：REST API（推荐）

```python
import requests
import json

VOLCENGINE_TTS_URL = "https://openspeech.bytedance.com/api/v1/tts"
APP_ID = "your_app_id"
ACCESS_TOKEN = "your_access_token"

def text_to_speech(text: str, voice_type: str = "zh_female_shuangkuaisisi_moon_bigtts") -> bytes:
    """
    火山引擎 TTS 合成
    
    Args:
        text: 待合成文本
        voice_type: 音色ID（默认：情感女声）
    
    Returns:
        音频二进制数据（MP3/WAV）
    """
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "app": {
            "appid": APP_ID,
            "token": "access_token",
            "cluster": "volcano_tts"
        },
        "user": {
            "uid": "polytalk_user"
        },
        "audio": {
            "voice_type": voice_type,
            "encoding": "mp3",
            "speed_ratio": 1.0,
            "volume_ratio": 1.0,
            "pitch_ratio": 1.0
        },
        "request": {
            "reqid": "request_id",
            "text": text,
            "operation": "query"
        }
    }
    
    response = requests.post(
        VOLCENGINE_TTS_URL,
        headers=headers,
        data=json.dumps(payload)
    )
    
    if response.status_code == 200:
        return response.content
    else:
        raise Exception(f"TTS failed: {response.status_code}")
```

### 方式B：WebSocket（实时流式）

```python
import websocket
import json

WS_URL = "wss://openspeech.bytedance.com/api/v1/tts/ws_binary"

async def stream_tts(text: str):
    """WebSocket 流式 TTS（低延迟）"""
    ws = websocket.create_connection(WS_URL)
    
    request = {
        "app": {"appid": APP_ID, "token": ACCESS_TOKEN},
        "audio": {"voice_type": "zh_female_shuangkuaisisi_moon_bigtts"},
        "request": {"text": text, "operation": "submit"}
    }
    
    ws.send(json.dumps(request))
    
    audio_chunks = []
    while True:
        result = ws.recv()
        if result:
            audio_chunks.append(result)
        else:
            break
    
    ws.close()
    return b"".join(audio_chunks)
```

---

## 四、音色推荐

| 音色ID | 名称 | 特点 | 适用场景 |
|--------|------|------|----------|
| `zh_female_shuangkuaisisi_moon_bigtts` | 情感女声 | 自然、情感丰富 | 对话助手 |
| `zh_male_chunhou_moon_bigtts` | 醇厚男声 | 稳重、可信 | 专业场景 |
| `zh_female_tianmei_bigtts` | 甜美女声 | 亲切、柔和 | 客服助手 |
| `zh_male_wennuan_bigtts` | 温暖男声 | 友善、轻松 | 日常对话 |

完整音色列表：https://www.volcengine.com/docs/6561/97465

---

## 五、FastAPI 封装

```python
# services/tts_service.py

from fastapi import HTTPException
from typing import Optional
import httpx

class VolcengineTTSService:
    def __init__(self, app_id: str, access_token: str):
        self.app_id = app_id
        self.access_token = access_token
        self.base_url = "https://openspeech.bytedance.com/api/v1/tts"
    
    async def synthesize(
        self,
        text: str,
        voice_type: str = "zh_female_shuangkuaisisi_moon_bigtts",
        speed: float = 1.0,
        output_format: str = "mp3"
    ) -> bytes:
        """
        合成语音
        
        Args:
            text: 输入文本（最长1024字节）
            voice_type: 音色ID
            speed: 语速（0.5-2.0）
            output_format: 输出格式（mp3/wav/pcm）
        
        Returns:
            音频二进制数据
        """
        if len(text.encode('utf-8')) > 1024:
            # 分段处理长文本
            return await self._synthesize_long_text(text, voice_type, speed, output_format)
        
        payload = {
            "app": {
                "appid": self.app_id,
                "token": "access_token",
                "cluster": "volcano_tts"
            },
            "user": {"uid": "polytalk"},
            "audio": {
                "voice_type": voice_type,
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
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.base_url,
                json=payload,
                headers={"Authorization": f"Bearer {self.access_token}"}
            )
        
        if response.status_code != 200:
            raise HTTPException(500, f"TTS synthesis failed: {response.text}")
        
        return response.content
    
    async def _synthesize_long_text(self, text: str, voice_type: str, speed: float, fmt: str) -> bytes:
        """分段处理长文本"""
        # 按300字符分段（UTF-8 约900字节）
        chunks = [text[i:i+300] for i in range(0, len(text), 300)]
        audio_parts = []
        
        for chunk in chunks:
            audio = await self.synthesize(chunk, voice_type, speed, fmt)
            audio_parts.append(audio)
        
        # 简单拼接（实际需要音频合并处理）
        return b"".join(audio_parts)
```

```python
# routers/tts.py

from fastapi import APIRouter, HTTPException
from services.tts_service import VolcengineTTSService
from config import settings

router = APIRouter(prefix="/tts", tags=["TTS"])

tts_service = VolcengineTTSService(
    app_id=settings.VOLCENGINE_APP_ID,
    access_token=settings.VOLCENGINE_ACCESS_TOKEN
)

@router.post("/synthesize")
async def synthesize_speech(
    text: str,
    voice_type: str = "zh_female_shuangkuaisisi_moon_bigtts",
    speed: float = 1.0
):
    """
    文本转语音
    
    - **text**: 待合成文本
    - **voice_type**: 音色ID（默认情感女声）
    - **speed**: 语速（0.5-2.0）
    """
    try:
        audio_data = await tts_service.synthesize(text, voice_type, speed)
        return {
            "success": True,
            "audio_size": len(audio_data),
            "format": "mp3"
        }
    except Exception as e:
        raise HTTPException(500, str(e))

@router.get("/voices")
async def list_voices():
    """获取可用音色列表"""
    return {
        "voices": [
            {"id": "zh_female_shuangkuaisisi_moon_bigtts", "name": "情感女声", "gender": "female"},
            {"id": "zh_male_chunhou_moon_bigtts", "name": "醇厚男声", "gender": "male"},
            {"id": "zh_female_tianmei_bigtts", "name": "甜美女声", "gender": "female"},
            {"id": "zh_male_wennuan_bigtts", "name": "温暖男声", "gender": "male"}
        ]
    }
```

---

## 六、配置管理

```python
# config.py

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # 火山引擎 TTS
    VOLCENGINE_APP_ID: str
    VOLCENGINE_ACCESS_TOKEN: str
    
    # 默认音色
    DEFAULT_VOICE: str = "zh_female_shuangkuaisisi_moon_bigtts"
    
    class Config:
        env_file = ".env"

settings = Settings()
```

```env
# .env
VOLCENGINE_APP_ID=your_app_id
VOLCENGINE_ACCESS_TOKEN=your_access_token
DEFAULT_VOICE=zh_female_shuangkuaisisi_moon_bigtts
```

---

## 七、依赖清单

```txt
httpx>=0.27.0
websockets>=12.0
pydantic-settings>=2.0
```

---

## 八、降级方案

| 场景 | 降级方案 |
|------|----------|
| 火山引擎不可用 | Edge TTS（微软免费） |
| API 超时 | 本地缓存音频 |
| 配额用尽 | 切换到免费音色 |

---

## 九、测试计划

1. **单元测试**：mock API 测试封装逻辑
2. **集成测试**：真实 API 调用验证
3. **性能测试**：并发 10 请求响应时间
4. **边界测试**：长文本分段处理

---

## 十、待办事项

- [ ] 申请火山引擎账号
- [ ] 创建语音合成应用
- [ ] 获取 APP_ID 和 ACCESS_TOKEN
- [ ] 配置到 `.env`
- [ ] 测试 API 连通性
- [ ] 实现音频缓存机制

---

**状态**：✅ 文档已准备，待账号申请后实施

—— 兵部 张居正

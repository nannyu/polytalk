# PolyTalk API 规范文档

> **版本**: v1.0  
> **日期**: 2026-03-03  
> **作者**: 工部严世蕃  
> **基础路径**: `/api/v1`

---

## 1. API 设计原则

| 原则            | 说明                              |
|-----------------|-----------------------------------|
| **RESTful**     | 遵循 REST 规范                    |
| **版本化**      | URL 路径版本控制 `/api/v1`        |
| **统一响应**    | 标准化响应格式                    |
| **错误处理**    | 统一错误码和消息                  |
| **异步优先**    | 长时间操作使用异步 + 轮询         |

---

## 2. 通用规范

### 2.1 基础 URL

```
开发环境: http://localhost:8000/api/v1
生产环境: https://api.polytalk.app/api/v1
```

### 2.2 认证方式

```http
Authorization: Bearer <JWT_TOKEN>
```

### 2.3 请求头

```http
Content-Type: application/json
Accept: application/json
Accept-Language: zh-CN  # 可选，指定响应语言
```

### 2.4 统一响应格式

**成功响应**:
```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}
```

**错误响应**:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "参数验证失败",
    "details": [
      {"field": "email", "message": "邮箱格式不正确"}
    ]
  }
}
```

### 2.5 分页参数

```
GET /api/v1/courses?page=1&page_size=20
```

**响应**:
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "page_size": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

### 2.6 错误码

| 错误码               | HTTP 状态码 | 说明                |
|----------------------|-------------|---------------------|
| `VALIDATION_ERROR`   | 400         | 参数验证失败        |
| `UNAUTHORIZED`       | 401         | 未认证              |
| `FORBIDDEN`          | 403         | 无权限              |
| `NOT_FOUND`          | 404         | 资源不存在          |
| `CONFLICT`           | 409         | 资源冲突            |
| `RATE_LIMIT`         | 429         | 请求过于频繁        |
| `INTERNAL_ERROR`     | 500         | 服务器内部错误      |
| `SERVICE_UNAVAILABLE`| 503         | 第三方服务不可用    |

---

## 3. API 接口

### 3.1 用户模块 `/users`

#### 3.1.1 用户注册

```http
POST /api/v1/users/register
```

**请求体**:
```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "securePassword123",
  "display_name": "Alice",
  "preferred_langs": ["en", "ja"]
}
```

**响应** `201`:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "usr_abc123",
      "username": "alice",
      "email": "alice@example.com",
      "display_name": "Alice",
      "created_at": "2026-03-03T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 3.1.2 用户登录

```http
POST /api/v1/users/login
```

**请求体**:
```json
{
  "username": "alice",
  "password": "securePassword123"
}
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### 3.1.3 获取用户信息

```http
GET /api/v1/users/me
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "id": "usr_abc123",
    "username": "alice",
    "email": "alice@example.com",
    "display_name": "Alice",
    "avatar_url": "https://...",
    "role": "student",
    "preferred_langs": ["en", "ja"],
    "settings": {
      "theme": "light",
      "voice_speed": 1.0
    },
    "stats": {
      "total_conversations": 42,
      "total_messages": 512,
      "study_time_minutes": 180
    }
  }
}
```

#### 3.1.4 更新用户信息

```http
PATCH /api/v1/users/me
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "display_name": "Alice Chen",
  "preferred_langs": ["en", "ja", "ko"],
  "settings": {
    "theme": "dark",
    "voice_speed": 1.2
  }
}
```

---

### 3.2 对话模块 `/chat`

#### 3.2.1 创建会话

```http
POST /api/v1/chat/conversations
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "course_id": "course-001",
  "lesson_id": "lesson-001",
  "title": "英语口语练习"
}
```

**响应** `201`:
```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "user_id": "usr_abc123",
    "course_id": "course-001",
    "lesson_id": "lesson-001",
    "title": "英语口语练习",
    "status": "active",
    "created_at": "2026-03-03T00:00:00Z"
  }
}
```

#### 3.2.2 获取会话列表

```http
GET /api/v1/chat/conversations?page=1&page_size=20
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "conv_xyz789",
        "title": "英语口语练习",
        "status": "active",
        "last_message": {
          "content": "Hello! How are you?",
          "created_at": "2026-03-03T00:10:00Z"
        },
        "created_at": "2026-03-03T00:00:00Z"
      }
    ],
    "pagination": {...}
  }
}
```

#### 3.2.3 获取会话详情

```http
GET /api/v1/chat/conversations/{conv_id}
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "user_id": "usr_abc123",
    "course_id": "course-001",
    "lesson_id": "lesson-001",
    "title": "英语口语练习",
    "status": "active",
    "message_count": 12,
    "last_message": {
      "id": "msg_012",
      "role": "assistant",
      "content": "Great job! Let's continue.",
      "created_at": "2026-03-03T00:30:00Z"
    },
    "created_at": "2026-03-03T00:00:00Z",
    "updated_at": "2026-03-03T00:30:00Z"
  }
}
```

**错误响应** `404`:
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "会话不存在"
  }
}
```

#### 3.2.4 更新会话

```http
PATCH /api/v1/chat/conversations/{conv_id}
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "title": "英语口语练习 - 第二周",
  "status": "archived"
}
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "title": "英语口语练习 - 第二周",
    "status": "archived",
    "updated_at": "2026-03-03T01:00:00Z"
  },
  "message": "会话更新成功"
}
```

**可更新字段**:
| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | string | 会话标题（最大 100 字符） |
| `status` | enum | `active` / `archived` / `deleted` |

**错误响应** `400`:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "状态值无效",
    "details": [
      {"field": "status", "message": "必须是 active, archived 或 deleted"}
    ]
  }
}
```

#### 3.2.5 删除会话（软删除）

```http
DELETE /api/v1/chat/conversations/{conv_id}
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "status": "deleted",
    "deleted_at": "2026-03-03T02:00:00Z"
  },
  "message": "会话已删除"
}
```

**说明**:
- 软删除：会话标记为 `deleted` 状态，数据保留
- 已删除会话不在列表中显示
- 管理员可恢复已删除会话

**错误响应** `404`:
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "会话不存在或已被删除"
  }
}
```

#### 3.2.6 发送消息（普通）

```http
POST /api/v1/chat/conversations/{conv_id}/messages
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "content": "Hello, I want to learn English.",
  "audio_url": null
}
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "user_message": {
      "id": "msg_001",
      "role": "user",
      "content": "Hello, I want to learn English.",
      "created_at": "2026-03-03T00:01:00Z"
    },
    "assistant_message": {
      "id": "msg_002",
      "role": "assistant",
      "content": "Hello! I'm glad you want to learn English...",
      "audio_url": "https://...",
      "created_at": "2026-03-03T00:01:05Z"
    }
  }
}
```

#### 3.2.7 发送消息（流式 SSE）

```http
POST /api/v1/chat/conversations/{conv_id}/messages/stream
Authorization: Bearer <token>
Accept: text/event-stream
```

**请求体**:
```json
{
  "content": "Hello, I want to learn English."
}
```

**响应** (SSE 流):
```
event: message
data: {"chunk": "Hello!", "done": false}

event: message
data: {"chunk": " I'm glad", "done": false}

event: message
data: {"chunk": " you want to learn English.", "done": true}

event: done
data: {"message_id": "msg_002", "audio_url": "https://..."}
```

#### 3.2.8 获取会话消息历史

```http
GET /api/v1/chat/conversations/{conv_id}/messages?page=1&page_size=50
Authorization: Bearer <token>
```

---

### 3.3 语音模块 `/voice`

#### 3.3.1 语音转文字 (STT)

```http
POST /api/v1/voice/stt
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**请求体**:
```
audio: <audio file> (webm/wav/mp3)
language: en
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "text": "Hello, I want to learn English.",
    "language": "en",
    "confidence": 0.95,
    "duration": 2.5
  }
}
```

#### 3.3.2 文字转语音 (TTS)

```http
POST /api/v1/voice/tts
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "text": "Hello! How are you?",
  "language": "en",
  "voice": "en-US-AriaNeural",
  "speed": 1.0
}
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "audio_url": "https://storage.../tts_xxx.mp3",
    "duration": 2.1,
    "format": "mp3"
  }
}
```

#### 3.3.3 可用语音列表

```http
GET /api/v1/voice/voices?language=en
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "voices": [
      {"id": "en-US-AriaNeural", "name": "Aria", "gender": "female"},
      {"id": "en-US-GuyNeural", "name": "Guy", "gender": "male"},
      {"id": "en-GB-SoniaNeural", "name": "Sonia", "gender": "female"}
    ]
  }
}
```

---

### 3.4 课程模块 `/courses`

#### 3.4.1 获取课程列表

```http
GET /api/v1/courses?language=en&level=beginner&page=1&page_size=20
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "course-001",
        "title": "英语启蒙",
        "description": "适合零基础学习者",
        "language": "en",
        "level": "beginner",
        "category": "启蒙",
        "cover_url": "https://...",
        "lessons_count": 20,
        "duration_minutes": 120,
        "enrolled_count": 1250
      }
    ],
    "pagination": {...}
  }
}
```

#### 3.4.2 获取课程详情

```http
GET /api/v1/courses/{course_id}
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "id": "course-001",
    "title": "英语启蒙",
    "description": "...",
    "units": [
      {
        "id": "unit-001",
        "title": "Hello World",
        "order_index": 1,
        "lessons": [
          {"id": "lesson-001", "title": "打招呼", "lesson_type": "dialogue"},
          {"id": "lesson-002", "title": "基础词汇", "lesson_type": "vocabulary"}
        ]
      }
    ]
  }
}
```

#### 3.4.3 获取课时内容

```http
GET /api/v1/courses/{course_id}/lessons/{lesson_id}
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "id": "lesson-001",
    "title": "打招呼",
    "lesson_type": "dialogue",
    "content": {
      "scenario": "初次见面",
      "dialogue": [
        {"speaker": "A", "text": "Hello!", "translation": "你好！"},
        {"speaker": "B", "text": "Hi, how are you?", "translation": "嗨，你好吗？"}
      ],
      "vocabulary": [
        {"word": "hello", "translation": "你好", "audio_url": "..."}
      ]
    },
    "duration": 5,
    "user_progress": {
      "completed": false,
      "score": null,
      "attempts": 0
    }
  }
}
```

---

### 3.5 进度模块 `/progress`

#### 3.5.1 更新学习进度

```http
POST /api/v1/progress/lessons/{lesson_id}
Authorization: Bearer <token>
```

**请求体**:
```json
{
  "completed": true,
  "score": 85,
  "time_spent": 300
}
```

#### 3.5.2 获取学习统计

```http
GET /api/v1/progress/stats
Authorization: Bearer <token>
```

**响应** `200`:
```json
{
  "success": true,
  "data": {
    "total_time_minutes": 180,
    "lessons_completed": 15,
    "words_learned": 120,
    "conversations_count": 42,
    "streak_days": 5,
    "weekly_progress": [
      {"date": "2026-03-01", "minutes": 30},
      {"date": "2026-03-02", "minutes": 45}
    ]
  }
}
```

#### 3.5.3 获取词汇掌握情况

```http
GET /api/v1/progress/vocabulary?course_id=course-001
Authorization: Bearer <token>
```

---

## 4. WebSocket 接口

### 4.1 实时对话

```
ws://localhost:8000/api/v1/ws/chat/{conv_id}
```

**连接参数**:
```
?token=<JWT_TOKEN>
```

**客户端消息**:
```json
{
  "type": "message",
  "content": "Hello!"
}
```

**服务端消息**:
```json
{
  "type": "chunk",
  "content": "Hello!",
  "done": false
}
```

```json
{
  "type": "audio",
  "audio_url": "https://...",
  "done": true
}
```

---

## 5. 限流策略

| 接口                 | 限制          | 窗口期  |
|----------------------|---------------|---------|
| `/chat/messages`     | 60 次/用户    | 1 分钟  |
| `/voice/stt`         | 30 次/用户    | 1 分钟  |
| `/voice/tts`         | 60 次/用户    | 1 分钟  |
| 全局                 | 1000 次/IP    | 1 分钟  |

**限流响应** `429`:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT",
    "message": "请求过于频繁，请稍后再试",
    "retry_after": 30
  }
}
```

---

## 6. Webhook（二期）

### 6.1 事件订阅

| 事件                | 触发时机              |
|---------------------|-----------------------|
| `user.created`      | 用户注册成功          |
| `lesson.completed`  | 课时完成              |
| `conversation.ended`| 对话会话结束          |

---

## 7. SDK 示例

### 7.1 JavaScript/TypeScript

```typescript
// frontend/lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 发送消息（流式）
async function sendMessage(convId: string, content: string) {
  const response = await fetch(`/api/v1/chat/conversations/${convId}/messages/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });

  const reader = response.body?.getReader();
  // ... 处理 SSE 流
}
```

### 7.2 Python

```python
# backend/app/api/v1/chat.py
from fastapi import APIRouter, Depends
from app.services.nlp import nlp_service

router = APIRouter()

@router.post("/conversations/{conv_id}/messages")
async def send_message(
    conv_id: str,
    request: MessageRequest,
    user = Depends(get_current_user)
):
    # 保存用户消息
    user_msg = await save_message(conv_id, "user", request.content)
    
    # 调用 NLP 服务
    response = await nlp_service.generate(
        prompt=request.content,
        context=await get_context(conv_id)
    )
    
    # 保存 AI 回复
    assistant_msg = await save_message(conv_id, "assistant", response)
    
    return {"user_message": user_msg, "assistant_message": assistant_msg}
```

---

## 8. 测试用例

### 8.1 接口测试

```bash
# 用户注册
curl -X POST http://localhost:8000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'

# 获取课程列表
curl http://localhost:8000/api/v1/courses

# 发送消息（需 token）
curl -X POST http://localhost:8000/api/v1/chat/conversations/conv_001/messages \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello!"}'
```

---

## 附录

### A. Postman 集合

见 `docs/postman_collection.json`

### B. OpenAPI 规范

见 `backend/app/openapi.json`（FastAPI 自动生成）

### C. 变更历史

| 版本 | 日期       | 变更内容       | 作者   |
|------|------------|----------------|--------|
| v1.0 | 2026-03-03 | 初稿           | 工部严世蕃 |
| v1.1 | 2026-03-03 | 补充会话管理API | 兵部张居正 |

---

**工部严世蕃 呈**
2026-03-03 01:00

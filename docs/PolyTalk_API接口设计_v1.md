# PolyTalk API 接口设计 v1
**兵部 张居正** | 2026-03-03 11:25
**协作方**：工部（数据库设计）
**框架**：NestJS + Fastify Adapter

---

## 一、API 总览

### 1.1 基础信息

| 项目 | 值 |
|------|-----|
| Base URL | `http://localhost:3000/api` |
| 版本 | `v1` |
| 认证 | JWT Bearer Token |
| 格式 | JSON |
| 编码 | UTF-8 |

### 1.2 通用响应格式

```typescript
// 成功响应
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}

// 错误响应
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

// 分页响应
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
  };
  timestamp: string;
}
```

### 1.3 HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 201 | 创建成功 |
| 204 | 删除成功（无返回体） |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 409 | 资源冲突 |
| 422 | 业务逻辑错误 |
| 429 | 请求过于频繁 |
| 500 | 服务器内部错误 |

---

## 二、认证模块 `/api/auth`

### 2.1 注册

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "nickname": "学习者小明",
  "language": "zh-CN"
}
```

**响应 201**：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "nickname": "学习者小明",
      "tier": "free",
      "language": "zh-CN",
      "createdAt": "2026-03-03T11:25:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

**错误 409**：
```json
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "该邮箱已被注册"
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 2.2 登录

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "nickname": "学习者小明",
      "avatar": "https://cdn.example.com/avatars/default.png",
      "tier": "pro"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 2.3 刷新Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 2.4 登出

```http
POST /api/auth/logout
Authorization: Bearer {accessToken}
```

**响应 204**：无返回体

### 2.5 OAuth 登录（预留）

```http
POST /api/auth/oauth/{provider}
Content-Type: application/json

{
  "code": "oauth_authorization_code"
}
```

**支持的 provider**：`google`, `github`, `apple`

---

## 三、用户模块 `/api/users`

### 3.1 获取当前用户信息

```http
GET /api/users/me
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "nickname": "学习者小明",
    "avatar": "https://cdn.example.com/avatars/user123.png",
    "tier": "pro",
    "language": "zh-CN",
    "timezone": "Asia/Shanghai",
    "settings": {
      "theme": "light",
      "fontSize": "medium",
      "autoTTS": true,
      "autoSTT": false
    },
    "stats": {
      "totalConversations": 42,
      "totalMessages": 1024,
      "totalTokens": 128000,
      "learningDays": 15
    },
    "createdAt": "2026-02-15T08:00:00Z",
    "lastActiveAt": "2026-03-03T11:20:00Z"
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 3.2 更新用户信息

```http
PATCH /api/users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "nickname": "新昵称",
  "avatar": "https://cdn.example.com/avatars/new.png",
  "language": "en-US"
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nickname": "新昵称",
    "avatar": "https://cdn.example.com/avatars/new.png",
    "language": "en-US",
    "updatedAt": "2026-03-03T11:25:00Z"
  },
  "message": "用户信息已更新",
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 3.3 更新用户偏好设置

```http
PUT /api/users/me/settings
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "theme": "dark",
  "fontSize": "large",
  "autoTTS": true,
  "autoSTT": true
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "theme": "dark",
    "fontSize": "large",
    "autoTTS": true,
    "autoSTT": true
  },
  "message": "设置已保存",
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 3.4 修改密码

```http
POST /api/users/me/password
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "oldPassword": "OldPass123!",
  "newPassword": "NewSecure456!"
}
```

**响应 200**：
```json
{
  "success": true,
  "data": null,
  "message": "密码已更新，请重新登录",
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 3.5 删除账户（软删除）

```http
DELETE /api/users/me
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "password": "CurrentPass123!",
  "reason": "不再使用"
}
```

**响应 204**：无返回体

---

## 四、学习模块 `/api/learning`

### 4.1 课程列表

```http
GET /api/learning/courses?page=1&limit=20&language=zh-CN&level=beginner
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": [
    {
      "id": "course-001",
      "title": "英语基础口语",
      "description": "从零开始学习英语口语",
      "language": "en-US",
      "level": "beginner",
      "coverImage": "https://cdn.example.com/courses/english-basic.png",
      "totalLessons": 30,
      "duration": "15小时",
      "enrolledCount": 1024,
      "rating": 4.8,
      "isEnrolled": true,
      "progress": 35
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3,
    "hasNext": true
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 4.2 课程详情

```http
GET /api/learning/courses/{courseId}
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "id": "course-001",
    "title": "英语基础口语",
    "description": "从零开始学习英语口语，掌握日常对话技巧",
    "language": "en-US",
    "level": "beginner",
    "coverImage": "https://cdn.example.com/courses/english-basic.png",
    "instructor": {
      "name": "张老师",
      "avatar": "https://cdn.example.com/instructors/zhang.png",
      "bio": "10年英语教学经验"
    },
    "totalLessons": 30,
    "duration": "15小时",
    "syllabus": [
      {
        "unit": 1,
        "title": "基础问候",
        "lessons": [
          { "id": "lesson-001", "title": "Hello & Hi", "duration": "30分钟", "completed": true },
          { "id": "lesson-002", "title": "自我介绍", "duration": "25分钟", "completed": false }
        ]
      }
    ],
    "enrollment": {
      "isEnrolled": true,
      "enrolledAt": "2026-02-20T10:00:00Z",
      "progress": 35,
      "currentLesson": "lesson-005"
    }
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 4.3 报名课程

```http
POST /api/learning/courses/{courseId}/enroll
Authorization: Bearer {accessToken}
```

**响应 201**：
```json
{
  "success": true,
  "data": {
    "enrollmentId": "enroll-123",
    "courseId": "course-001",
    "enrolledAt": "2026-03-03T11:25:00Z",
    "currentLesson": "lesson-001"
  },
  "message": "报名成功",
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 4.4 课时内容

```http
GET /api/learning/lessons/{lessonId}
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "id": "lesson-001",
    "courseId": "course-001",
    "title": "Hello & Hi",
    "description": "学习基本的问候语",
    "duration": "30分钟",
    "objectives": [
      "掌握 Hello, Hi, Good morning 等问候语",
      "能够进行简单的自我介绍"
    ],
    "content": {
      "type": "interactive",
      "sections": [
        {
          "type": "dialogue",
          "title": "情景对话",
          "scenario": "在咖啡厅遇见新朋友",
          "dialogue": [
            { "speaker": "A", "text": "Hello! I'm Tom.", "translation": "你好！我是Tom。" },
            { "speaker": "B", "text": "Hi Tom! I'm Sarah.", "translation": "你好Tom！我是Sarah。" }
          ]
        },
        {
          "type": "vocabulary",
          "words": [
            { "word": "Hello", "phonetic": "/həˈləʊ/", "meaning": "你好", "example": "Hello, how are you?" }
          ]
        },
        {
          "type": "practice",
          "exercises": [
            {
              "id": "ex-001",
              "type": "pronunciation",
              "text": "Hello, nice to meet you!",
              "difficulty": "easy"
            }
          ]
        }
      ]
    },
    "isCompleted": false,
    "progress": {
      "completedExercises": 2,
      "totalExercises": 5
    }
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 4.5 完成课时

```http
POST /api/learning/lessons/{lessonId}/complete
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "exerciseResults": [
    { "exerciseId": "ex-001", "score": 95, "timeSpent": 120 },
    { "exerciseId": "ex-002", "score": 88, "timeSpent": 90 }
  ],
  "notes": "需要多练习发音"
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "lessonId": "lesson-001",
    "completed": true,
    "score": 91,
    "nextLesson": {
      "id": "lesson-002",
      "title": "自我介绍"
    },
    "courseProgress": 40
  },
  "message": "课时已完成",
  "timestamp": "2026-03-03T11:25:00Z"
}
```

---

## 五、对话模块 `/api/chat`

### 5.1 会话列表

```http
GET /api/chat/conversations?page=1&limit=20&status=active
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": [
    {
      "id": "conv-123",
      "title": "英语口语练习 - 问候语",
      "language": "en-US",
      "status": "active",
      "messageCount": 15,
      "lastMessage": {
        "content": "Great job! Your pronunciation is getting better.",
        "role": "assistant",
        "createdAt": "2026-03-03T11:20:00Z"
      },
      "createdAt": "2026-03-02T14:00:00Z",
      "updatedAt": "2026-03-03T11:20:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "totalPages": 3,
    "hasNext": true
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 5.2 创建会话

```http
POST /api/chat/conversations
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "法语基础练习",
  "language": "fr-FR",
  "config": {
    "aiProvider": "claude",
    "modelName": "claude-3-haiku",
    "voiceType": "french_female_01",
    "temperature": 0.8,
    "systemPrompt": "你是一位法语外教，请用法语与我对话，并纠正我的语法错误。"
  }
}
```

**响应 201**：
```json
{
  "success": true,
  "data": {
    "id": "conv-124",
    "title": "法语基础练习",
    "language": "fr-FR",
    "status": "active",
    "config": {
      "aiProvider": "claude",
      "modelName": "claude-3-haiku",
      "voiceType": "french_female_01",
      "temperature": 0.8,
      "systemPrompt": "你是一位法语外教，请用法语与我对话，并纠正我的语法错误。"
    },
    "createdAt": "2026-03-03T11:25:00Z"
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 5.3 获取会话详情及消息历史

```http
GET /api/chat/conversations/{convId}?cursor=2026-03-03T10:00:00Z&limit=50
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "conversation": {
      "id": "conv-123",
      "title": "英语口语练习",
      "language": "en-US",
      "status": "active",
      "config": {
        "aiProvider": "glm",
        "modelName": "glm-4-flash",
        "voiceType": "zh_female_shuangkuaisisi",
        "temperature": 0.7
      }
    },
    "messages": [
      {
        "id": "msg-001",
        "role": "system",
        "content": "你是一位英语外教，请用英语与学习者对话。",
        "createdAt": "2026-03-02T14:00:00Z"
      },
      {
        "id": "msg-002",
        "role": "user",
        "content": "Hello, I want to learn English.",
        "contentType": "text",
        "createdAt": "2026-03-02T14:01:00Z"
      },
      {
        "id": "msg-003",
        "role": "assistant",
        "content": "Hello! I'm excited to help you learn English. Let's start with some basic greetings.",
        "contentType": "text",
        "audioUrl": "https://cdn.example.com/audio/msg-003.mp3",
        "provider": "glm",
        "model": "glm-4-flash",
        "tokensUsed": 25,
        "latencyMs": 320,
        "createdAt": "2026-03-02T14:01:02Z"
      }
    ],
    "hasMore": true,
    "nextCursor": "2026-03-02T13:30:00Z"
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 5.4 发送消息（同步）

```http
POST /api/chat/conversations/{convId}/messages
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "content": "How do I introduce myself in English?",
  "contentType": "text"
}
```

**语音消息请求**：
```json
{
  "contentType": "audio",
  "audioData": "base64_encoded_audio_data",
  "language": "en-US"
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "userMessage": {
      "id": "msg-004",
      "role": "user",
      "content": "How do I introduce myself in English?",
      "contentType": "text",
      "createdAt": "2026-03-03T11:25:00Z"
    },
    "assistantMessage": {
      "id": "msg-005",
      "role": "assistant",
      "content": "Great question! Here's how you can introduce yourself:\n\n\"Hello, my name is [Your Name]. I'm from [Your Country]. Nice to meet you!\"\n\nTry it now!",
      "contentType": "text",
      "audioUrl": "https://cdn.example.com/audio/msg-005.mp3",
      "provider": "glm",
      "model": "glm-4-flash",
      "tokensUsed": 45,
      "latencyMs": 380,
      "createdAt": "2026-03-03T11:25:01Z"
    }
  },
  "timestamp": "2026-03-03T11:25:01Z"
}
```

### 5.5 流式消息（SSE）

```http
POST /api/chat/conversations/{convId}/stream
Authorization: Bearer {accessToken}
Content-Type: application/json
Accept: text/event-stream

{
  "content": "Tell me a story about learning languages.",
  "contentType": "text"
}
```

**响应（Server-Sent Events）**：
```
event: user_message
data: {"id":"msg-006","content":"Tell me a story about learning languages.","createdAt":"2026-03-03T11:25:00Z"}

event: chunk
data: {"content":"Once"}

event: chunk
data: {"content":" upon"}

event: chunk
data: {"content":" a"}

event: chunk
data: {"content":" time..."}

event: done
data: {"id":"msg-007","provider":"glm","model":"glm-4-flash","tokensUsed":150,"latencyMs":1200}

event: audio
data: {"audioUrl":"https://cdn.example.com/audio/msg-007.mp3"}
```

### 5.6 更新会话配置

```http
PATCH /api/chat/conversations/{convId}/config
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "aiProvider": "claude",
  "temperature": 0.9,
  "systemPrompt": "Updated system prompt..."
}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "aiProvider": "claude",
    "temperature": 0.9,
    "systemPrompt": "Updated system prompt..."
  },
  "message": "配置已更新",
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 5.7 归档会话

```http
POST /api/chat/conversations/{convId}/archive
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "id": "conv-123",
    "status": "archived",
    "archivedAt": "2026-03-03T11:25:00Z"
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 5.8 删除会话

```http
DELETE /api/chat/conversations/{convId}
Authorization: Bearer {accessToken}
```

**响应 204**：无返回体

---

## 六、进度模块 `/api/progress`

### 6.1 学习统计概览

```http
GET /api/progress/overview
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "totalConversations": 42,
    "totalMessages": 1024,
    "totalTokens": 128000,
    "learningDays": 15,
    "streakDays": 7,
    "averageScore": 87.5,
    "languages": [
      { "language": "en-US", "conversations": 30, "hours": 12.5 },
      { "language": "fr-FR", "conversations": 12, "hours": 4.2 }
    ],
    "weeklyActivity": [
      { "date": "2026-02-25", "minutes": 45 },
      { "date": "2026-02-26", "minutes": 30 },
      { "date": "2026-02-27", "minutes": 0 },
      { "date": "2026-02-28", "minutes": 60 },
      { "date": "2026-03-01", "minutes": 55 },
      { "date": "2026-03-02", "minutes": 40 },
      { "date": "2026-03-03", "minutes": 25 }
    ]
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 6.2 课程进度

```http
GET /api/progress/courses
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": [
    {
      "courseId": "course-001",
      "title": "英语基础口语",
      "totalLessons": 30,
      "completedLessons": 12,
      "progress": 40,
      "enrolledAt": "2026-02-20T10:00:00Z",
      "lastAccessedAt": "2026-03-03T11:00:00Z",
      "estimatedCompletion": "2026-03-15"
    }
  ],
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 6.3 单科进度详情

```http
GET /api/progress/courses/{courseId}
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "courseId": "course-001",
    "title": "英语基础口语",
    "progress": 40,
    "units": [
      {
        "unit": 1,
        "title": "基础问候",
        "progress": 100,
        "lessons": [
          { "id": "lesson-001", "title": "Hello & Hi", "completed": true, "score": 95 },
          { "id": "lesson-002", "title": "自我介绍", "completed": true, "score": 88 }
        ]
      },
      {
        "unit": 2,
        "title": "日常对话",
        "progress": 50,
        "lessons": [
          { "id": "lesson-003", "title": "购物对话", "completed": true, "score": 92 },
          { "id": "lesson-004", "title": "餐厅点餐", "completed": false, "score": null }
        ]
      }
    ],
    "stats": {
      "totalExercises": 150,
      "completedExercises": 60,
      "averageScore": 91.7,
      "totalTimeSpent": 3600
    }
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 6.4 学习记录（按日期）

```http
GET /api/progress/history?startDate=2026-02-01&endDate=2026-03-03
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": [
    {
      "date": "2026-03-03",
      "conversations": 3,
      "messages": 42,
      "duration": 1800,
      "tokens": 3500,
      "exercises": 5,
      "averageScore": 94
    },
    {
      "date": "2026-03-02",
      "conversations": 5,
      "messages": 68,
      "duration": 2400,
      "tokens": 5200,
      "exercises": 8,
      "averageScore": 89
    }
  ],
  "timestamp": "2026-03-03T11:25:00Z"
}
```

### 6.5 词汇掌握统计

```http
GET /api/progress/vocabulary?language=en-US
Authorization: Bearer {accessToken}
```

**响应 200**：
```json
{
  "success": true,
  "data": {
    "language": "en-US",
    "totalWords": 256,
    "mastered": 180,
    "learning": 50,
    "new": 26,
    "recentWords": [
      {
        "word": "serendipity",
        "meaning": "意外发现美好事物的能力",
        "mastery": 85,
        "lastReviewed": "2026-03-03T10:00:00Z"
      }
    ]
  },
  "timestamp": "2026-03-03T11:25:00Z"
}
```

---

## 七、WebSocket 事件定义

### 7.1 连接

```javascript
// 客户端连接
const ws = new WebSocket('ws://localhost:3000/ws');

// 认证
ws.send(JSON.stringify({
  event: 'auth',
  data: { token: 'Bearer eyJhbGciOiJIUzI1NiIs...' }
}));

// 服务端确认
ws.onmessage = (msg) => {
  const { event, data } = JSON.parse(msg.data);
  if (event === 'auth:success') {
    console.log('WebSocket 认证成功');
  }
};
```

### 7.2 事件列表

#### 客户端 → 服务端

| 事件 | 说明 | 数据 |
|------|------|------|
| `auth` | 认证 | `{ token: string }` |
| `chat:join` | 加入会话 | `{ conversationId: string }` |
| `chat:leave` | 离开会话 | `{ conversationId: string }` |
| `chat:message` | 发送消息 | `{ conversationId: string, content: string, contentType: 'text' \| 'audio' }` |
| `chat:typing` | 正在输入 | `{ conversationId: string }` |
| `ping` | 心跳 | - |

#### 服务端 → 客户端

| 事件 | 说明 | 数据 |
|------|------|------|
| `auth:success` | 认证成功 | `{ userId: string }` |
| `auth:failed` | 认证失败 | `{ error: string }` |
| `chat:joined` | 已加入会话 | `{ conversationId: string, participants: number }` |
| `chat:message` | 收到消息 | `{ id, role, content, createdAt }` |
| `chat:stream:start` | 流式响应开始 | `{ messageId: string }` |
| `chat:stream:chunk` | 流式响应分块 | `{ content: string }` |
| `chat:stream:done` | 流式响应结束 | `{ messageId, tokensUsed, latencyMs }` |
| `chat:typing` | 对方正在输入 | `{ conversationId: string }` |
| `chat:error` | 消息错误 | `{ error: string }` |
| `pong` | 心跳响应 | - |

### 7.3 实时对话示例

```javascript
// 客户端代码
const ws = new WebSocket('ws://localhost:3000/ws');

// 1. 认证
ws.onopen = () => {
  ws.send(JSON.stringify({
    event: 'auth',
    data: { token: localStorage.getItem('accessToken') }
  }));
};

// 2. 加入会话
ws.onmessage = (msg) => {
  const { event, data } = JSON.parse(msg.data);
  
  if (event === 'auth:success') {
    ws.send(JSON.stringify({
      event: 'chat:join',
      data: { conversationId: 'conv-123' }
    }));
  }
  
  if (event === 'chat:joined') {
    // 3. 发送消息
    ws.send(JSON.stringify({
      event: 'chat:message',
      data: {
        conversationId: 'conv-123',
        content: 'Hello!',
        contentType: 'text'
      }
    }));
  }
  
  if (event === 'chat:stream:chunk') {
    // 4. 接收流式响应
    console.log('Chunk:', data.content);
  }
  
  if (event === 'chat:stream:done') {
    console.log('Response completed, latency:', data.latencyMs);
  }
};

// 5. 正在输入提示
inputElement.addEventListener('input', () => {
  ws.send(JSON.stringify({
    event: 'chat:typing',
    data: { conversationId: 'conv-123' }
  }));
});
```

---

## 八、AI 服务抽象层（Strategy 模式）

### 8.1 架构设计

```typescript
// src/services/ai/interfaces/ai-provider.interface.ts

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
  latencyMs: number;
}

export interface AIProvider {
  readonly name: string;
  readonly models: string[];
  
  chat(request: ChatRequest): Promise<ChatResponse>;
  chatStream(request: ChatRequest): AsyncGenerator<string>;
  isAvailable(): Promise<boolean>;
  estimateCost(tokens: number): number;
}
```

### 8.2 Provider 注册表

```typescript
// src/services/ai/providers/ai-provider.registry.ts

import { Injectable } from '@nestjs/common';
import { AIProvider } from '../interfaces/ai-provider.interface';

export type ProviderType = 'glm' | 'ernie' | 'qwen' | 'openai' | 'claude' | 'gemini';

@Injectable()
export class AIProviderRegistry {
  private providers = new Map<ProviderType, AIProvider>();
  
  register(type: ProviderType, provider: AIProvider) {
    this.providers.set(type, provider);
  }
  
  get(type: ProviderType): AIProvider | undefined {
    return this.providers.get(type);
  }
  
  list(): ProviderType[] {
    return Array.from(this.providers.keys());
  }
}
```

### 8.3 GLM Provider 实现

```typescript
// src/services/ai/providers/glm.provider.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, ChatRequest, ChatResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class GLMProvider implements AIProvider {
  readonly name = 'GLM';
  readonly models = ['glm-4-flash', 'glm-4', 'glm-3-turbo'];
  
  private apiKey: string;
  private baseURL = 'https://open.bigmodel.cn/api/paas/v4';
  
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ZHIPUAI_API_KEY') || '';
  }
  
  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }
  
  async chat(request: ChatRequest): Promise<ChatResponse> {
    const startTime = Date.now();
    
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'glm-4-flash',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.maxTokens || 1024,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`GLM API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      model: data.model,
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
      },
      finishReason: data.choices[0].finish_reason,
      latencyMs: Date.now() - startTime,
    };
  }
  
  async *chatStream(request: ChatRequest): AsyncGenerator<string> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: request.model || 'glm-4-flash',
        messages: request.messages,
        stream: true,
      }),
    });
    
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');
    
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));
      
      for (const line of lines) {
        const data = line.replace('data: ', '');
        if (data === '[DONE]') return;
        
        try {
          const json = JSON.parse(data);
          const content = json.choices[0]?.delta?.content;
          if (content) yield content;
        } catch (e) {
          // Skip invalid JSON
        }
      }
    }
  }
  
  estimateCost(tokens: number): number {
    // GLM-4-Flash: 免费
    return 0;
  }
}
```

### 8.4 AI Gateway（统一网关）

```typescript
// src/services/ai/ai-gateway.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProviderRegistry, ProviderType } from './providers/ai-provider.registry';
import { ChatRequest, ChatResponse } from './interfaces/ai-provider.interface';

@Injectable()
export class AIGatewayService {
  private readonly logger = new Logger(AIGatewayService.name);
  private defaultProvider: ProviderType;
  private fallbackOrder: ProviderType[];
  
  constructor(
    private registry: AIProviderRegistry,
    private configService: ConfigService,
  ) {
    this.defaultProvider = (this.configService.get('DEFAULT_AI_PROVIDER') as ProviderType) || 'glm';
    this.fallbackOrder = ['glm', 'qwen', 'openai', 'claude', 'gemini', 'ernie'];
  }
  
  async chat(request: ChatRequest, provider?: ProviderType): Promise<ChatResponse> {
    const targetProvider = provider || this.defaultProvider;
    
    // 尝试指定供应商
    try {
      const p = this.registry.get(targetProvider);
      if (p && await p.isAvailable()) {
        return await p.chat(request);
      }
    } catch (error) {
      this.logger.error(`${targetProvider} failed: ${error.message}`);
    }
    
    // 降级到其他供应商
    for (const fallbackType of this.fallbackOrder) {
      if (fallbackType === targetProvider) continue;
      
      try {
        const p = this.registry.get(fallbackType);
        if (p && await p.isAvailable()) {
          this.logger.log(`Fallback to ${fallbackType}`);
          return await p.chat(request);
        }
      } catch (error) {
        this.logger.error(`${fallbackType} failed: ${error.message}`);
        continue;
      }
    }
    
    throw new Error('All AI providers unavailable');
  }
  
  async *chatStream(request: ChatRequest, provider?: ProviderType): AsyncGenerator<string> {
    const targetProvider = provider || this.defaultProvider;
    const p = this.registry.get(targetProvider);
    
    if (!p || !(await p.isAvailable())) {
      throw new Error(`${targetProvider} not available`);
    }
    
    yield* p.chatStream(request);
  }
}
```

### 8.5 模块注册

```typescript
// src/services/ai/ai.module.ts

import { Module } from '@nestjs/common';
import { AIProviderRegistry } from './providers/ai-provider.registry';
import { AIGatewayService } from './ai-gateway.service';
import { GLMProvider } from './providers/glm.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { ClaudeProvider } from './providers/claude.provider';

@Module({
  providers: [
    AIProviderRegistry,
    AIGatewayService,
    GLMProvider,
    OpenAIProvider,
    ClaudeProvider,
    {
      provide: 'AI_PROVIDER_SETUP',
      useFactory: (
        registry: AIProviderRegistry,
        glm: GLMProvider,
        openai: OpenAIProvider,
        claude: ClaudeProvider,
      ) => {
        registry.register('glm', glm);
        registry.register('openai', openai);
        registry.register('claude', claude);
        return registry;
      },
      inject: [AIProviderRegistry, GLMProvider, OpenAIProvider, ClaudeProvider],
    },
  ],
  exports: [AIGatewayService],
})
export class AIModule {}
```

### 8.6 使用示例

```typescript
// src/modules/chat/chat.service.ts

import { Injectable } from '@nestjs/common';
import { AIGatewayService } from '../../services/ai/ai-gateway.service';

@Injectable()
export class ChatService {
  constructor(private aiGateway: AIGatewayService) {}
  
  async sendMessage(convId: string, content: string) {
    // 获取历史消息...
    const history = await this.getHistory(convId);
    
    const response = await this.aiGateway.chat({
      messages: [
        { role: 'system', content: 'You are a language teacher...' },
        ...history,
        { role: 'user', content },
      ],
      temperature: 0.8,
    }, 'glm'); // 可选指定 provider
    
    return response;
  }
}
```

---

## 九、NestJS 目录结构

```
src/
├── main.ts                          # 入口
├── app.module.ts                    # 根模块
│
├── common/
│   ├── filters/                     # 异常过滤器
│   │   └── http-exception.filter.ts
│   ├── guards/                      # 守卫
│   │   ├── jwt-auth.guard.ts
│   │   └── ws-auth.guard.ts
│   ├── interceptors/                # 拦截器
│   │   ├── logging.interceptor.ts
│   │   └── transform.interceptor.ts
│   ├── decorators/                  # 自定义装饰器
│   │   └── current-user.decorator.ts
│   └── dto/                         # 通用DTO
│       └── pagination.dto.ts
│
├── config/
│   ├── configuration.ts             # 配置
│   └── database.config.ts           # 数据库配置
│
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   └── dto/
│   │       ├── register.dto.ts
│   │       └── login.dto.ts
│   │
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── update-user.dto.ts
│   │       └── update-settings.dto.ts
│   │
│   ├── learning/
│   │   ├── learning.module.ts
│   │   ├── controllers/
│   │   │   ├── courses.controller.ts
│   │   │   └── lessons.controller.ts
│   │   ├── services/
│   │   │   ├── courses.service.ts
│   │   │   └── lessons.service.ts
│   │   ├── entities/
│   │   │   ├── course.entity.ts
│   │   │   └── lesson.entity.ts
│   │   └── dto/
│   │
│   ├── chat/
│   │   ├── chat.module.ts
│   │   ├── chat.controller.ts
│   │   ├── chat.service.ts
│   │   ├── chat.gateway.ts          # WebSocket 网关
│   │   ├── entities/
│   │   │   ├── conversation.entity.ts
│   │   │   └── message.entity.ts
│   │   └── dto/
│   │
│   └── progress/
│       ├── progress.module.ts
│       ├── progress.controller.ts
│       ├── progress.service.ts
│       └── dto/
│
├── services/
│   ├── ai/                          # AI 服务抽象层
│   │   ├── ai.module.ts
│   │   ├── interfaces/
│   │   │   └── ai-provider.interface.ts
│   │   ├── providers/
│   │   │   ├── ai-provider.registry.ts
│   │   │   ├── glm.provider.ts
│   │   │   ├── openai.provider.ts
│   │   │   ├── claude.provider.ts
│   │   │   └── ...
│   │   └── ai-gateway.service.ts
│   │
│   ├── stt/                         # 语音识别
│   │   ├── stt.module.ts
│   │   └── stt.service.ts
│   │
│   └── tts/                         # 语音合成
│       ├── tts.module.ts
│       └── tts.service.ts
│
└── models/                          # Drizzle ORM Schema
    ├── user.ts
    ├── conversation.ts
    ├── message.ts
    └── ...
```

---

## 十、环境变量

```env
# .env

# Server
NODE_ENV=development
PORT=3000
API_PREFIX=api

# Database
DATABASE_URL=sqlite://./data/polytalk.db

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# AI Providers (按需配置)
ZHIPUAI_API_KEY=your_glm_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_AI_KEY=your_gemini_key

# Default AI Provider
DEFAULT_AI_PROVIDER=glm

# TTS (火山引擎)
VOLCENGINE_APP_ID=your_app_id
VOLCENGINE_ACCESS_TOKEN=your_access_token
DEFAULT_VOICE=zh_female_shuangkuaisisi

# STT (本地 Whisper)
WHISPER_MODEL=small
```

---

## 十一、API 测试（curl 示例）

### 注册

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "nickname": "测试用户"
  }'
```

### 登录

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'
```

### 创建会话

```bash
curl -X POST http://localhost:3000/api/chat/conversations \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "英语练习",
    "language": "en-US",
    "config": {
      "aiProvider": "glm",
      "temperature": 0.8
    }
  }'
```

### 发送消息

```bash
curl -X POST http://localhost:3000/api/chat/conversations/{convId}/messages \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello, how are you?",
    "contentType": "text"
  }'
```

---

**状态**：✅ API 接口设计完成

**交付物**：
1. ✅ RESTful API 路由设计（6大模块）
2. ✅ WebSocket 事件定义
3. ✅ AI 服务抽象层（Strategy 模式）
4. ✅ 请求/响应示例
5. ✅ NestJS 目录结构
6. ✅ 环境变量配置

**协作事项**：
- 数据库表结构与 API 对应关系已标注（实体名称）
- 请工部确认 Entity 定义与数据库 Schema 一致

—— 兵部 张居正 复命

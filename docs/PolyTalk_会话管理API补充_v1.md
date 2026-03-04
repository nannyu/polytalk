# PolyTalk 会话管理 API 补充 v1
**兵部 张居正** | 2026-03-03 22:05
**状态**：已完成
**圣裁依据**：司礼监 2026-03-03 21:51

---

## 一、路径前缀统一

### 1.1 圣裁方案

**统一前缀**：`/api/v1/`

**理由**：
- RESTful 标准
- 版本化清晰
- 统一管理

### 1.2 路径结构

```
/api/v1/
  ├── /auth/*              ← 认证授权
  ├── /users/*             ← 用户管理
  ├── /conversations/*     ← 会话管理
  ├── /learning/*          ← 学习模块
  ├── /progress/*          ← 进度统计
  ├── /voice/*             ← 语音服务
  ├── /upload/*            ← 文件上传
  └── /ai/*                ← AI服务
```

### 1.3 路径映射（旧 → 新）

| 旧路径 | 新路径 |
|--------|--------|
| `/api/auth/*` | `/api/v1/auth/*` |
| `/api/users/*` | `/api/v1/users/*` |
| `/api/chat/*` | `/api/v1/conversations/*` |
| `/api/learning/*` | `/api/v1/learning/*` |
| `/api/progress/*` | `/api/v1/progress/*` |

---

## 二、会话管理 API 完整清单

### 2.1 API 列表（8个）

| # | 方法 | 路径 | 用途 | 状态 |
|---|------|------|------|------|
| 1 | POST | `/api/v1/conversations` | 创建会话 | ✅ 已有 |
| 2 | GET | `/api/v1/conversations` | 获取会话列表 | ✅ 已有 |
| 3 | GET | `/api/v1/conversations/:id` | 获取会话详情 | ✅ 已有 |
| 4 | PATCH | `/api/v1/conversations/:id` | 更新会话 | ✅ 补充 |
| 5 | DELETE | `/api/v1/conversations/:id` | 删除会话 | ✅ 补充 |
| 6 | POST | `/api/v1/conversations/:id/messages` | 发送消息 | ✅ 已有 |
| 7 | POST | `/api/v1/conversations/:id/messages/stream` | 流式消息 | ✅ 已有 |
| 8 | GET | `/api/v1/conversations/:id/messages` | 获取消息历史 | ✅ 已有 |

**说明**：臣之前设计的 GET/POST/DELETE 已经包含，现补充完善响应格式。

---

## 三、新增/补充的 API

### 3️⃣ GET /api/v1/conversations/:id（已补充）

#### 请求

```http
GET /api/v1/conversations/{conv_id}
Authorization: Bearer {accessToken}
```

#### 成功响应 (200)

```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "user_id": "usr_abc123",
    "course_id": "course-001",
    "title": "英语口语练习",
    "language": "en-US",
    "status": "active",
    "created_at": "2026-03-03T00:00:00Z",
    "updated_at": "2026-03-03T00:10:00Z",
    "message_count": 15,
    "config": {
      "ai_provider": "glm",
      "model_name": "glm-4-flash",
      "temperature": 0.7
    }
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

#### 错误响应 (404)

```json
{
  "success": false,
  "error": {
    "code": "CONVERSATION_NOT_FOUND",
    "message": "会话不存在"
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

#### 错误响应 (403)

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "无权访问此会话"
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

---

### 4️⃣ PATCH /api/v1/conversations/:id（新增）

#### 请求

```http
PATCH /api/v1/conversations/{conv_id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "新标题",
  "status": "archived"
}
```

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 否 | 新标题 |
| status | enum | 否 | active/archived/deleted |

**至少提供一个字段**。

#### 成功响应 (200)

```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "title": "新标题",
    "status": "archived",
    "updated_at": "2026-03-03T01:00:00Z"
  },
  "message": "会话已更新",
  "timestamp": "2026-03-03T22:05:00Z"
}
```

#### 错误响应 (400)

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "至少需要提供一个更新字段",
    "details": {
      "required_fields": ["title", "status"]
    }
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

#### 错误响应 (404)

```json
{
  "success": false,
  "error": {
    "code": "CONVERSATION_NOT_FOUND",
    "message": "会话不存在"
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

---

### 5️⃣ DELETE /api/v1/conversations/:id（补充）

#### 请求

```http
DELETE /api/v1/conversations/{conv_id}
Authorization: Bearer {accessToken}
```

#### 成功响应 (200)

**圣裁要求格式**：

```json
{
  "success": true,
  "data": {
    "id": "conv_xyz789",
    "deleted_at": "2026-03-03T02:00:00Z"
  },
  "message": "会话已删除",
  "timestamp": "2026-03-03T22:05:00Z"
}
```

**说明**：软删除，数据库记录保留，`status` 设置为 `deleted`。

#### 错误响应 (403)

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "无权删除此会话"
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

#### 错误响应 (404)

```json
{
  "success": false,
  "error": {
    "code": "CONVERSATION_NOT_FOUND",
    "message": "会话不存在"
  },
  "timestamp": "2026-03-03T22:05:00Z"
}
```

---

## 四、NestJS Controller 实现

```typescript
// src/modules/conversations/conversations.controller.ts

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('conversations')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}
  
  @Post()
  @ApiOperation({ summary: '创建会话', description: '创建新的对话会话' })
  @ApiResponse({ status: 201, description: '会话创建成功' })
  async create(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateConversationDto,
  ) {
    return this.conversationsService.create(userId, dto);
  }
  
  @Get()
  @ApiOperation({ summary: '获取会话列表', description: '分页查询当前用户的所有会话' })
  @ApiResponse({ status: 200, description: '会话列表' })
  async findAll(
    @CurrentUser('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query('status') status?: 'active' | 'archived' | 'deleted',
  ) {
    return this.conversationsService.findAll(userId, pagination, status);
  }
  
  @Get(':id')
  @ApiOperation({ summary: '获取会话详情', description: '返回会话完整信息' })
  @ApiParam({ name: 'id', description: '会话 ID' })
  @ApiResponse({ status: 200, description: '会话详情' })
  @ApiResponse({ status: 404, description: '会话不存在' })
  async findOne(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
  ) {
    return this.conversationsService.findOne(userId, convId);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: '更新会话', description: '更新会话标题或状态' })
  @ApiParam({ name: 'id', description: '会话 ID' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @ApiResponse({ status: 404, description: '会话不存在' })
  async update(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
    @Body() dto: UpdateConversationDto,
  ) {
    return this.conversationsService.update(userId, convId, dto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: '删除会话', description: '软删除会话' })
  @ApiParam({ name: 'id', description: '会话 ID' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @ApiResponse({ status: 403, description: '无权限' })
  @ApiResponse({ status: 404, description: '会话不存在' })
  async remove(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
  ) {
    return this.conversationsService.remove(userId, convId);
  }
  
  @Get(':id/messages')
  @ApiOperation({ summary: '获取消息历史', description: '分页查询会话的消息历史' })
  @ApiParam({ name: 'id', description: '会话 ID' })
  @ApiResponse({ status: 200, description: '消息列表' })
  async getMessages(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    return this.conversationsService.getMessages(userId, convId, { cursor, limit });
  }
  
  @Post(':id/messages')
  @ApiOperation({ summary: '发送消息', description: '向会话发送消息并获取AI回复' })
  @ApiParam({ name: 'id', description: '会话 ID' })
  @ApiResponse({ status: 200, description: '消息已发送' })
  async sendMessage(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.conversationsService.sendMessage(userId, convId, dto);
  }
}
```

---

## 五、Service 实现

```typescript
// src/modules/conversations/conversations.service.ts

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private readonly prisma: PrismaService) {}
  
  async findOne(userId: string, convId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: convId },
      include: {
        config: true,
        _count: {
          select: { messages: true },
        },
      },
    });
    
    if (!conversation) {
      throw new NotFoundException('会话不存在');
    }
    
    // 权限检查
    if (conversation.userId !== userId) {
      throw new ForbiddenException('无权访问此会话');
    }
    
    return {
      id: conversation.id,
      user_id: conversation.userId,
      course_id: conversation.courseId,
      title: conversation.title,
      language: conversation.language,
      status: conversation.status,
      created_at: conversation.createdAt,
      updated_at: conversation.updatedAt,
      message_count: conversation._count.messages,
      config: conversation.config,
    };
  }
  
  async update(userId: string, convId: string, dto: UpdateConversationDto) {
    // 检查会话是否存在及权限
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: convId },
    });
    
    if (!conversation) {
      throw new NotFoundException('会话不存在');
    }
    
    if (conversation.userId !== userId) {
      throw new ForbiddenException('无权更新此会话');
    }
    
    // 更新会话
    const updated = await this.prisma.conversation.update({
      where: { id: convId },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.status && { status: dto.status }),
        updatedAt: new Date(),
      },
    });
    
    return {
      id: updated.id,
      title: updated.title,
      status: updated.status,
      updated_at: updated.updatedAt,
    };
  }
  
  async remove(userId: string, convId: string) {
    // 检查会话是否存在及权限
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: convId },
    });
    
    if (!conversation) {
      throw new NotFoundException('会话不存在');
    }
    
    if (conversation.userId !== userId) {
      throw new ForbiddenException('无权删除此会话');
    }
    
    // 软删除
    const deleted = await this.prisma.conversation.update({
      where: { id: convId },
      data: {
        status: 'deleted',
        archivedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    return {
      id: deleted.id,
      deleted_at: deleted.archivedAt,
    };
  }
}
```

---

## 六、DTO 定义

```typescript
// src/modules/conversations/dto/update-conversation.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, MinLength, MaxLength } from 'class-validator';

export class UpdateConversationDto {
  @ApiPropertyOptional({
    description: '会话标题',
    example: '英语口语练习',
    minLength: 1,
    maxLength: 200,
  })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title?: string;
  
  @ApiPropertyOptional({
    description: '会话状态',
    enum: ['active', 'archived', 'deleted'],
    example: 'archived',
  })
  @IsOptional()
  @IsEnum(['active', 'archived', 'deleted'])
  status?: 'active' | 'archived' | 'deleted';
}
```

---

## 七、Swagger 文档

```typescript
// 完整的 Swagger 装饰器示例

@Get(':id')
@ApiOperation({
  summary: '获取会话详情',
  description: '返回会话的完整信息，包括配置和消息计数',
})
@ApiParam({
  name: 'id',
  type: String,
  description: '会话 ID',
  example: 'conv_xyz789',
})
@ApiResponse({
  status: 200,
  description: '会话详情',
  schema: {
    example: {
      success: true,
      data: {
        id: 'conv_xyz789',
        user_id: 'usr_abc123',
        course_id: 'course-001',
        title: '英语口语练习',
        language: 'en-US',
        status: 'active',
        created_at: '2026-03-03T00:00:00Z',
        updated_at: '2026-03-03T00:10:00Z',
        message_count: 15,
        config: {
          ai_provider: 'glm',
          model_name: 'glm-4-flash',
          temperature: 0.7,
        },
      },
      timestamp: '2026-03-03T22:05:00Z',
    },
  },
})
@ApiResponse({
  status: 404,
  description: '会话不存在',
  schema: {
    example: {
      success: false,
      error: {
        code: 'CONVERSATION_NOT_FOUND',
        message: '会话不存在',
      },
      timestamp: '2026-03-03T22:05:00Z',
    },
  },
})
async findOne(@Param('id') id: string) {
  // ...
}
```

---

## 八、测试用例

```typescript
// test/conversations.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Conversations API (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let convId: string;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
    
    // 登录获取 token
    const loginRes = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'test123' });
    
    token = loginRes.body.data.tokens.accessToken;
  });
  
  describe('GET /api/v1/conversations/:id', () => {
    it('should return conversation details', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/conversations/${convId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(convId);
      expect(res.body.data.message_count).toBeDefined();
    });
    
    it('should return 404 for non-existent conversation', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/conversations/non-existent')
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
  
  describe('PATCH /api/v1/conversations/:id', () => {
    it('should update conversation title', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/conversations/${convId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: '新标题' })
        .expect(200);
      
      expect(res.body.data.title).toBe('新标题');
      expect(res.body.data.updated_at).toBeDefined();
    });
    
    it('should update conversation status to archived', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/conversations/${convId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: 'archived' })
        .expect(200);
      
      expect(res.body.data.status).toBe('archived');
    });
    
    it('should return 400 if no fields provided', async () => {
      await request(app.getHttpServer())
        .patch(`/api/v1/conversations/${convId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .expect(400);
    });
  });
  
  describe('DELETE /api/v1/conversations/:id', () => {
    it('should soft delete conversation', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/api/v1/conversations/${convId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      
      expect(res.body.data.id).toBe(convId);
      expect(res.body.data.deleted_at).toBeDefined();
    });
  });
});
```

---

## 九、总结

### 9.1 已完成

✅ **路径前缀统一**：`/api/v1/`
✅ **会话管理 API 完整**：8个接口全部就绪

### 9.2 API 状态

| # | 方法 | 路径 | 状态 |
|---|------|------|------|
| 1 | POST | `/api/v1/conversations` | ✅ 已有 |
| 2 | GET | `/api/v1/conversations` | ✅ 已有 |
| 3 | GET | `/api/v1/conversations/:id` | ✅ 补充完成 |
| 4 | PATCH | `/api/v1/conversations/:id` | ✅ 补充完成 |
| 5 | DELETE | `/api/v1/conversations/:id` | ✅ 补充完成 |
| 6 | POST | `/api/v1/conversations/:id/messages` | ✅ 已有 |
| 7 | POST | `/api/v1/conversations/:id/messages/stream` | ✅ 已有 |
| 8 | GET | `/api/v1/conversations/:id/messages` | ✅ 已有 |

### 9.3 交付时间

- 完成：2026-03-03 22:10
- 截止：2026-03-04 12:00
- 提前：13小时50分钟

---

**状态**：✅ 会话管理 API 补充完成

**交付物**：
- 3个新增/补充API（GET/PATCH/DELETE）
- 路径前缀统一方案
- Controller + Service + DTO
- Swagger文档装饰器
- E2E测试用例

—— 兵部 张居正
2026-03-03 22:10

# PolyTalk Swagger 文档规范 v1
**兵部 张居正** | 2026-03-03 18:07
**状态**：已完成

---

## 一、Swagger 集成方案

### 1.1 依赖安装

```bash
npm install @nestjs/swagger swagger-ui-express
```

### 1.2 主配置

```typescript
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('PolyTalk API')
    .setDescription('多语言学习智能代理 API 文档')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: '请输入 JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', '认证授权')
    .addTag('users', '用户管理')
    .addTag('learning', '学习模块')
    .addTag('chat', '对话模块')
    .addTag('progress', '进度统计')
    .addTag('ai', 'AI服务')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { font-size: 28px }
    `,
    customSiteTitle: 'PolyTalk API Docs',
  });
  
  await app.listen(3000);
  console.log('📚 API Docs: http://localhost:3000/api/docs');
}
bootstrap();
```

---

## 二、通用 DTO 装饰器

### 2.1 分页查询

```typescript
// src/common/dto/pagination.dto.ts

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional({
    description: '页码（从1开始）',
    default: 1,
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;
  
  @ApiPropertyOptional({
    description: '每页数量',
    default: 20,
    minimum: 1,
    maximum: 100,
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
  
  @ApiPropertyOptional({
    description: '游标（用于游标分页）',
    example: '2026-03-03T10:00:00Z',
  })
  @IsOptional()
  @IsString()
  cursor?: string;
}
```

### 2.2 通用响应

```typescript
// src/common/dto/response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;
  
  @ApiProperty({ description: '响应数据' })
  data: T;
  
  @ApiProperty({ example: '操作成功', required: false })
  message?: string;
  
  @ApiProperty({ example: '2026-03-03T18:07:00Z' })
  timestamp: string;
}

export class ErrorResponseDto {
  @ApiProperty({ example: false })
  success: boolean;
  
  @ApiProperty({
    example: {
      code: 'VALIDATION_ERROR',
      message: '请求参数错误',
      details: {},
    },
  })
  error: {
    code: string;
    message: string;
    details?: any;
  };
  
  @ApiProperty({ example: '2026-03-03T18:07:00Z' })
  timestamp: string;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  page: number;
  
  @ApiProperty({ example: 20 })
  limit: number;
  
  @ApiProperty({ example: 100 })
  total: number;
  
  @ApiProperty({ example: 5 })
  totalPages: number;
  
  @ApiProperty({ example: true })
  hasNext: boolean;
}

export class PaginatedResponseDto<T> extends SuccessResponseDto<T[]> {
  @ApiProperty({ type: PaginationMetaDto })
  pagination: PaginationMetaDto;
}
```

---

## 三、Auth 模块 Swagger

### 3.1 DTO

```typescript
// src/modules/auth/dto/register.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: '邮箱地址',
    example: 'user@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: '密码（8-32位，需包含字母和数字）',
    example: 'SecurePass123!',
    minLength: 8,
    maxLength: 32,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;
  
  @ApiProperty({
    description: '昵称',
    example: '学习者小明',
    minLength: 2,
    maxLength: 20,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  nickname: string;
  
  @ApiPropertyOptional({
    description: '默认语言',
    example: 'zh-CN',
    default: 'zh-CN',
  })
  @IsOptional()
  @IsString()
  language?: string;
}

export class LoginDto {
  @ApiProperty({
    description: '邮箱地址',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
  
  @ApiProperty({
    description: '密码',
    example: 'SecurePass123!',
  })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: '刷新令牌',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}
```

### 3.2 Response DTO

```typescript
// src/modules/auth/dto/auth-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

class UserDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;
  
  @ApiProperty({ example: 'user@example.com' })
  email: string;
  
  @ApiProperty({ example: '学习者小明' })
  nickname: string;
  
  @ApiProperty({ example: 'https://cdn.example.com/avatars/default.png', required: false })
  avatar?: string;
  
  @ApiProperty({ example: 'free', enum: ['free', 'basic', 'pro'] })
  tier: string;
  
  @ApiProperty({ example: '2026-03-03T18:07:00Z' })
  createdAt: Date;
}

class TokensDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
  
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
  
  @ApiProperty({ example: 3600, description: '过期时间（秒）' })
  expiresIn: number;
}

export class AuthResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;
  
  @ApiProperty({ type: TokensDto })
  tokens: TokensDto;
}

export class RefreshResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
  
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  refreshToken: string;
  
  @ApiProperty({ example: 3600 })
  expiresIn: number;
}
```

### 3.3 Controller

```typescript
// src/modules/auth/auth.controller.ts

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/register.dto';
import { AuthResponseDto, RefreshResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('register')
  @ApiOperation({ summary: '用户注册', description: '创建新用户账户并返回认证令牌' })
  @ApiResponse({
    status: 201,
    description: '注册成功',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: '邮箱已被注册',
    schema: {
      example: {
        success: false,
        error: { code: 'EMAIL_EXISTS', message: '该邮箱已被注册' },
        timestamp: '2026-03-03T18:07:00Z',
      },
    },
  })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '用户登录', description: '使用邮箱密码登录，获取认证令牌' })
  @ApiResponse({
    status: 200,
    description: '登录成功',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '邮箱或密码错误',
    schema: {
      example: {
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: '邮箱或密码错误' },
        timestamp: '2026-03-03T18:07:00Z',
      },
    },
  })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '刷新令牌', description: '使用刷新令牌获取新的访问令牌' })
  @ApiResponse({
    status: 200,
    description: '刷新成功',
    type: RefreshResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '刷新令牌无效或已过期',
  })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }
  
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: '用户登出', description: '注销当前会话' })
  @ApiResponse({
    status: 204,
    description: '登出成功（无返回体）',
  })
  @ApiBearerAuth('JWT-auth')
  async logout() {
    // JWT 无状态，服务端无需处理
  }
}
```

---

## 四、Users 模块 Swagger

```typescript
// src/modules/users/users.controller.ts

import { Controller, Get, Patch, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdateSettingsDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('me')
  @ApiOperation({ summary: '获取当前用户信息', description: '返回当前登录用户的完整信息' })
  @ApiResponse({
    status: 200,
    description: '用户信息',
    schema: {
      example: {
        success: true,
        data: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          email: 'user@example.com',
          nickname: '学习者小明',
          tier: 'pro',
          stats: {
            totalConversations: 42,
            totalMessages: 1024,
          },
        },
        timestamp: '2026-03-03T18:07:00Z',
      },
    },
  })
  async getMe(@CurrentUser('userId') userId: string) {
    return this.usersService.findById(userId);
  }
  
  @Patch('me')
  @ApiOperation({ summary: '更新用户信息', description: '部分更新用户资料' })
  @ApiResponse({
    status: 200,
    description: '更新成功',
  })
  async updateMe(
    @CurrentUser('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, dto);
  }
  
  @Put('me/settings')
  @ApiOperation({ summary: '更新用户设置', description: '完全替换用户偏好设置' })
  @ApiResponse({
    status: 200,
    description: '设置已保存',
  })
  async updateSettings(
    @CurrentUser('userId') userId: string,
    @Body() dto: UpdateSettingsDto,
  ) {
    return this.usersService.updateSettings(userId, dto);
  }
}
```

---

## 五、Chat 模块 Swagger

### 5.1 DTO

```typescript
// src/modules/chat/dto/create-conversation.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';

class ConversationConfigDto {
  @ApiPropertyOptional({
    description: 'AI 供应商',
    enum: ['glm', 'openai', 'claude', 'gemini', 'ernie', 'qwen'],
    example: 'glm',
  })
  @IsOptional()
  @IsEnum(['glm', 'openai', 'claude', 'gemini', 'ernie', 'qwen'])
  aiProvider?: string;
  
  @ApiPropertyOptional({
    description: '模型名称',
    example: 'glm-4-flash',
  })
  @IsOptional()
  @IsString()
  modelName?: string;
  
  @ApiPropertyOptional({
    description: 'TTS 音色',
    example: 'zh_female_shuangkuaisisi',
  })
  @IsOptional()
  @IsString()
  voiceType?: string;
  
  @ApiPropertyOptional({
    description: '温度参数（0-2）',
    example: 0.8,
    minimum: 0,
    maximum: 2,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;
  
  @ApiPropertyOptional({
    description: '系统提示词',
    example: '你是一位英语外教...',
  })
  @IsOptional()
  @IsString()
  systemPrompt?: string;
}

export class CreateConversationDto {
  @ApiPropertyOptional({
    description: '会话标题',
    example: '英语口语练习',
  })
  @IsOptional()
  @IsString()
  title?: string;
  
  @ApiProperty({
    description: '会话语言',
    example: 'en-US',
  })
  @IsString()
  language: string;
  
  @ApiPropertyOptional({
    description: '会话配置',
    type: ConversationConfigDto,
  })
  @IsOptional()
  config?: ConversationConfigDto;
}

export class SendMessageDto {
  @ApiProperty({
    description: '消息内容',
    example: 'How do I introduce myself in English?',
  })
  @IsString()
  content: string;
  
  @ApiPropertyOptional({
    description: '内容类型',
    enum: ['text', 'audio'],
    default: 'text',
  })
  @IsOptional()
  @IsEnum(['text', 'audio'])
  contentType?: 'text' | 'audio';
  
  @ApiPropertyOptional({
    description: '音频数据（Base64编码）',
    example: 'base64_encoded_audio_data',
  })
  @IsOptional()
  @IsString()
  audioData?: string;
}
```

### 5.2 Controller

```typescript
// src/modules/chat/chat.controller.ts

import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ChatService } from './chat.service';
import { CreateConversationDto, SendMessageDto } from './dto/create-conversation.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('chat')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  
  @Get('conversations')
  @ApiOperation({ summary: '获取会话列表', description: '分页查询当前用户的所有会话' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 20 })
  @ApiQuery({ name: 'status', required: false, enum: ['active', 'archived'] })
  @ApiResponse({
    status: 200,
    description: '会话列表',
  })
  async listConversations(
    @CurrentUser('userId') userId: string,
    @Query() pagination: PaginationDto,
    @Query('status') status?: 'active' | 'archived',
  ) {
    return this.chatService.listConversations(userId, pagination, status);
  }
  
  @Post('conversations')
  @ApiOperation({ summary: '创建会话', description: '创建新的对话会话' })
  @ApiResponse({
    status: 201,
    description: '会话创建成功',
  })
  async createConversation(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateConversationDto,
  ) {
    return this.chatService.createConversation(userId, dto);
  }
  
  @Get('conversations/:id')
  @ApiOperation({ summary: '获取会话详情', description: '返回会话配置及消息历史' })
  @ApiQuery({ name: 'cursor', required: false, description: '分页游标' })
  @ApiQuery({ name: 'limit', required: false, example: 50 })
  @ApiResponse({
    status: 200,
    description: '会话详情',
  })
  @ApiResponse({
    status: 404,
    description: '会话不存在',
  })
  async getConversation(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
    @Query('cursor') cursor?: string,
    @Query('limit') limit?: number,
  ) {
    return this.chatService.getConversation(userId, convId, { cursor, limit });
  }
  
  @Post('conversations/:id/messages')
  @ApiOperation({ summary: '发送消息', description: '向会话发送消息并获取AI回复' })
  @ApiResponse({
    status: 200,
    description: '消息已发送，包含AI回复',
    schema: {
      example: {
        success: true,
        data: {
          userMessage: {
            id: 'msg-004',
            role: 'user',
            content: 'How do I introduce myself?',
          },
          assistantMessage: {
            id: 'msg-005',
            role: 'assistant',
            content: 'Great question! Here\'s how...',
            provider: 'glm',
            latencyMs: 380,
          },
        },
      },
    },
  })
  async sendMessage(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(userId, convId, dto);
  }
  
  @Delete('conversations/:id')
  @ApiOperation({ summary: '删除会话', description: '删除指定会话及其所有消息' })
  @ApiResponse({
    status: 204,
    description: '删除成功（无返回体）',
  })
  async deleteConversation(
    @CurrentUser('userId') userId: string,
    @Param('id') convId: string,
  ) {
    return this.chatService.deleteConversation(userId, convId);
  }
}
```

---

## 六、AI 模块 Swagger

```typescript
// src/modules/ai/ai.controller.ts

import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AIService } from './ai.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@ApiTags('ai')
@Controller('ai')
export class AIController {
  constructor(private readonly aiService: AIService) {}
  
  @Post('chat')
  @ApiOperation({ summary: 'AI 对话', description: '向 AI 发送对话请求' })
  @ApiResponse({
    status: 200,
    description: 'AI 回复',
    schema: {
      example: {
        id: 'glm-1234567890-abc123',
        content: 'Hello! How can I help you learn English today?',
        model: 'glm-4-flash',
        provider: 'glm',
        usage: {
          promptTokens: 15,
          completionTokens: 12,
          totalTokens: 27,
        },
        latencyMs: 320,
      },
    },
  })
  async chat(@Body() dto: ChatRequestDto) {
    return this.aiService.chat(dto.toRequest(), dto.provider);
  }
  
  @Get('providers')
  @ApiOperation({ summary: '获取可用供应商', description: '返回所有已配置的 AI 供应商及其状态' })
  @ApiResponse({
    status: 200,
    description: '供应商列表',
    schema: {
      example: {
        success: true,
        data: [
          { type: 'glm', name: '智谱 GLM', available: true },
          { type: 'openai', name: 'OpenAI', available: true },
          { type: 'claude', name: 'Claude', available: false },
        ],
      },
    },
  })
  async listProviders() {
    return this.aiService.listProviders();
  }
}
```

---

## 七、Progress 模块 Swagger

```typescript
// src/modules/progress/progress.controller.ts

import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ProgressService } from './progress.service';

@ApiTags('progress')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}
  
  @Get('overview')
  @ApiOperation({ summary: '学习统计概览', description: '返回用户整体学习统计数据' })
  @ApiResponse({
    status: 200,
    description: '统计概览',
    schema: {
      example: {
        success: true,
        data: {
          totalConversations: 42,
          totalMessages: 1024,
          learningDays: 15,
          streakDays: 7,
          languages: [
            { language: 'en-US', conversations: 30, hours: 12.5 },
          ],
        },
      },
    },
  })
  async getOverview(@CurrentUser('userId') userId: string) {
    return this.progressService.getOverview(userId);
  }
  
  @Get('courses')
  @ApiOperation({ summary: '课程进度', description: '返回所有已报名课程的进度' })
  async getCoursesProgress(@CurrentUser('userId') userId: string) {
    return this.progressService.getCoursesProgress(userId);
  }
  
  @Get('history')
  @ApiOperation({ summary: '学习历史', description: '按日期返回学习记录' })
  @ApiQuery({ name: 'startDate', required: false, example: '2026-02-01' })
  @ApiQuery({ name: 'endDate', required: false, example: '2026-03-03' })
  async getHistory(
    @CurrentUser('userId') userId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.progressService.getHistory(userId, startDate, endDate);
  }
}
```

---

## 八、装饰器参考

### 8.1 常用装饰器

| 装饰器 | 用途 | 示例 |
|--------|------|------|
| `@ApiTags()` | 分组 | `@ApiTags('auth')` |
| `@ApiOperation()` | 接口说明 | `@ApiOperation({ summary: '登录' })` |
| `@ApiResponse()` | 响应说明 | `@ApiResponse({ status: 200, type: UserDto })` |
| `@ApiBearerAuth()` | Bearer 认证 | `@ApiBearerAuth('JWT-auth')` |
| `@ApiProperty()` | 属性说明 | `@ApiProperty({ example: 'user@example.com' })` |
| `@ApiPropertyOptional()` | 可选属性 | `@ApiPropertyOptional({ default: 'zh-CN' })` |
| `@ApiQuery()` | 查询参数 | `@ApiQuery({ name: 'page', required: false })` |
| `@ApiParam()` | 路径参数 | `@ApiParam({ name: 'id', type: String })` |
| `@ApiBody()` | 请求体 | `@ApiBody({ type: LoginDto })` |
| `@ApiExcludeEndpoint()` | 隐藏接口 | `@ApiExcludeEndpoint()` |

### 8.2 自定义装饰器

```typescript
// src/common/decorators/api-response.decorator.ts

import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export function ApiResponse<T>(type: Type<T>) {
  return applyDecorators(
    ApiOkResponse({ type }),
    ApiBadRequestResponse({
      schema: {
        example: {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: '请求参数错误' },
        },
      },
    }),
  );
}

export function ApiAuthResponse<T>(type: Type<T>) {
  return applyDecorators(
    ApiResponse(type),
    ApiUnauthorizedResponse({
      schema: {
        example: {
          success: false,
          error: { code: 'UNAUTHORIZED', message: '未认证' },
        },
      },
    }),
  );
}
```

---

## 九、OpenAPI JSON 导出

```typescript
// 导出为 JSON 文件
// 访问 http://localhost:3000/api/docs-json

// 或在代码中导出
const document = SwaggerModule.createDocument(app, config);
fs.writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
```

---

## 十、访问方式

- **Swagger UI**: http://localhost:3000/api/docs
- **OpenAPI JSON**: http://localhost:3000/api/docs-json
- **OpenAPI YAML**: http://localhost:3000/api/docs-yaml

---

## 十一、Postman 导入

1. 访问 `http://localhost:3000/api/docs-json`
2. 复制 JSON
3. Postman → Import → Raw text → 粘贴
4. 自动生成 Collection

---

## 十二、前端类型生成

```bash
# 安装工具
npm install -D openapi-typescript

# 生成类型
npx openapi-typescript http://localhost:3000/api/docs-json -o src/types/api.ts
```

生成的类型文件：

```typescript
// src/types/api.ts

export interface paths {
  '/api/auth/register': {
    post: {
      requestBody: {
        content: {
          'application/json': components['schemas']['RegisterDto'];
        };
      };
      responses: {
        201: {
          content: {
            'application/json': components['schemas']['AuthResponseDto'];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    RegisterDto: {
      email: string;
      password: string;
      nickname: string;
      language?: string;
    };
    AuthResponseDto: {
      user: components['schemas']['UserDto'];
      tokens: components['schemas']['TokensDto'];
    };
  };
}
```

---

**状态**：✅ Swagger 文档规范完成

**下一步**：工部集成到 NestJS 项目

—— 兵部 张居正

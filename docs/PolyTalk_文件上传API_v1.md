# PolyTalk 文件上传 API 设计 v1
**兵部 张居正** | 2026-03-03 21:50
**状态**：已完成

---

## 一、API 概览

### 1.1 接口列表

| 方法 | 路径 | 说明 | 限流 |
|------|------|------|------|
| POST | `/api/v1/upload/audio` | 上传语音文件 | 30次/分钟 |
| POST | `/api/v1/upload/image` | 上传图片文件 | 30次/分钟 |
| GET | `/api/v1/files/:id` | 获取文件信息 | 100次/分钟 |
| DELETE | `/api/v1/files/:id` | 删除文件 | 10次/分钟 |

### 1.2 文件限制

| 类型 | 支持格式 | 大小限制 | 特殊处理 |
|------|---------|---------|---------|
| 音频 | webm, mp3, wav, m4a, ogg | 10MB | 自动提取时长 |
| 图片 | jpeg, png, webp, gif | 5MB | 自动生成缩略图 |

---

## 二、上传音频文件

### 2.1 请求

```http
POST /api/v1/upload/audio
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

file: <audio_file>
conversationId: conv-001 (optional)
```

**参数说明**：
- `file`: 音频文件（multipart/form-data）
- `conversationId`: 可选，关联会话ID

### 2.2 成功响应 (201)

```json
{
  "success": true,
  "data": {
    "id": "file-123",
    "filename": "recording-1709500000000.webm",
    "mimeType": "audio/webm",
    "size": 102400,
    "duration": 15,
    "url": "https://cdn.example.com/audio/file-123.webm",
    "conversationId": "conv-001",
    "createdAt": "2026-03-03T21:50:00Z"
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

### 2.3 错误响应

**413 - 文件过大**：
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "文件大小超过限制（最大 10MB）",
    "details": {
      "maxSize": "10MB",
      "actualSize": "15MB"
    }
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

**415 - 不支持的格式**：
```json
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_FILE_TYPE",
    "message": "不支持的文件类型",
    "details": {
      "supportedTypes": ["audio/webm", "audio/mp3", "audio/wav"],
      "actualType": "video/mp4"
    }
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

---

## 三、上传图片文件

### 3.1 请求

```http
POST /api/v1/upload/image
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

file: <image_file>
type: avatar (optional, default: general)
```

**参数说明**：
- `file`: 图片文件（multipart/form-data）
- `type`: 图片类型（avatar/cover/general）

### 3.2 成功响应 (201)

```json
{
  "success": true,
  "data": {
    "id": "file-456",
    "filename": "image-1709500000000.jpg",
    "mimeType": "image/jpeg",
    "size": 51200,
    "width": 800,
    "height": 600,
    "url": "https://cdn.example.com/images/file-456.jpg",
    "thumbnailUrl": "https://cdn.example.com/images/file-456-thumb.jpg",
    "type": "avatar",
    "createdAt": "2026-03-03T21:50:00Z"
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

---

## 四、获取文件信息
### 4.1 请求

```http
GET /api/v1/files/:id
Authorization: Bearer {accessToken}
```

### 4.2 成功响应 (200)

```json
{
  "success": true,
  "data": {
    "id": "file-123",
    "filename": "recording-1709500000000.webm",
    "mimeType": "audio/webm",
    "size": 102400,
    "url": "https://cdn.example.com/audio/file-123.webm",
    "uploadedBy": "user-001",
    "conversationId": "conv-001",
    "duration": 15,
    "createdAt": "2026-03-03T21:50:00Z"
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

### 4.3 错误响应 (404)

```json
{
  "success": false,
  "error": {
    "code": "FILE_NOT_FOUND",
    "message": "文件不存在"
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

---

## 五、删除文件
### 5.1 请求

```http
DELETE /api/v1/files/:id
Authorization: Bearer {accessToken}
```

### 5.2 成功响应 (204)

无返回体

### 5.3 错误响应 (403)

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "无权删除此文件"
  },
  "timestamp": "2026-03-03T21:50:00Z"
}
```

---

## 六、Controller 实现
```typescript
// src/modules/upload/upload.controller.ts

import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadAudioDto, UploadImageDto } from './dto/upload.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('upload')
@ApiBearerAuth('JWT-auth')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @Post('audio')
  @ApiOperation({ summary: '上传语音文件' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: '上传成功' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['audio/webm', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/ogg'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Unsupported file type'), false);
        }
      },
    }),
  )
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadAudioDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.uploadService.uploadAudio(file, userId, dto.conversationId);
  }
  
  @Post('image')
  @ApiOperation({ summary: '上传图片文件' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: '上传成功' })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Unsupported file type'), false);
        }
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadImageDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.uploadService.uploadImage(file, userId, dto.type);
  }
  
  @Get('files/:id')
  @ApiOperation({ summary: '获取文件信息' })
  @ApiResponse({ status: 200, description: '文件信息' })
  @ApiResponse({ status: 404, description: '文件不存在' })
  async getFile(
    @Param('id') fileId: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.uploadService.getFile(fileId, userId);
  }
  
  @Delete('files/:id')
  @ApiOperation({ summary: '删除文件' })
  @ApiResponse({ status: 204, description: '删除成功' })
  @ApiResponse({ status: 403, description: '无权限' })
  async deleteFile(
    @Param('id') fileId: string,
    @CurrentUser('userId') userId: string,
  ) {
    return this.uploadService.deleteFile(fileId, userId);
  }
}
```

---

## 七、Service 实现
```typescript
// src/modules/upload/upload.service.ts

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/services/prisma.service';
import { StorageService } from './storage/storage.service';
import { AudioProcessorService } from './processors/audio-processor.service';
import { ImageProcessorService } from './processors/image-processor.service';
import * as crypto from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly audioProcessor: AudioProcessorService,
    private readonly imageProcessor: ImageProcessorService,
  ) {}
  
  async uploadAudio(
    file: Express.Multer.File,
    userId: string,
    conversationId?: string,
  ) {
    // 生成文件名
    const fileId = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    const filename = `audio-${Date.now()}${ext}`;
    
    // 获取音频时长
    const duration = await this.audioProcessor.getDuration(file.buffer);
    
    // 上传到存储
    const url = await this.storage.upload(
      `audio/${filename}`,
      file.buffer,
      file.mimetype,
    );
    
    // 保存到数据库
    const fileRecord = await this.prisma.file.create({
      data: {
        id: fileId,
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
        type: 'audio',
        category: 'recording',
        uploadedBy: userId,
        conversationId,
        metadata: { duration },
      },
    });
    
    return {
      id: fileRecord.id,
      filename: fileRecord.filename,
      mimeType: fileRecord.mimeType,
      size: fileRecord.size,
      duration,
      url: fileRecord.url,
      conversationId: fileRecord.conversationId,
      createdAt: fileRecord.createdAt,
    };
  }
  
  async uploadImage(
    file: Express.Multer.File,
    userId: string,
    type: 'avatar' | 'cover' | 'general' = 'general',
  ) {
    const fileId = crypto.randomUUID();
    const ext = path.extname(file.originalname);
    const filename = `image-${Date.now()}${ext}`;
    
    // 处理图片（压缩、缩略图）
    const { processed, thumbnail, width, height } = await this.imageProcessor.process(file.buffer);
    
    // 上传原图和缩略图
    const [url, thumbnailUrl] = await Promise.all([
      this.storage.upload(`images/${filename}`, processed, file.mimetype),
      thumbnail
        ? this.storage.upload(`images/${filename.replace(ext, `-thumb${ext}`)}`, thumbnail, file.mimetype)
        : Promise.resolve(null),
    ]);
    
    // 保存到数据库
    const fileRecord = await this.prisma.file.create({
      data: {
        id: fileId,
        filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        url,
        thumbnailUrl,
        type: 'image',
        category: type,
        uploadedBy: userId,
        metadata: { width, height },
      },
    });
    
    return {
      id: fileRecord.id,
      filename: fileRecord.filename,
      mimeType: fileRecord.mimeType,
      size: fileRecord.size,
      width,
      height,
      url: fileRecord.url,
      thumbnailUrl: fileRecord.thumbnailUrl,
      type: fileRecord.category,
      createdAt: fileRecord.createdAt,
    };
  }
  
  async getFile(fileId: string, userId: string) {
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
    });
    
    if (!file) {
      throw new NotFoundException('文件不存在');
    }
    
    return {
      id: file.id,
      filename: file.filename,
      mimeType: file.mimeType,
      size: file.size,
      url: file.url,
      uploadedBy: file.uploadedBy,
      conversationId: file.conversationId,
      duration: file.metadata?.duration,
      createdAt: file.createdAt,
    };
  }
  
  async deleteFile(fileId: string, userId: string) {
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
    });
    
    if (!file) {
      throw new NotFoundException('文件不存在');
    }
    
    // 权限检查：只能删除自己上传的文件
    if (file.uploadedBy !== userId) {
      throw new ForbiddenException('无权删除此文件');
    }
    
    // 删除存储文件
    await this.storage.delete(file.filename);
    
    // 删除数据库记录
    await this.prisma.file.delete({
      where: { id: fileId },
    });
  }
}
```

---

## 八、文件处理
### 8.1 音频处理器
```typescript
// src/modules/upload/processors/audio-processor.service.ts

import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

@Injectable()
export class AudioProcessorService {
  async getDuration(buffer: Buffer): Promise<number> {
    return new Promise((resolve, reject) => {
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);
      
      ffmpeg(stream)
        .ffprobe((err, data) => {
          if (err) reject(err);
          else resolve(data.format.duration || 0);
        });
    });
  }
  
  async convertToWav(input: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const stream = new Readable();
      stream.push(input);
      stream.push(null);
      
      const chunks: Buffer[] = [];
      
      ffmpeg(stream)
        .toFormat('wav')
        .on('error', reject)
        .on('end', () => resolve(Buffer.concat(chunks)))
        .pipe()
        .on('data', (chunk) => chunks.push(chunk));
    });
  }
}
```

### 8.2 图片处理器
```typescript
// src/modules/upload/processors/image-processor.service.ts

import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessorService {
  async process(
    buffer: Buffer,
  ): Promise<{
    processed: Buffer;
    thumbnail: Buffer | null;
    width: number;
    height: number;
  }> {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    // 压缩
    const processed = await image
      .jpeg({ quality: 85 })
      .toBuffer();
    
    // 生成缩略图
    const thumbnail = await sharp(buffer)
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();
    
    return {
      processed,
      thumbnail,
      width: metadata.width || 0,
      height: metadata.height || 0,
    };
  }
}
```

---

## 九、存储服务
### 9.1 本地存储
```typescript
// src/modules/upload/storage/local-storage.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LocalStorageService {
  private readonly uploadDir: string;
  
  constructor(private readonly config: ConfigService) {
    this.uploadDir = this.config.get('UPLOAD_DIR') || './uploads';
  }
  
  async upload(key: string, data: Buffer, mimeType: string): Promise<string> {
    const filePath = path.join(this.uploadDir, key);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, data);
    return `/uploads/${key}`;
  }
  
  async delete(key: string): Promise<void> {
    const filePath = path.join(this.uploadDir, key);
    await fs.unlink(filePath);
  }
}
```

### 9.2 阿里云 OSS
```typescript
// src/modules/upload/storage/oss-storage.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';

@Injectable()
export class OSSStorageService {
  private readonly client: OSS;
  private readonly bucket: string;
  private readonly cdnDomain?: string;
  
  constructor(private readonly config: ConfigService) {
    this.client = new OSS({
      region: config.get('OSS_REGION'),
      accessKeyId: config.get('OSS_ACCESS_KEY_ID'),
      accessKeySecret: config.get('OSS_ACCESS_KEY_SECRET'),
      bucket: config.get('OSS_BUCKET'),
    });
    
    this.bucket = config.get('OSS_BUCKET');
    this.cdnDomain = config.get('OSS_CDN_DOMAIN');
  }
  
  async upload(key: string, data: Buffer, mimeType: string): Promise<string> {
    await this.client.put(key, data, {
      headers: { 'Content-Type': mimeType },
    });
    
    return this.cdnDomain ? `https://${this.cdnDomain}/${key}` : `https://${this.bucket}.oss-cn-shanghai.aliyuncs.com/${key}`;
  }
  
  async delete(key: string): Promise<void> {
    await this.client.delete(key);
  }
  
  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    return this.client.signatureUrl(key, { expires: expiresIn });
  }
}
```

---

## 十、Swagger 文档
```typescript
// src/modules/upload/dto/upload.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';

export class UploadAudioDto {
  @ApiPropertyOptional({
    description: '关联会话 ID',
    example: 'conv-001',
  })
  @IsOptional()
  conversationId?: string;
}

export class UploadImageDto {
  @ApiPropertyOptional({
    description: '图片类型',
    enum: ['avatar', 'cover', 'general'],
    default: 'general',
  })
  @IsOptional()
  @IsEnum(['avatar', 'cover', 'general'])
  type?: 'avatar' | 'cover' | 'general';
}
```

---

## 十一、环境变量
```env
# Upload
UPLOAD_DIR=./uploads
MAX_AUDIO_SIZE=10485760    # 10MB
MAX_IMAGE_SIZE=5242880     # 5MB

# Aliyun OSS
OSS_REGION=oss-cn-shanghai
OSS_ACCESS_KEY_ID=your_key
OSS_ACCESS_KEY_SECRET=your_secret
OSS_BUCKET=polytalk-files
OSS_CDN_DOMAIN=cdn.example.com
```

---

## 十二、依赖清单
```json
{
  "dependencies": {
    "@nestjs/platform-express": "^10.0.0",
    "multer": "^1.4.5-lts.1",
    "sharp": "^0.33.0",
    "fluent-ffmpeg": "^2.1.2",
    "ali-oss": "^6.0.0"
  },
  "devDependencies": {
    "@types/multer": "^1.4.0",
    "@types/fluent-ffmpeg": "^2.1.0"
  }
}
```

---

## 十三、模块注册
```typescript
// src/modules/upload/upload.module.ts

import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { AudioProcessorService } from './processors/audio-processor.service';
import { ImageProcessorService } from './processors/image-processor.service';
import { LocalStorageService } from './storage/local-storage.service';

@Module({
  controllers: [UploadController],
  providers: [
    UploadService,
    AudioProcessorService,
    ImageProcessorService,
    LocalStorageService,
    {
      provide: 'StorageService',
      useClass: LocalStorageService,
    },
  ],
  exports: [UploadService],
})
export class UploadModule {}
```

---

## 十四、功能特性

### 14.1 音频上传
- 支持 webm/mp3/wav/m4a/ogg 格式
- 10MB 大小限制
- 自动提取音频时长
- 关联会话 ID
- CDN 加速访问

### 14.2 图片上传
- 支持 jpeg/png/webp/gif 格式
- 5MB 大小限制
- 自动生成 200x200 缩略图
- 自动压缩（质量 85%）
- 类型分类（avatar/cover/general）

### 14.3 存储策略
- 开发环境：本地存储（`./uploads`）
- 生产环境：阿里云 OSS + CDN
- 可切换存储后端

### 14.4 安全特性
- JWT 认证
- 文件类型校验
- 文件大小限制
- 权限检查（只能删除自己上传的文件）

---

## 十五、测试用例

### 15.1 单元测试
```typescript
// src/modules/upload/upload.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';
import { ConfigService } from '@nestjs/config';

describe('UploadService', () => {
  let service: UploadService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService, ConfigService],
    }).compile();
    
    service = module.get<UploadService>(UploadService);
  });
  
  it('should upload audio file', async () => {
    const file = {
      originalname: 'test.webm',
      mimetype: 'audio/webm',
      size: 1024,
      buffer: Buffer.from('test'),
    };
    
    const result = await service.uploadAudio(file, 'user-1', 'conv-1');
    
    expect(result.id).toBeDefined();
    expect(result.mimeType).toBe('audio/webm');
  });
});
```

### 15.2 E2E 测试
```typescript
// test/upload.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Upload API (e2e)', () => {
  let app: INestApplication;
  let token: string;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
    
    // 获取 token
    const loginRes = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'test123' });
    
    token = loginRes.body.data.tokens.accessToken;
  });
  
  it('should upload audio file', () => {
    return request(app.getHttpServer())
      .post('/api/v1/upload/audio')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', Buffer.from('audio data'), 'test.webm')
      .expect(201);
  });
});
```

---

**状态**：✅ 文件上传 API 设计完成

**交付物**：
- 4个 API 接口完整设计
- Controller + Service + Processor 完整实现
- 本地存储 + OSS 双模式
- Swagger 文档装饰器
- 单元测试和 E2E 测试

—— 兵部 张居正
2026-03-03 22:00

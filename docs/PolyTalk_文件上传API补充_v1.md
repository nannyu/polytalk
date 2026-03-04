# PolyTalk 文件上传 API 补充 v1
**兵部 张居正** | 2026-03-03 21:50
**状态**：待确认后即刻交付

---

## 一、文件上传 API 概述

### 1.1 设计目标

- 支持语音文件上传（STT 前置）
- 支持图片文件上传（头像、课程封面等）
- 文件大小限制
- 文件类型校验
- 云存储集成（阿里云 OSS / AWS S3）

### 1.2 存储方案

| 环境 | 存储方案 |
|------|----------|
| 开发环境 | 本地存储 `/uploads/` |
| 生产环境 | 阿里云 OSS（国内）/ AWS S3（海外） |

---

## 二、API 接口设计

### 2.1 上传语音文件

```http
POST /api/v1/upload/audio
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

file: <audio file>
conversationId: <optional conversation ID>
```

**支持格式**：
- `audio/webm`（推荐，浏览器录制）
- `audio/mp3`
- `audio/wav`
- `audio/m4a`
- `audio/ogg`

**文件大小限制**：10MB

**响应 201**：
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

**错误 413**：
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

**错误 415**：
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

### 2.2 上传图片文件

```http
POST /api/v1/upload/image
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

file: <image file>
type: <avatar | cover | general>
```

**支持格式**：
- `image/jpeg`
- `image/png`
- `image/webp`
- `image/gif`

**文件大小限制**：5MB

**图片尺寸处理**：
- 自动生成缩略图（200x200）
- 自动压缩（质量 85%）
- 自动旋转（根据 EXIF）

**响应 201**：
```json
{
  "success": true,
  "data": {
    "id": "file-456",
    "filename": "avatar-1709500000000.jpg",
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

### 2.3 获取文件信息

```http
GET /api/v1/files/:id
Authorization: Bearer {accessToken}
```

**响应 200**：
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

---

### 2.4 删除文件

```http
DELETE /api/v1/files/:id
Authorization: Bearer {accessToken}
```

**响应 204**：无返回体

**权限检查**：
- 只能删除自己上传的文件
- 管理员可删除任意文件

**错误 403**：
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

## 三、数据库表设计

### 3.1 files 表

```prisma
model File {
  id          String   @id @default(uuid())
  filename    String
  originalName String
  mimeType    String
  size        Int      // bytes
  url         String
  thumbnailUrl String?
  
  // 文件类型
  type        String   // audio, image, document
  category    String?  // avatar, cover, recording
  
  // 上传者
  uploadedBy  String
  uploader    User     @relation(fields: [uploadedBy], references: [id], onDelete: Cascade)
  
  // 关联会话（可选）
  conversationId String?
  conversation    Conversation? @relation(fields: [conversationId], references: [id], onDelete: SetNull)
  
  // 元数据
  metadata    Json?    // { duration, width, height, etc. }
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime?
  
  @@index([uploadedBy])
  @@index([conversationId])
  @@index([type, category])
}
```

---

## 四、NestJS 实现

### 4.1 Controller

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
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UploadService } from './upload.service';
import { UploadAudioDto, UploadImageDto } from './dto/upload.dto';

@ApiTags('upload')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  
  @Post('audio')
  @ApiOperation({ summary: '上传语音文件' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: '上传成功' })
  @ApiResponse({ status: 413, description: '文件过大' })
  @ApiResponse({ status: 415, description: '不支持的文件类型' })
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

### 4.2 Service

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
      duration: file.metadata?.['duration'],
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
    
    if (file.uploadedBy !== userId) {
      throw new ForbiddenException('无权删除此文件');
    }
    
    // 删除存储文件
    await this.storage.delete(file.url);
    if (file.thumbnailUrl) {
      await this.storage.delete(file.thumbnailUrl);
    }
    
    // 软删除数据库记录
    await this.prisma.file.update({
      where: { id: fileId },
      data: { deletedAt: new Date() },
    });
  }
}
```

---

## 五、存储服务抽象

### 5.1 接口定义

```typescript
// src/modules/upload/storage/storage.interface.ts

export interface StorageService {
  upload(key: string, data: Buffer, mimeType: string): Promise<string>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, expiresIn?: number): Promise<string>;
}
```

### 5.2 本地存储（开发环境）

```typescript
// src/modules/upload/storage/local.storage.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';
import { StorageService } from './storage.interface';

@Injectable()
export class LocalStorageService implements StorageService {
  private readonly uploadDir: string;
  
  constructor(private readonly config: ConfigService) {
    this.uploadDir = this.config.get('UPLOAD_DIR', './uploads');
  }
  
  async upload(key: string, data: Buffer, mimeType: string): Promise<string> {
    const filePath = path.join(this.uploadDir, key);
    const dir = path.dirname(filePath);
    
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, data);
    
    return `/uploads/${key}`;
  }
  
  async delete(key: string): Promise<void> {
    const filePath = path.join(this.uploadDir, key);
    await fs.unlink(filePath).catch(() => {});
  }
  
  async getSignedUrl(key: string, expiresIn?: number): Promise<string> {
    return `/uploads/${key}`;
  }
}
```

### 5.3 阿里云 OSS（生产环境）

```typescript
// src/modules/upload/storage/oss.storage.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OSS from 'ali-oss';
import { StorageService } from './storage.interface';

@Injectable()
export class OSSStorageService implements StorageService {
  private readonly client: OSS;
  private readonly bucket: string;
  private readonly cdnDomain: string;
  
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

## 六、文件处理

### 6.1 音频处理器

```typescript
// src/modules/upload/processors/audio-processor.service.ts

import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import * as { Readable } from 'stream';

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

### 6.2 图片处理器

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

## 七、Swagger 文档

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

## 八、环境变量

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

## 九、模块注册

```typescript
// src/modules/upload/upload.module.ts

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { LocalStorageService } from './storage/local.storage';
import { AudioProcessorService } from './processors/audio-processor.service';
import { ImageProcessorService } from './processors/image-processor.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/temp',
    }),
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
    LocalStorageService,
    AudioProcessorService,
    ImageProcessorService,
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

**状态**：✅ 设计完成，待确认后交付

**包含**：
- ✅ 4个API接口（上传音频/图片、获取/删除文件）
- ✅ 数据库表设计（files表）
- ✅ NestJS Controller + Service
- ✅ 存储服务抽象（本地/OSS）
- ✅ 文件处理（音频时长、图片压缩）
- ✅ Swagger文档

—— 兵部 张居正

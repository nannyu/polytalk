# PolyTalk 数据库设计 v1
**兵部 张居正** | 2026-03-03

---

## 一、核心实体关系（ER图）

```
┌─────────────┐       ┌─────────────────┐       ┌──────────────┐
│   User      │1    * │  Conversation   │1    * │   Message    │
│─────────────│───────│─────────────────│───────│──────────────│
│ id          │       │ id              │       │ id           │
│ email       │       │ user_id (FK)    │       │ conv_id (FK) │
│ nickname    │       │ title           │       │ role         │
│ avatar      │       │ language        │       │ content      │
│ tier        │       │ status          │       │ audio_url    │
│ created_at  │       │ created_at      │       │ tokens_used  │
└─────────────┘       │ updated_at      │       │ provider     │
                      └─────────────────┘       │ created_at   │
                           │    │               └──────────────┘
                           │    │
                           │    │*
                           │    ┌─────────────────┐
                           │    │  SessionConfig  │
                           │    │─────────────────│
                           │    │ id              │
                           │    │ conv_id (FK)    │
                           │    │ ai_provider     │
                           │    │ model_name      │
                           │    │ voice_type      │
                           │    │ temperature     │
                           │    │ system_prompt   │
                           │    └─────────────────┘
                           │
                           │*
                      ┌─────────────────┐
                      │  Conversation   │
                      │  Analytics      │
                      │─────────────────│
                      │ id              │
                      │ conv_id (FK)    │
                      │ duration_sec    │
                      │ msg_count       │
                      │ stt_chars       │
                      │ tts_chars       │
                      │ tokens_total    │
                      │ date            │
                      └─────────────────┘
```

---

## 二、表结构详细设计

### 2.1 用户表（users）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |
| email | VARCHAR(255) | UNIQUE, NOT NULL | 邮箱 |
| password_hash | VARCHAR(255) | | 密码哈希（可选，支持OAuth） |
| nickname | VARCHAR(100) | NOT NULL | 昵称 |
| avatar | VARCHAR(500) | | 头像URL |
| tier | ENUM | DEFAULT 'free' | 等级：free/basic/pro |
| language | VARCHAR(10) | DEFAULT 'zh-CN' | 默认语言 |
| timezone | VARCHAR(50) | DEFAULT 'Asia/Shanghai' | 时区 |
| settings | JSON | | 用户偏好设置 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |
| updated_at | TIMESTAMP | | 更新时间 |
| last_active_at | TIMESTAMP | | 最后活跃时间 |

**索引**：
- `idx_users_email` ON (email)
- `idx_users_tier` ON (tier)

---

### 2.2 会话表（conversations）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |
| user_id | UUID | FK → users.id, NOT NULL | 所属用户 |
| title | VARCHAR(200) | | 会话标题（自动生成或用户设定） |
| language | VARCHAR(10) | DEFAULT 'zh-CN' | 会话语言 |
| status | ENUM | DEFAULT 'active' | active/archived/deleted |
| message_count | INT | DEFAULT 0 | 消息计数（冗余） |
| total_tokens | INT | DEFAULT 0 | 总Token数（冗余） |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |
| updated_at | TIMESTAMP | | 更新时间 |
| archived_at | TIMESTAMP | | 归档时间 |

**索引**：
- `idx_conversations_user` ON (user_id)
- `idx_conversations_status` ON (status)
- `idx_conversations_created` ON (created_at DESC)

---

### 2.3 消息表（messages）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |
| conv_id | UUID | FK → conversations.id, NOT NULL | 所属会话 |
| role | ENUM | NOT NULL | system/user/assistant |
| content | TEXT | NOT NULL | 文本内容 |
| content_type | ENUM | DEFAULT 'text' | text/audio/image |
| audio_url | VARCHAR(500) | | 音频URL（语音消息） |
| audio_duration | INT | | 音频时长（秒） |
| tokens_used | INT | DEFAULT 0 | 消耗Token数 |
| provider | VARCHAR(50) | | AI供应商（assistant消息） |
| model | VARCHAR(100) | | 使用模型 |
| latency_ms | INT | | 响应延迟（毫秒） |
| metadata | JSON | | 扩展元数据 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |

**索引**：
- `idx_messages_conv` ON (conv_id, created_at DESC)
- `idx_messages_role` ON (role)

---

### 2.4 会话配置表（session_configs）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |
| conv_id | UUID | FK → conversations.id, UNIQUE, NOT NULL | 所属会话（一对一） |
| ai_provider | VARCHAR(50) | DEFAULT 'glm' | AI供应商 |
| model_name | VARCHAR(100) | | 模型名称（覆盖默认） |
| voice_type | VARCHAR(100) | | TTS音色 |
| voice_speed | DECIMAL(2,1) | DEFAULT 1.0 | 语速（0.5-2.0） |
| temperature | DECIMAL(2,1) | DEFAULT 0.7 | 温度参数 |
| max_tokens | INT | DEFAULT 1024 | 最大Token数 |
| system_prompt | TEXT | | 系统提示词 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |
| updated_at | TIMESTAMP | | 更新时间 |

---

### 2.5 会话统计表（conversation_analytics）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |
| conv_id | UUID | FK → conversations.id, NOT NULL | 所属会话 |
| date | DATE | NOT NULL | 统计日期 |
| duration_sec | INT | DEFAULT 0 | 对话总时长（秒） |
| msg_count_user | INT | DEFAULT 0 | 用户消息数 |
| msg_count_assistant | INT | DEFAULT 0 | AI回复数 |
| stt_chars | INT | DEFAULT 0 | 语音识别字符数 |
| tts_chars | INT | DEFAULT 0 | 语音合成字符数 |
| tokens_input | INT | DEFAULT 0 | 输入Token数 |
| tokens_output | INT | DEFAULT 0 | 输出Token数 |
| avg_latency_ms | INT | DEFAULT 0 | 平均响应延迟 |

**索引**：
- `idx_analytics_conv_date` UNIQUE ON (conv_id, date)

---

### 2.6 API密钥表（api_keys）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | UUID | PK | 主键 |
| user_id | UUID | FK → users.id, NOT NULL | 所属用户 |
| key_hash | VARCHAR(255) | UNIQUE, NOT NULL | 密钥哈希 |
| name | VARCHAR(100) | | 密钥名称 |
| scopes | JSON | | 权限范围 |
| last_used_at | TIMESTAMP | | 最后使用时间 |
| expires_at | TIMESTAMP | | 过期时间 |
| is_active | BOOLEAN | DEFAULT TRUE | 是否启用 |
| created_at | TIMESTAMP | DEFAULT NOW() | 创建时间 |

---

## 三、ORM Schema（TypeScript）

### 3.1 用户

```typescript
// src/models/user.ts

import { pgTable, uuid, varchar, timestamp, json, pgEnum } from 'drizzle-orm/pg-core';

export const tierEnum = pgEnum('tier', ['free', 'basic', 'pro']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  nickname: varchar('nickname', { length: 100 }).notNull(),
  avatar: varchar('avatar', { length: 500 }),
  tier: tierEnum('tier').default('free'),
  language: varchar('language', { length: 10 }).default('zh-CN'),
  timezone: varchar('timezone', { length: 50 }).default('Asia/Shanghai'),
  settings: json('settings').$type<UserSettings>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  lastActiveAt: timestamp('last_active_at'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

interface UserSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  autoTTS: boolean;
  autoSTT: boolean;
}
```

### 3.2 会话

```typescript
// src/models/conversation.ts

import { pgTable, uuid, varchar, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './user';
import { relations } from 'drizzle-orm';
import { messages } from './message';
import { sessionConfigs } from './sessionConfig';

export const statusEnum = pgEnum('conv_status', ['active', 'archived', 'deleted']);

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 200 }),
  language: varchar('language', { length: 10 }).default('zh-CN'),
  status: statusEnum('status').default('active'),
  messageCount: integer('message_count').default(0),
  totalTokens: integer('total_tokens').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  archivedAt: timestamp('archived_at'),
});

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  user: one(users, {
    fields: [conversations.userId],
    references: [users.id],
  }),
  messages: many(messages),
  config: one(sessionConfigs),
}));
```

### 3.3 消息

```typescript
// src/models/message.ts

import { pgTable, uuid, varchar, text, timestamp, integer, pgEnum, json } from 'drizzle-orm/pg-core';
import { conversations } from './conversation';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['system', 'user', 'assistant']);
export const contentTypeEnum = pgEnum('content_type', ['text', 'audio', 'image']);

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  convId: uuid('conv_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  role: roleEnum('role').notNull(),
  content: text('content').notNull(),
  contentType: contentTypeEnum('content_type').default('text'),
  audioUrl: varchar('audio_url', { length: 500 }),
  audioDuration: integer('audio_duration'),
  tokensUsed: integer('tokens_used').default(0),
  provider: varchar('provider', { length: 50 }),
  model: varchar('model', { length: 100 }),
  latencyMs: integer('latency_ms'),
  metadata: json('metadata').$type<Record<string, any>>(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.convId],
    references: [conversations.id],
  }),
}));
```

---

## 四、迁移策略

### 4.1 开发环境（SQLite）

```typescript
// drizzle.config.ts (SQLite)

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/*',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    filename: './data/polytalk.db',
  },
} satisfies Config;
```

### 4.2 生产环境（PostgreSQL）

```typescript
// drizzle.config.ts (PostgreSQL)

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### 4.3 迁移命令

```bash
# 生成迁移
npm run db:generate

# 应用迁移
npm run db:migrate

# 推送schema（开发）
npm run db:push
```

---

## 五、数据一致性约束

### 5.1 外键策略

```sql
-- 级联删除：用户删除时删除所有关联数据
ON DELETE CASCADE

-- 会话删除时：
-- 1. 删除所有消息
-- 2. 删除会话配置
-- 3. 删除统计数据
```

### 5.2 软删除

```typescript
// 用户/会话使用软删除，保留历史数据
status: 'deleted'
archived_at: timestamp
```

### 5.3 冗余字段同步

```typescript
// 会话的消息计数、Token总数在新增消息时更新
async function updateConversationStats(convId: string) {
  await db.update(conversations)
    .set({
      messageCount: sql`(SELECT COUNT(*) FROM messages WHERE conv_id = ${convId})`,
      totalTokens: sql`(SELECT SUM(tokens_used) FROM messages WHERE conv_id = ${convId})`,
      updatedAt: new Date(),
    })
    .where(eq(conversations.id, convId));
}
```

---

## 六、性能优化

### 6.1 索引策略

- 主键自动索引
- 外键手动索引
- 时间范围查询索引
- 复合索引：`(conv_id, created_at DESC)` 用于消息分页

### 6.2 分页查询

```typescript
// 游标分页（消息列表）
async function getMessages(convId: string, cursor?: string, limit = 50) {
  const query = db.select()
    .from(messages)
    .where(eq(messages.convId, convId))
    .orderBy(desc(messages.createdAt))
    .limit(limit);

  if (cursor) {
    query.where(lt(messages.createdAt, new Date(cursor)));
  }

  return query;
}
```

### 6.3 全文搜索

```sql
-- PostgreSQL 全文搜索（消息内容）
CREATE INDEX idx_messages_content_fts ON messages 
USING gin(to_tsvector('simple', content));
```

```typescript
// Drizzle 全文搜索
await db.select()
  .from(messages)
  .where(sql`to_tsvector('simple', content) @@ to_tsquery('simple', ${searchTerm})`);
```

---

## 七、数据备份与恢复

### 7.1 自动备份（每日）

```bash
#!/bin/bash
# scripts/backup.sh

BACKUP_DIR="/backups/polytalk"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > $BACKUP_DIR/polytalk_$DATE.sql
gzip $BACKUP_DIR/polytalk_$DATE.sql

# 保留最近30天
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

### 7.2 恢复流程

```bash
# 恢复最新备份
gunzip -c /backups/polytalk/polytalk_latest.sql.gz | psql $DATABASE_URL
```

---

**状态**：✅ 数据库设计完成

**下一步**：等待司礼监确认框架（NestJS vs Hono），配合工部实施

—— 兵部 张居正

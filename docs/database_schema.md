# PolyTalk 数据库设计文档

> **版本**: v1.0  
> **日期**: 2026-03-03  
> **作者**: 工部严世蕃  
> **数据库**: SQLite 3.x（可迁移 PostgreSQL）

---

## 1. 设计原则

| 原则           | 说明                              |
|----------------|-----------------------------------|
| **轻量优先**   | 单文件数据库，零配置启动          |
| **可迁移**     | 预留 PostgreSQL 迁移路径          |
| **规范化**     | 3NF，避免冗余                     |
| **软删除**     | 用户数据支持软删除（GDPR 合规）   |

---

## 2. ER 图

```
┌─────────────┐       ┌──────────────┐       ┌─────────────┐
│   users     │ 1   * │ conversations│ *   1 │  courses    │
│             ├───────┤              ├───────┤             │
│ id          │       │ id           │       │ id          │
│ username    │       │ user_id (FK) │       │ title       │
│ email       │       │ course_id(FK)│       │ language    │
│ ...         │       │ status       │       │ level       │
└─────────────┘       └──────┬───────┘       └─────────────┘
                             │ 1
                             │
                             │ *
                      ┌──────▼───────┐
                      │   messages   │
                      │              │
                      │ id           │
                      │ conversation │
                      │ role         │
                      │ content      │
                      │ audio_url    │
                      └──────────────┘

┌─────────────┐       ┌──────────────┐
│   lessons   │ *   1 │   units      │
│             ├───────┤              │
│ id          │       │ id           │
│ unit_id(FK) │       │ course_id(FK)│
│ title       │       │ title        │
│ content     │       │ order        │
└─────────────┘       └──────────────┘

┌─────────────┐       ┌──────────────┐
│user_progress│       │  vocab_items │
│             │       │              │
│ user_id(FK) │       │ course_id(FK)│
│ lesson_id(FK)│      │ word         │
│ completed   │       │ translation  │
│ score       │       │ audio_url    │
└─────────────┘       └──────────────┘
```

---

## 3. 表结构

### 3.1 用户表 `users`

```sql
CREATE TABLE users (
    id              TEXT PRIMARY KEY,           -- UUID v4
    username        TEXT UNIQUE NOT NULL,       -- 用户名
    email           TEXT UNIQUE,                -- 邮箱（可选）
    password_hash   TEXT,                       -- 密码哈希（可选，支持匿名用户）
    display_name    TEXT,                       -- 显示名称
    avatar_url      TEXT,                       -- 头像 URL
    role            TEXT DEFAULT 'student',     -- student/parent/teacher
    language        TEXT DEFAULT 'zh-CN',       -- 界面语言
    preferred_langs TEXT,                       -- JSON: ["en", "ja"]
    settings        TEXT,                       -- JSON: 用户偏好设置
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMP                   -- 软删除时间戳
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

**字段说明**：
- `role`: `student`（学生）、`parent`（家长）、`teacher`（教师）
- `preferred_langs`: JSON 数组，存储用户学习的语言列表
- `settings`: JSON 对象，存储用户偏好（语速、主题等）

---

### 3.2 课程表 `courses`

```sql
CREATE TABLE courses (
    id              TEXT PRIMARY KEY,           -- UUID v4
    title           TEXT NOT NULL,              -- 课程标题
    description     TEXT,                       -- 课程描述
    language        TEXT NOT NULL,              -- 目标语言（en/ja/ko...）
    level           TEXT DEFAULT 'beginner',    -- beginner/intermediate/advanced
    category        TEXT,                       -- 分类（启蒙/职场/旅游）
    cover_url       TEXT,                       -- 封面图片 URL
    is_published    BOOLEAN DEFAULT FALSE,      -- 是否发布
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by      TEXT,                       -- 创建者 user_id
    metadata        TEXT                        -- JSON: 额外元数据
);

CREATE INDEX idx_courses_language ON courses(language);
CREATE INDEX idx_courses_level ON courses(level);
```

**支持的语言**：
- `en`: 英语
- `ja`: 日语
- `ko`: 韩语
- `fr`: 法语
- `es`: 西班牙语

---

### 3.3 单元表 `units`

```sql
CREATE TABLE units (
    id              TEXT PRIMARY KEY,           -- UUID v4
    course_id       TEXT NOT NULL,              -- 所属课程
    title           TEXT NOT NULL,              -- 单元标题
    description     TEXT,                       -- 单元描述
    order_index     INTEGER NOT NULL,           -- 排序序号
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE INDEX idx_units_course ON units(course_id, order_index);
```

---

### 3.4 课时表 `lessons`

```sql
CREATE TABLE lessons (
    id              TEXT PRIMARY KEY,           -- UUID v4
    unit_id         TEXT NOT NULL,              -- 所属单元
    title           TEXT NOT NULL,              -- 课时标题
    content         TEXT,                       -- 课时内容（JSON/Markdown）
    lesson_type     TEXT DEFAULT 'dialogue',    -- dialogue/vocabulary/grammar/quiz
    order_index     INTEGER NOT NULL,           -- 排序序号
    duration        INTEGER,                    -- 预计时长（分钟）
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE
);

CREATE INDEX idx_lessons_unit ON lessons(unit_id, order_index);
```

**课时类型**：
- `dialogue`: 对话练习
- `vocabulary`: 词汇学习
- `grammar`: 语法讲解
- `quiz`: 测验

---

### 3.5 对话会话表 `conversations`

```sql
CREATE TABLE conversations (
    id              TEXT PRIMARY KEY,           -- UUID v4
    user_id         TEXT NOT NULL,              -- 所属用户
    course_id       TEXT,                       -- 关联课程（可选）
    lesson_id       TEXT,                       -- 关联课时（可选）
    title           TEXT,                       -- 会话标题
    status          TEXT DEFAULT 'active',      -- active/archived/deleted
    context         TEXT,                       -- JSON: 上下文信息
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE SET NULL
);

CREATE INDEX idx_conversations_user ON conversations(user_id, created_at DESC);
CREATE INDEX idx_conversations_status ON conversations(status);
```

---

### 3.6 消息表 `messages`

```sql
CREATE TABLE messages (
    id              TEXT PRIMARY KEY,           -- UUID v4
    conversation_id TEXT NOT NULL,              -- 所属会话
    role            TEXT NOT NULL,              -- user/assistant/system
    content         TEXT NOT NULL,              -- 消息文本内容
    audio_url       TEXT,                       -- 语音 URL
    audio_duration  REAL,                       -- 语音时长（秒）
    metadata        TEXT,                       -- JSON: 额外元数据
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at);
```

**角色说明**：
- `user`: 用户消息
- `assistant`: AI 回复
- `system`: 系统消息（上下文指令）

---

### 3.7 用户进度表 `user_progress`

```sql
CREATE TABLE user_progress (
    id              TEXT PRIMARY KEY,           -- UUID v4
    user_id         TEXT NOT NULL,              -- 用户 ID
    lesson_id       TEXT NOT NULL,              -- 课时 ID
    completed       BOOLEAN DEFAULT FALSE,      -- 是否完成
    score           INTEGER,                    -- 得分（0-100）
    time_spent      INTEGER,                    -- 学习时长（秒）
    attempts        INTEGER DEFAULT 0,          -- 尝试次数
    last_accessed   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at    TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    
    UNIQUE(user_id, lesson_id)                  -- 每用户每课时一条记录
);

CREATE INDEX idx_progress_user ON user_progress(user_id);
CREATE INDEX idx_progress_lesson ON user_progress(lesson_id);
```

---

### 3.8 词汇表 `vocab_items`

```sql
CREATE TABLE vocab_items (
    id              TEXT PRIMARY KEY,           -- UUID v4
    course_id       TEXT NOT NULL,              -- 所属课程
    word            TEXT NOT NULL,              -- 单词
    translation     TEXT NOT NULL,              -- 翻译
    pronunciation   TEXT,                       -- 发音（音标/假名）
    audio_url       TEXT,                       -- 发音音频 URL
    example         TEXT,                       -- 例句
    example_audio   TEXT,                       -- 例句音频 URL
    difficulty      INTEGER DEFAULT 1,          -- 难度（1-5）
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE INDEX idx_vocab_course ON vocab_items(course_id);
CREATE INDEX idx_vocab_word ON vocab_items(word);
```

---

### 3.9 用户词汇掌握表 `user_vocab_progress`

```sql
CREATE TABLE user_vocab_progress (
    id              TEXT PRIMARY KEY,           -- UUID v4
    user_id         TEXT NOT NULL,              -- 用户 ID
    vocab_id        TEXT NOT NULL,              -- 词汇 ID
    mastery_level   INTEGER DEFAULT 0,          -- 掌握度（0-5）
    correct_count   INTEGER DEFAULT 0,          -- 正确次数
    wrong_count     INTEGER DEFAULT 0,          -- 错误次数
    last_reviewed   TIMESTAMP,                  -- 最后复习时间
    next_review     TIMESTAMP,                  -- 下次复习时间（间隔重复）
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (vocab_id) REFERENCES vocab_items(id) ON DELETE CASCADE,
    
    UNIQUE(user_id, vocab_id)
);

CREATE INDEX idx_user_vocab_user ON user_vocab_progress(user_id);
CREATE INDEX idx_user_vocab_review ON user_vocab_progress(next_review);
```

---

## 4. 索引策略

### 4.1 主要索引

| 表                | 索引字段                    | 类型   | 说明                |
|-------------------|----------------------------|--------|---------------------|
| `users`           | `email`, `username`        | 单列   | 登录查询            |
| `conversations`   | `(user_id, created_at)`    | 复合   | 用户会话列表        |
| `messages`        | `(conversation_id, created_at)` | 复合 | 会话消息查询        |
| `user_progress`   | `user_id`, `lesson_id`     | 单列   | 进度查询            |
| `vocab_items`     | `course_id`, `word`        | 单列   | 词汇查询            |

### 4.2 性能优化

- **读写分离**: SQLite 单文件，使用 WAL 模式提升并发
- **连接池**: SQLAlchemy 配置 `pool_size=5`
- **查询优化**: 避免 `SELECT *`，只查必要字段

```python
# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./data/polytalk.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
    pool_size=5,
    pool_pre_ping=True
)
```

---

## 5. 数据迁移

### 5.1 Alembic 配置

```bash
# 初始化迁移
cd backend
alembic init alembic

# 生成迁移脚本
alembic revision --autogenerate -m "Initial schema"

# 执行迁移
alembic upgrade head
```

### 5.2 迁移到 PostgreSQL

```python
# 仅需修改 DATABASE_URL
# SQLite
DATABASE_URL = "sqlite:///./data/polytalk.db"

# PostgreSQL
DATABASE_URL = "postgresql://user:pass@localhost/polytalk"
```

---

## 6. 种子数据

```sql
-- 默认课程
INSERT INTO courses (id, title, language, level, category, is_published)
VALUES 
    ('course-001', '英语启蒙', 'en', 'beginner', '启蒙', TRUE),
    ('course-002', '日语入门', 'ja', 'beginner', '启蒙', TRUE);

-- 默认单元
INSERT INTO units (id, course_id, title, order_index)
VALUES 
    ('unit-001', 'course-001', 'Hello World', 1),
    ('unit-002', 'course-002', 'あいうえお', 1);

-- 默认词汇
INSERT INTO vocab_items (id, course_id, word, translation, pronunciation)
VALUES 
    ('vocab-001', 'course-001', 'hello', '你好', '/həˈloʊ/'),
    ('vocab-002', 'course-001', 'world', '世界', '/wɜːrld/'),
    ('vocab-003', 'course-002', 'こんにちは', '你好', 'konnichiwa');
```

---

## 7. 备份策略

| 方式         | 频率   | 保留期限 | 说明                |
|--------------|--------|----------|---------------------|
| **手动备份** | 发布前 | 永久     | SQLite 文件复制     |
| **自动备份** | 每日   | 7 天     | cron job + 时间戳   |

```bash
# scripts/backup_db.sh
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
cp ./data/polytalk.db "$BACKUP_DIR/polytalk_$DATE.db"
find "$BACKUP_DIR" -name "*.db" -mtime +7 -delete
```

---

## 8. 数据合规

### 8.1 GDPR 合规

- **数据导出**: 用户可导出所有个人数据
- **数据删除**: 软删除 + 30 天后物理删除
- **数据匿名化**: 删除用户时匿名化关联数据

### 8.2 儿童隐私保护（COPPA 参考）

- 不收集 13 岁以下儿童个人信息
- 家长账号关联儿童学习记录
- 学习数据仅本地存储

---

## 附录

### A. 完整建表 SQL

见 `backend/alembic/versions/001_initial_schema.sql`

### B. 变更历史

| 版本 | 日期       | 变更内容       | 作者   |
|------|------------|----------------|--------|
| v1.0 | 2026-03-03 | 初稿           | 工部严世蕃 |

---

**工部严世蕃 呈**
2026-03-03 00:45

# 数据库连接配置
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import StaticPool
from app.core.config import settings
import warnings


def get_database_engine():
    """创建数据库引擎（支持 SQLite 和 PostgreSQL）"""
    
    database_url = settings.DATABASE_URL
    
    # SQLite 配置
    if database_url.startswith("sqlite"):
        engine = create_engine(
            database_url,
            connect_args={
                "check_same_thread": False,  # SQLite 多线程支持
            },
            poolclass=StaticPool,  # SQLite 单连接池
            pool_pre_ping=True,
            echo=settings.DEBUG,  # 开发环境打印 SQL
        )
        
        # SQLite 性能优化
        @event.listens_for(engine, "connect")
        def set_sqlite_pragma(dbapi_conn, connection_record):
            cursor = dbapi_conn.cursor()
            # 启用外键约束
            cursor.execute("PRAGMA foreign_keys=ON")
            # 启用 WAL 模式（提升并发）
            cursor.execute("PRAGMA journal_mode=WAL")
            # 设置缓存大小（单位：KB）
            cursor.execute("PRAGMA cache_size=-64000")  # 64MB
            cursor.close()
        
        return engine
    
    # PostgreSQL 配置（预留迁移路径）
    elif database_url.startswith("postgresql"):
        # 构建连接参数
        connect_args = {}
        
        # SSL 配置
        if settings.DATABASE_SSL:
            connect_args["sslmode"] = "require"
            if settings.APP_ENV == "development":
                warnings.warn(
                    "⚠️ SSL 已启用，但未验证证书（仅限开发环境）",
                    UserWarning
                )
        else:
            connect_args["sslmode"] = "prefer"
        
        engine = create_engine(
            database_url,
            connect_args=connect_args,
            pool_size=10,
            max_overflow=20,
            pool_pre_ping=True,
            pool_recycle=3600,  # 1小时回收连接
            echo=settings.DEBUG,
        )
        
        return engine
    
    else:
        raise ValueError(f"不支持的数据库类型: {database_url}")


# 创建引擎
engine = get_database_engine()

# 会话工厂
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 基类
Base = declarative_base()


def get_db():
    """获取数据库会话（依赖注入）"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """初始化数据库（创建所有表）"""
    Base.metadata.create_all(bind=engine)
    if settings.APP_ENV == "development":
        print(f"✅ 数据库初始化完成: {settings.DATABASE_URL}")


def check_db_connection():
    """检查数据库连接"""
    try:
        with engine.connect() as conn:
            conn.execute("SELECT 1")
        return True
    except Exception as e:
        print(f"🔴 数据库连接失败: {e}")
        return False

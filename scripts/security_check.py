"""
安全检查脚本
用于刑部审查配置安全性
"""
import os
import sys
from pathlib import Path


def check_security():
    """检查安全配置"""
    errors = []
    warnings = []
    
    # 检查环境变量
    app_env = os.getenv("APP_ENV", "development")
    secret_key = os.getenv("SECRET_KEY", "")
    jwt_secret = os.getenv("JWT_SECRET", "")
    
    print("🔍 PolyTalk 安全检查")
    print("=" * 50)
    print(f"环境: {app_env}")
    print()
    
    # 生产环境检查
    if app_env == "production":
        print("🔴 生产环境检查:")
        
        if not secret_key or secret_key == "change-me-in-production":
            errors.append("SECRET_KEY 未设置或使用默认值")
        
        if not jwt_secret or jwt_secret == "change-me-in-production":
            errors.append("JWT_SECRET 未设置或使用默认值")
        
        database_ssl = os.getenv("DATABASE_SSL", "false")
        if database_ssl.lower() != "true":
            warnings.append("DATABASE_SSL 未启用")
        
        debug = os.getenv("DEBUG", "false")
        if debug.lower() == "true":
            warnings.append("生产环境不应启用 DEBUG 模式")
    
    # 开发环境检查
    else:
        print("🟡 开发环境检查:")
        
        if not secret_key:
            warnings.append("SECRET_KEY 未设置（将使用随机值）")
        
        if not jwt_secret:
            warnings.append("JWT_SECRET 未设置（将使用 SECRET_KEY）")
    
    # .env 文件检查
    env_file = Path(".env")
    if env_file.exists():
        print("✅ .env 文件存在")
        
        # 检查 .env 是否在 .gitignore 中
        gitignore = Path(".gitignore")
        if gitignore.exists():
            content = gitignore.read_text()
            if ".env" not in content:
                warnings.append(".env 文件未在 .gitignore 中")
            else:
                print("✅ .env 已在 .gitignore 中")
    else:
        warnings.append(".env 文件不存在，请复制 .env.example")
    
    # 输出结果
    print()
    print("=" * 50)
    
    if errors:
        print(f"\n🔴 发现 {len(errors)} 个错误:")
        for error in errors:
            print(f"  ❌ {error}")
        print("\n⚠️ 必须修复这些错误才能部署到生产环境！")
        return 1
    
    if warnings:
        print(f"\n🟡 发现 {len(warnings)} 个警告:")
        for warning in warnings:
            print(f"  ⚠️ {warning}")
    
    if not errors and not warnings:
        print("\n✅ 所有安全检查通过！")
    
    return 0


if __name__ == "__main__":
    sys.exit(check_security())

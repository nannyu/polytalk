# OpenClaw Windows 自动化部署脚本

## 功能特性

- ✅ Windows 版本检测（Windows 10 1903+ / Windows 11）
- ✅ 虚拟化支持检测（VT-x/AMD-V, SLAT, Hyper-V）
- ✅ WSL2 支持检测与自动修复（不支持则报错退出）
- ✅ WSL2 + Ubuntu 自动安装
- ✅ Node.js 22+ (via nvm) 自动安装
- ✅ OpenClaw CLI 自动安装与初始化
- ✅ 详细日志记录
- ✅ 错误处理与回滚指引
- ✅ **自动重启与恢复安装**（新增）
- ✅ **安装进度跟踪**（新增）

## 使用方法

### 前置条件

1. **Windows 版本**：Windows 10 1903 (build 18362+) 或 Windows 11
2. **BIOS 设置**：VT-x/AMD-V 虚拟化已启用
3. **管理员权限**：必须以管理员身份运行 PowerShell

### 远程安装（TeamViewer）

1. 通过 TeamViewer 连接到目标 Windows 机器
2. 以管理员身份打开 PowerShell
3. 下载并运行脚本：

```powershell
# 方式 1：直接从 GitHub 下载
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/nannyu/polytalk/main/scripts/install-openclaw.ps1" -OutFile "install-openclaw.ps1"
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 标准安装（需手动重启）
.\install-openclaw.ps1

# 自动重启并恢复安装（推荐远程安装）
.\install-openclaw.ps1 -AutoReboot

# 自定义重启倒计时（默认 30 秒）
.\install-openclaw.ps1 -AutoReboot -RebootTimeoutSeconds 60

# 方式 2：从本地复制
# 将 install-openclaw.ps1 复制到目标机器
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\install-openclaw.ps1
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `-AutoReboot` | Switch | $false | 启用自动重启，重启后自动继续安装 |
| `-RebootTimeoutSeconds` | Int | 30 | 自动重启倒计时（秒） |
| `-Resume` | Switch | $false | 内部使用，重启后恢复安装 |

### 安装模式对比

| 模式 | 命令 | 说明 |
|------|------|------|
| **标准模式** | `.\install-openclaw.ps1` | 需要时提示重启，用户手动重启后重新运行脚本 |
| **自动模式** | `.\install-openclaw.ps1 -AutoReboot` | 需要时自动重启，重启后自动继续安装 |

### 执行流程

```
1. 管理员权限检查
   ↓
2. Windows 版本验证
   ↓
3. 虚拟化能力检测
   ↓
4. WSL2 支持检测
   ↓
5. 环境修复（如需要）
   - 启用虚拟机平台
   - 启用 Linux 子系统
   - 安装 WSL 内核更新
   ↓
6. WSL2 + Ubuntu 安装
   ↓
7. Node.js 22 + pnpm 安装
   ↓
8. OpenClaw CLI 安装
   ↓
完成！
```

## 错误处理

### 常见问题

| 错误 | 原因 | 解决方案 |
|------|------|----------|
| VT-x 未启用 | BIOS 中禁用了虚拟化 | 重启进入 BIOS，启用 VT-x/AMD-V |
| SLAT 不可用 | CPU 太旧 | 升级 CPU |
| WSL2 不支持 | 虚拟机平台无法启用 | 需要新硬件或更新 BIOS |
| 需要重启 | 功能启用后需要重启 | 重启后重新运行脚本 |

### 日志文件

脚本会在同目录生成日志文件：
```
install-openclaw-20260303-223000.log
```

## 文件结构

```
openclaw-installer/
├── install-openclaw.ps1    # 主脚本
├── README.md               # 本文件
└── install-openclaw-*.log  # 日志文件（运行后生成）
```

## 系统要求

| 项目 | 最低要求 |
|------|----------|
| Windows 版本 | Windows 10 1903 (build 18362+) |
| CPU | 支持 VT-x/AMD-V + SLAT |
| 内存 | 4GB+ (推荐 8GB+) |
| 磁盘 | 20GB+ 可用空间 |

## ⚠️ 重要说明

**本脚本仅支持 WSL2，不支持 WSL1 降级！**

如果机器不支持 WSL2，脚本会报错退出。请确保目标机器满足 WSL2 要求。

## 开发者

- **作者**: 司礼监 吕芳
- **项目**: PolyTalk / OpenClaw
- **日期**: 2026-03-03

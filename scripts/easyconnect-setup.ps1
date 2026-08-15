<#
  NUAAgent · EasyConnect 一键部署脚本（Windows）
  用法：
    1. 右键本文件 → 使用 PowerShell 运行
    2. 或：powershell -ExecutionPolicy Bypass -File .\scripts\easyconnect-setup.ps1
  功能：检测 Docker → 引导安装 → 生成 docker-compose.yml → 拉取并启动 EasyConnect
#>
$ErrorActionPreference = 'Stop'

function Write-Step($msg) { Write-Host ("`n==> " + $msg) -ForegroundColor Cyan }

Write-Host "==============================================" -ForegroundColor Magenta
Write-Host "  NUAAgent · EasyConnect 一键部署（Windows）" -ForegroundColor Magenta
Write-Host "==============================================" -ForegroundColor Magenta

# 1. 检测 Docker
Write-Step "检测 Docker"
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "未检测到 Docker，正在尝试自动安装 Docker Desktop……" -ForegroundColor Yellow

    $installed = $false
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "发现 winget，执行：winget install Docker.DockerDesktop" -ForegroundColor Green
        winget install -e --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements
        $installed = $true
    }
    elseif (Get-Command choco -ErrorAction SilentlyContinue) {
        Write-Host "发现 Chocolatey，执行：choco install docker-desktop -y" -ForegroundColor Green
        choco install docker-desktop -y
        $installed = $true
    }

    Write-Host ""
    Write-Host "安装完成后，请务必：" -ForegroundColor Yellow
    Write-Host "  1. 启动 Docker Desktop（开始菜单搜索 Docker Desktop 并打开）；"
    Write-Host "  2. 首次启动可能要求重启或启用 WSL2 / Hyper-V，按提示操作；"
    Write-Host "  3. 等待 Docker Desktop 左下角显示 Running 后，重新运行本脚本。"
    if (-not $installed) {
        Write-Host ""
        Write-Host "未找到 winget/choco，请手动下载安装：https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    }
    exit 1
}
Write-Host "Docker 已安装：$(docker --version)"

# 2. 检测 Docker 守护进程
Write-Step "检测 Docker 运行状态"
docker info *> $null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Docker 已安装但守护进程未运行。请先启动 Docker Desktop 后再重试。" -ForegroundColor Red
    exit 1
}
Write-Host "Docker 守护进程运行正常。"

# 3. 准备目录
$target = Join-Path $HOME "easyconnect"
Write-Step "准备目录：$target"
New-Item -ItemType Directory -Force -Path $target | Out-Null

# 4. 设置 VNC 密码
Write-Step "设置网页 VNC 登录密码"
$password = Read-Host "请输入网页 VNC 登录密码（直接回车使用默认 nuaaagent）"
if ([string]::IsNullOrWhiteSpace($password)) { $password = 'nuaaagent' }

# 5. 写入 docker-compose.yml
$compose = @"
version: '3.8'

services:
  easyconnect:
    image: hagb/docker-easyconnect:7.6.7
    container_name: easyconnect
    restart: unless-stopped
    cap_add:
      - NET_ADMIN
    devices:
      - /dev/net/tun
    environment:
      - EC_VER=7.6.7
      - PASSWORD=$password
      - USE_NOVNC=1
    ports:
      - "127.0.0.1:1080:1080"
      - "127.0.0.1:8888:8888"
      - "127.0.0.1:8080:8080"
    volumes:
      - ./ecdata:/root
"@
Set-Content -Path (Join-Path $target "docker-compose.yml") -Value $compose -Encoding UTF8
Write-Host "已生成：$(Join-Path $target 'docker-compose.yml')"

# 6. 拉取并启动
Write-Step "拉取镜像并启动（首次需下载，请耐心等待）"
Push-Location $target
try {
    docker compose up -d
}
finally {
    Pop-Location
}

# 7. 完成提示
Write-Host ""
Write-Host "==============================================" -ForegroundColor Green
Write-Host "  部署完成！下一步：" -ForegroundColor Green
Write-Host "  1. 浏览器打开 http://127.0.0.1:8080 登录网页 VNC（密码：$password）" -ForegroundColor Green
Write-Host "  2. 在 VNC 里用南航账号登录 EasyConnect" -ForegroundColor Green
Write-Host "  3. 验证代理：curl.exe -x http://127.0.0.1:8888 https://www.baidu.com" -ForegroundColor Green
Write-Host "  4. 在 NUAAgent 的 config.json 中把 proxy 填为 http://127.0.0.1:8888" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

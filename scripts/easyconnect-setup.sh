#!/usr/bin/env bash
# NUAAgent · EasyConnect 一键部署脚本（macOS / Linux）
# 用法：chmod +x easyconnect-setup.sh && ./easyconnect-setup.sh
set -euo pipefail

echo "=============================================="
echo "  NUAAgent · EasyConnect 一键部署（macOS / Linux）"
echo "=============================================="

step() { printf '\n==> %s\n' "$1"; }

# 1. 检测 Docker
step "检测 Docker"
if ! command -v docker >/dev/null 2>&1; then
  echo "未检测到 Docker。请先安装："
  case "$(uname -s)" in
    Darwin)
      echo "  macOS：brew install --cask docker   （或到 https://www.docker.com/products/docker-desktop/ 下载）"
      if command -v brew >/dev/null 2>&1; then
        echo "检测到 Homebrew，正在尝试安装……"
        brew install --cask docker
      fi
      ;;
    Linux)
      echo "  Linux：curl -fsSL https://get.docker.com | sh"
      echo "         然后将当前用户加入 docker 组：sudo usermod -aG docker \$USER（重登生效）"
      ;;
  esac
  echo "安装后请启动 Docker（macOS 打开 Docker Desktop；Linux 执行 sudo systemctl start docker），再重新运行本脚本。"
  exit 1
fi
echo "Docker 已安装：$(docker --version)"

# 2. 检测 Docker 守护进程
step "检测 Docker 运行状态"
if ! docker info >/dev/null 2>&1; then
  echo "Docker 守护进程未运行，请先启动 Docker（如 sudo systemctl start docker 或打开 Docker Desktop）。"
  exit 1
fi
echo "Docker 守护进程运行正常。"

# 3. 准备目录
TARGET="$HOME/easyconnect"
step "准备目录：$TARGET"
mkdir -p "$TARGET"

# 4. 设置 VNC 密码
step "设置网页 VNC 登录密码"
read -r -p "请输入网页 VNC 登录密码（直接回车使用默认 nuaaagent）：" PASSWORD
PASSWORD="${PASSWORD:-nuaaagent}"

# 5. 写入 docker-compose.yml
step "生成 docker-compose.yml"
cat > "$TARGET/docker-compose.yml" <<EOF
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
      - PASSWORD=$PASSWORD
      - USE_NOVNC=1
    ports:
      - "127.0.0.1:1080:1080"
      - "127.0.0.1:8888:8888"
      - "127.0.0.1:8080:8080"
    volumes:
      - ./ecdata:/root
EOF
echo "已生成：$TARGET/docker-compose.yml"

# 6. 拉取并启动
step "拉取镜像并启动（首次需下载，请耐心等待）"
cd "$TARGET"
docker compose up -d

# 7. 完成提示
echo ""
echo "=============================================="
echo "  部署完成！下一步："
echo "  1. 浏览器打开 http://127.0.0.1:8080 登录网页 VNC（密码：$PASSWORD）"
echo "  2. 在 VNC 里用南航账号登录 EasyConnect"
echo "  3. 验证代理：curl -x http://127.0.0.1:8888 https://www.baidu.com"
echo "  4. 在 NUAAgent 的 config.json 中把 proxy 填为 http://127.0.0.1:8888"
echo "=============================================="

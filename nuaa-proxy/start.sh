#!/usr/bin/env bash
# 启动 nuua-proxy（默认端口 8899，默认上游代理 http://localhost:8888）
set -e
cd "$(dirname "$0")"
PORT="${PORT:-8899}"
HOST="${HOST:-0.0.0.0}"
PROXY="${PROXY:-http://localhost:8888}"
UPSTREAM_BASE_URL="${UPSTREAM_BASE_URL:-https://token.nuaa.edu.cn/v1}"
mkdir -p logs
if [ -f proxy.pid ]; then
  OLDPID=$(cat proxy.pid)
  if kill -0 "$OLDPID" 2>/dev/null; then
    echo "nuua-proxy 已在运行 (pid $OLDPID)，先停止"
    kill "$OLDPID" 2>/dev/null
    sleep 0.5
  fi
  rm -f proxy.pid
fi
nohup node server.mjs --host "$HOST" --port "$PORT" --proxy "$PROXY" --upstream "$UPSTREAM_BASE_URL" > logs/proxy.log 2>&1 &
echo $! > proxy.pid
sleep 0.5
if kill -0 "$(cat proxy.pid)" 2>/dev/null; then
  echo "nuua-proxy 已启动: http://localhost:$PORT (pid $(cat proxy.pid))"
else
  echo "启动失败，查看日志: tail logs/proxy.log"
  exit 1
fi
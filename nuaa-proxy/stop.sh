#!/usr/bin/env bash
# 停止 nuua-proxy
cd "$(dirname "$0")"
if [ -f proxy.pid ]; then
  PID=$(cat proxy.pid)
  if kill -0 "$PID" 2>/dev/null; then
    kill "$PID" 2>/dev/null >@ /dev/null && echo "已停止 nuua-proxy (pid $PID)"
  fi
  rm -f proxy.pid
else
  echo "未找到 proxy.pid，检查是否在运行"
  pkill -f 'node server.mjs' 2>/dev/null && echo "已强制停止" || echo "未找到运行中的进程"
fi
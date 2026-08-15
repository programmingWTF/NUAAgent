#!/bin/bash
cd /home/LiGuiyu/nuaa-proxy
PID=$(cat proxy.pid 2>/dev/null)
if [ -n "$PID" ]; then
  kill $PID 2>/dev/null
  sleep 1
fi
nohup node server.mjs --port 8899 --host 0.0.0.0 --proxy http://localhost:8888 > logs 2>&1 &
echo $! > proxy.pid
echo "Started PID $!"
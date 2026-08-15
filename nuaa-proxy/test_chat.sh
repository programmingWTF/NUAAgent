#!/bin/bash
# nuaa-proxy 端到端测试（经 EasyConnect 8888 上游）
B=http://127.0.0.1:8899/v1
K='sk-f578218e4af848e096e3a2c41ae6f54d'
echo "=== 1. health ==="
curl -sS -m 8 http://127.0.0.1:8899/health
echo ""
echo "=== 2. 非流式 ==="
curl -sS -m 40 -X POST $B/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $K" \
  -d '{"model":"deepseek-v4-pro-202606","stream":false,"messages":[{"role":"user","content":"只回复:OK"}]}' \
  -w "HTTP=%{http_code} 耗时=%{time_total}s"
echo ""
echo "=== 3. 流式 ==="
curl -sS -N -m 40 -X POST $B/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $K" \
  -d '{"model":"deepseek-v4-pro-202606","stream":true,"messages":[{"role":"user","content":"只回复:OK"}]}' \
  -w "HTTP=%{http_code} 耗时=%{time_total}s" | head -c 500
echo ""
#!/bin/bash
B=http://127.0.0.1:8899/v1
K='sk-f578218e4af848e096e3a2c41ae6f54d'
curl -sS -N -m 60 -X POST $B/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $K" \
  -d '{"model":"deepseek-v4-pro-202606","stream":true,"messages":[{"role":"user","content":"只回复:流式OK"}]}' \
  -w "HTTP=%{http_code} 首字节=%{time_starttransfer}s 总=%{time_total}s" \
  -o /tmp/stream_out.txt
echo ""
echo "=== 输出字节数 ==="
wc -c /tmp/stream_out.txt
echo "=== 尾部 200 字节 ==="
tail -c 200 /tmp/stream_out.txt
echo ""
echo "=== 是否含 [DONE] ==="
grep -c "\[DONE\]" /tmp/stream_out.txt
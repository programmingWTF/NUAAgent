#!/bin/bash
# 并发排队验证：两个流式请求同时打进来，应本地排队串行，两个都成功
B=http://127.0.0.1:8899/v1
K='sk-f578218e4af848e096e3a2c41ae6f54d'
echo "=== 初始 /health ==="
curl -sS -m 5 http://127.0.0.1:8899/health
echo ""
req() {
  curl -sS -N -m 180 -X POST $B/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $K" \
    -d "{\"model\":\"deepseek-v4-pro-202606\",\"stream\":true,\"messages\":[{\"role\":\"user\",\"content\":\"只回复:并发$1\"}]}" \
    -o "$2" -w "$1 HTTP=%{http_code} 首字节=%{time_starttransfer}s 总=%{time_total}s"
  echo ""
}
echo "=== 同时发两个流式请求 ==="
req A /tmp/q1.txt &
P1=$!
req B /tmp/q2.txt &
P2=$!
sleep 1
echo "--- 运行中 /health（应看到 queued=1 或 slotBusy=true）---"
curl -sS -m 5 http://127.0.0.1:8899/health
echo ""
wait $P1 $P2
echo "=== 结果 ==="
echo "q1 [DONE]: $(grep -c 'DONE' /tmp/q1.txt)  并发A: $(grep -c '并发' /tmp/q1.txt)  字节: $(stat -c %s /tmp/q1.txt)"
echo "q2 [DONE]: $(grep -c 'DONE' /tmp/q2.txt)  并发B: $(grep -c '并发' /tmp/q2.txt)  字节: $(stat -c %s /tmp/q2.txt)"
echo "=== 代理日志（排队记录）==="
tail -12 /home/LiGuiyu/nuaa-proxy/proxy.log
#!/bin/bash
# 大 prompt 流式首字节测试：模拟 OpenClaw 的大请求量级
B=http://127.0.0.1:8899/v1
K='sk-f578218e4af848e096e3a2c41ae6f54d'
python3 - <<'PYEOF' > /tmp/big_body.json
import json
# 构造 ~20k tokens 的大 prompt（重复文本块）
seg = "你是南航校内的编程助手。请遵守规范：代码要有注释、提交信息用中文、涉及密钥一律用环境变量。"
big = "背景资料：" + (seg * 900)
body = {"model":"deepseek-v4-pro-202606","stream":True,
        "messages":[{"role":"system","content":big},
                    {"role":"user","content":"只回复:OK"}]}
print(json.dumps(body, ensure_ascii=False))
PYEOF
echo "请求体大小: $(wc -c < /tmp/big_body.json) 字节"
echo "=== 大 prompt 流式（经 8899 → 8888 → 上游）==="
curl -sS -N -m 120 -X POST $B/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $K" \
  --data-binary @/tmp/big_body.json \
  -w "HTTP=%{http_code} 首字节=%{time_starttransfer}s 总=%{time_total}s" \
  -o /tmp/big_out.txt
echo ""
echo "=== 输出尾部 ==="
tail -c 300 /tmp/big_out.txt
echo ""
grep -c "\[DONE\]" /tmp/big_out.txt
# nuua-proxy —— 南航 API WAF 绕过代理（OpenAI 兼容）

将 nuua-agent 的抗深信服 WAF 逻辑剥离为独立后端服务，以系统 curl 为底层命令，对外暴露 OpenAI 兼容的 HTTP 接口。

## 目录
```
nuua-proxy/
  ├── waf.mjs          # WAF 绕过核心
  ├── server.mjs       # HTTP 服务入口
  ├── start.sh         # 启动脚本
  ├── stop.sh          # 停止脚本
  └── README.md
```

## 依赖

- Node.js >= 22（v22.22.2+ 测试通过）
- 系统 curl（底层转发命令）
- 上游需要可访问 token.nuaa.edu.cn（校内直连或通过 EasyConnect 代理）

## 快速启动

```bash
# 默认端口 8899，上游代理 http://localhost:8888
./start.sh

# 自定义端口 / 代理
node server.mjs --port 8899 --proxy http://localhost:8888
```

```bash
# 停止
./stop.sh
```

## 配置项

| 参数 | 环境变量 | 默认值 | 说明 |
|------|----------|--------|------|
| --host | HOST | 0.0.0.0 | 监听地址 |
| --port | PORT | 8899 | 监听端口 |
| --proxy | PROXY | http://localhost:8888 | 上游代理（校内直连留空） |
| --upstream | UPSTREAM_BASE_URL | https://token.nuaa.edu.cn/v1 | 真实 API Base URL |

## 客户端使用

### Base URL（OpenAI 格式）
```
http://localhost:<port>/v1
```

### 请求示例
```bash
# 非流式
curl -sS http://localhost:8899/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <你的 API Key>" \
  -d '{"model":"deepseek-v4-pro-202606","messages":[{"role":"user","content":"ni hao"}],"stream":false}'

# 流式
curl -sS http://localhost:8899/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <你的 API Key>" \
  -d '{"model":"deepseek-v4-pro-202606","messages":[{"role":"user","content":"ni hao"}],"stream":true}'
```

## 兼容接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /v1/chat/completions | 聊天补全（OpenAI 标准） |
| POST | /chat/completions | 同上（省略 /v1） |
| GET | /v1/models | 模型列表 |
| GET | /health | 健康检查 |

## 部署到 NAS

1. 上传 nuua-proxy/ 目录到 NAS
2. 确保 Node.js 已安装
3. 确保 EasyConnect Docker 容器正在运行
4. chmod +x start.sh stop.sh
5. 运行 ./start.sh

## 注意事项

- **切勿重启 EasyConnect 容器**：重启会导致登录状态丢失
- 默认代理 http://localhost:8888 指向 EasyConnect Docker
- 校内直连时可将 --proxy "" 留空
- 客户端需自行提供 API Key 和模型 ID
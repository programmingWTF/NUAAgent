# EasyConnect 部署教程（校外访问必读）

EasyConnect（校园网 VPN 客户端）用于把本机接入南航校园网。**在校内**可直接访问模型 API，无需配置；**在校外**（宿舍宽带、家里、运营商网络等）必须先用 EasyConnect 拨入校园网，NUAAgent 才能连上 `token.nuaa.edu.cn`。

本仓库提供了 **一键脚本** 与 **手动部署** 两种方式，也包含 **没装过 Docker 的同学**的引导说明。

---

## 方式一：一键脚本（推荐）

> 脚本会自动检测 Docker；没装则引导安装（Windows 下优先用 winget 自动安装），随后自动生成配置、拉取镜像并启动。

**Windows**

```powershell
# 进入脚本目录后执行（右键“使用 PowerShell 运行”亦可）
powershell -ExecutionPolicy Bypass -File .\scripts\easyconnect-setup.ps1
```

**macOS / Linux**

```bash
chmod +x scripts/easyconnect-setup.sh
./scripts/easyconnect-setup.sh
```

脚本结束后：

1. 浏览器打开 <http://127.0.0.1:8080>，用脚本中设置的密码登录网页 VNC；
2. 在 VNC 桌面里用 **南航统一身份认证账号** 登录 EasyConnect；
3. 登录成功后即可验证代理（见下文「验证代理」）。

---

## 方式二：手动部署（Docker）

### 第 1 步：安装 Docker（没装过的同学看这里）

- **Windows**：打开 <https://www.docker.com/products/docker-desktop/> 下载 Docker Desktop 安装包，双击安装，按提示重启或启用 WSL2/Hyper-V。装完启动 Docker Desktop，等待左下角显示 **Running**。
- **macOS**：`brew install --cask docker`，或从上述官网下载安装。
- **Linux**：`curl -fsSL https://get.docker.com | sh`，再把当前用户加入 `docker` 组（`sudo usermod -aG docker $USER`，重登生效）。

验证是否装好：

```bash
docker --version
docker info   # 出现 Server 信息即为运行正常
```

### 第 2 步：准备部署目录

把本仓库的 `easyconnect/docker-compose.yml` 复制到一个你记得住的目录（例如 `D:\easyconnect`），然后在该目录打开终端。

> 也可以自己新建 `docker-compose.yml`，内容如下（记得把 `PASSWORD` 改成你自己的密码）：

```yaml
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
      - PASSWORD=你的密码
      - USE_NOVNC=1
    ports:
      - "127.0.0.1:1080:1080"  # SOCKS5
      - "127.0.0.1:8899:8888"  # HTTP 代理（NUAAgent 用这个）
      - "127.0.0.1:8080:8080"  # 网页 VNC
    volumes:
      - ./ecdata:/root
```

### 第 3 步：拉取镜像并启动

```bash
docker compose up -d
```

首次会从 Docker Hub 拉取镜像（约几百 MB，视网速等待几分钟）。之后自动后台运行。

---

## 登录 EasyConnect

1. 浏览器打开 <http://127.0.0.1:8080>；
2. 输入部署时设置的 VNC 密码（一键脚本默认 `nuaaagent`）；
3. 在出现的 Linux 桌面里打开 **EasyConnect** 客户端；
4. 服务器地址填 `vpn.nuaa.edu.cn`（或学校提供的 EasyConnect 服务器地址），用南航统一身份认证登录；
5. 看到“已连接”即成功。

> 登录状态保存在 `./ecdata` 目录，下次启动免登录。

---

## 验证代理

代理已监听本机 **1080（SOCKS5）** 与 **8899（HTTP）**。验证：

```bash
# Windows PowerShell
curl.exe -x http://127.0.0.1:8899 https://www.baidu.com

# macOS / Linux
curl -x http://127.0.0.1:8899 https://www.baidu.com
```

能返回百度首页内容即代理正常。

---

## 在 NUAAgent 中使用

编辑 `~/.nuaagent/config.json`，把 `proxy` 填为：

```json
"proxy": "http://127.0.0.1:8899"
```

> **校内使用时建议把 `proxy` 留空（直连更稳定）**；校外必须填 EasyConnect 代理。

---

## 常见问题

- **Docker 装好了但 `docker info` 报错 / 一直显示 Docker Engine is running**：多为 Docker Desktop 未完全启动，右键托盘图标等它变绿，或重启 Docker Desktop。
- **`/dev/net/tun` 不存在（Linux）**：`sudo mkdir -p /dev/net && sudo mknod /dev/net/tun c 10 200 && sudo chmod 600 /dev/net/tun`。
- **8080 打不开**：`docker compose ps` 看容器是否 Running；若显示 Exited，`docker compose logs` 看日志。
- **端口被占用**：修改 `docker-compose.yml` 里左侧端口（如 `8899:8888`），容器内 8888 不变。
- **登录后仍连不上校内**：确认 EasyConnect 已“已连接”，且 `proxy` 填的是 `http://127.0.0.1:8899`。
- **Windows 无法直接运行 `.sh`**：用方式一的 `.ps1` 脚本，或用 Git Bash/WSL 运行。

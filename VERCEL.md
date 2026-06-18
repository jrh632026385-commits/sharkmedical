# 鲨鱼医学 · Vercel 部署指南

## 一、快速部署

1. 将项目推送到 GitHub
2. 打开 [vercel.com](https://vercel.com) → **Add New Project** → 导入仓库
3. 框架预设选 **Other**（无需 Next.js）
4. **Framework Settings** 里确认：
   - Build Command：`npm run build`
   - Output Directory：**`.`**（项目根目录，不是 `public`）
   - Install Command：`npm install`
5. 环境变量（Settings → Environment Variables）：

| 变量 | 说明 | 示例 |
|------|------|------|
| `ADMIN_USERNAME` | 管理员用户名 | `admin` |
| `ADMIN_PASSWORD` | 管理员密码（务必改成强密码） | 你的强密码 |
| `SESSION_SECRET` | 会话签名密钥（长随机字符串） | 32 位以上随机字符 |

5. 点击 **Deploy**

部署完成后：

- 前台：`https://你的域名.vercel.app/`
- 登录：`/login.html`
- 注册：`/register.html`
- 后台：`/admin/`（仅管理员）

## 二、Vercel 上的能力说明

### 无需额外配置即可使用

- 静态页面（首页、图谱、登录、注册）
- 读取 `data/site-data.json` 中的站点内容（构建时由 `npm run extract` 生成或提交仓库）
- **管理员登录**（通过环境变量 `ADMIN_USERNAME` / `ADMIN_PASSWORD`）
- 管理员进入 `/admin/` 后台界面

### 需要 Upstash Redis 才能持久化

Vercel Serverless **不能写本地文件**。若不连接 Redis：

- 普通用户 **无法注册**（会提示需连接存储）
- 后台 **无法保存** 疾病/图库/胶片修改

若要在 Vercel 上完整使用注册与后台保存：

1. Vercel 控制台 → 项目 → **Storage** / **Marketplace** → 安装 **Upstash Redis**
2. 连接到本项目（会注入 `UPSTASH_REDIS_REST_URL` 等变量）
3. 重新部署

## 三、推荐工作流

**方式 A（简单）**：Vercel 只跑线上站点；内容在本地改 `data/site-data.json` 后 git push 重新部署。

**方式 B（完整）**：连接 Upstash Redis，线上注册、登录、后台保存均可用。

## 四、本地开发

```bash
npm install
npm run extract
npm run dev
```

## 五、手机访问 Vercel 站点

直接使用 Vercel 分配的域名即可，例如：

`https://shark-medical.vercel.app/`

无需使用 `localhost`。

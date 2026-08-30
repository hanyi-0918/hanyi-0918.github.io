# 韩仪 · 个人作品集

纯静态个人主页，**零构建工具、零后端、零数据库**。浏览器直接打开就能跑。

## 文件结构

| 文件 | 作用 |
|---|---|
| `index.html` | 页面骨架（只有容器，内容由 JS 渲染） |
| `styles.css` | 全部样式，含深/浅色主题 Token |
| `data.js` | **所有内容数据** —— 日常更新只改这一个文件 |
| `app.js` | 渲染逻辑、筛选、详情弹窗、主题切换、滚动高亮 |
| `assets/` | 图片资源（头像等） |
| `.nojekyll` | 告诉 GitHub Pages 不要跑 Jekyll |

## 如何更新内容

编辑 [`data.js`](./data.js)，里面有六个字段：

- `profile` —— 姓名、标语、简介、邮箱、电话、GitHub
- `proof` —— 首屏四张成果卡片（`target` 指向 timeline 里某条的 `id`，点击可跳详情）
- `filters` —— 时间线筛选分类（`id` 要和 timeline 的 `type` 对应）
- `timeline` —— 教育 / 实习 / 项目 / 开源，按时间倒序
- `skills` —— 技能分组
- `achievements` —— 荣誉

timeline 每条有 `details` 数组时，卡片可点击弹出详情；留空数组则是纯展示卡片。

## 本地预览

```bash
python3 -m http.server 8000
```

打开 <http://localhost:8000>。

## 部署

### 方案 A：GitHub Pages

1. 新建仓库 `hanyi-0918.github.io`
2. 推送本目录到 `main` 分支
3. 仓库 Settings → Pages → Source 选 **GitHub Actions**
4. `.github/workflows/pages.yml` 会自动发布到 `https://hanyi-0918.github.io`

### 方案 B：Cloudflare Pages

Cloudflare Dashboard → Workers & Pages → Create → Pages → 连接 Git 仓库：

- Framework preset: **None**
- Build command: 留空
- Build output directory: `/`

国内访问速度通常比 GitHub Pages 好。两个方案可以同时用。

## 待办

- [ ] 放一张头像到 `assets/portrait.jpg`，然后在 `data.js` 的 `profile.portrait` 填 `"./assets/portrait.jpg"`
- [ ] 确认 timeline 里各项数据与最新简历一致

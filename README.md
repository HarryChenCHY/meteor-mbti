# 星陨人格宇宙 · Meteor MBTI

> 一个把 **MBTI 人格测试** 与 **天文知识闯关** 缝合在一起的浪漫向 Web 体验。
> 输入你的 MBTI、星座、血型与喜好，铸造一颗专属于你的「人格陨石」；
> 通过答题积累星星能量，看着它从胚芽形态一路演化到超新星。

## ✨ 项目特色

- **专属陨石生成**：基于 MBTI × 星座 × 血型 × 风格偏好，生成唯一的陨石名称、轨迹、技能与播报文案
- **5 阶演化系统**：胚芽 → 星核 → 星云 → 恒星 → 超新星，能量驱动外观渐变
- **270 题天文知识库**：覆盖太阳系 / 恒星演化 / 星系宇宙 / 航天探索 / 天文观测 / 宇宙物理 6 大主题，每主题 3 难度 × 15 题
- **闯关解锁机制**：高级难度通关 → 解锁主题专属陨石皮肤
- **能量经济**：答对 +20⚡，连击 3 题额外 +10⚡，通关 +50⚡，新皮肤 +100⚡
- **沉浸式视觉**：DarkVeil 暗紫雾霭、StarsCanvas 星空粒子、GooeyNav 流体导航、MeteorOrb 三维陨石球
- **响应式 UI**：桌面侧边导航 + 移动端底栏 Tab，统一组件库

## 🛠 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js 15（App Router · `output: 'export'` 静态导出） |
| 视图 | React 18 |
| 样式 | Tailwind CSS v4 + 自定义 CSS Variables |
| 动画 | GSAP / motion / Framer Motion |
| 3D / 着色器 | three.js · OGL |
| 组件 | Radix UI（Dialog / Progress / Slot）+ shadcn 风格 UI |
| 通知 | Sonner |
| 图标 | lucide-react |
| 部署 | GitHub Pages（`basePath: /meteor-mbti`） |

## 📁 目录结构

```
src/
├─ app/                    # Next.js App Router 页面
│  ├─ page.jsx             # 首页
│  ├─ create/              # 创建陨石（多步表单）
│  ├─ generating/          # 铸造中过场
│  ├─ result/              # 诞生结果
│  ├─ archive/             # 宇宙档案
│  ├─ cultivate/           # 陨石培育
│  ├─ quiz/                # 天文知识闯关
│  ├─ shop/                # 积分商城
│  ├─ skins/               # 皮肤图鉴
│  ├─ layout.jsx           # 根布局（Provider + 全局背景）
│  └─ globals.css          # 全局样式
├─ components/             # 通用组件
│  ├─ Navbar.jsx · MobileTopBar.jsx · MobileTabBar.jsx
│  ├─ DarkVeil.jsx · StarsCanvas.jsx · GooeyNav.jsx
│  ├─ MeteorOrb.jsx · PlanetSphere.jsx · GlowCard.jsx
│  └─ ui/                  # shadcn 风格基础组件
└─ lib/
   ├─ constants.js         # MBTI / 星座 / 阶段阈值 / 主题元数据
   ├─ quiz-data.js         # 270 题题库 + 主题与难度配置
   ├─ quiz-progress.jsx    # 答题进度 Provider（localStorage 持久化）
   ├─ energy-context.jsx   # 星星能量 Provider
   └─ utils.js
```

## 🚀 本地运行

```bash
npm install
npm run dev
```

访问 **http://localhost:3000/meteor-mbti**（注意 `basePath` 前缀）。
若 3000 被占用 Next.js 会自动切换端口（如 3005），按终端提示访问即可。

构建静态站点：

```bash
npm run build
# 产物输出到 ./out
```

## 🎮 玩法速览

1. **创建陨石** — 在 `/create` 填写 MBTI、星座、血型、风格、形态、渲染、人格类型，点击铸造
2. **观看诞生** — `/generating` 过场后跳转 `/result` 查看专属陨石的名称、轨迹、技能、播报与寄语
3. **答题升能** — `/quiz` 选择主题与难度，每轮抽 12 题答对 9 题通关
4. **解锁皮肤** — 通关任一主题的高级难度，自动获得该主题陨石皮肤
5. **演化形态** — 累计能量到达阈值（100 / 300 / 600 / 1000）触发整体形态升级
6. **图鉴回顾** — `/skins` 查看 5 阶通用皮肤 + 6 款主题皮肤的解锁状态
7. **积分商城** — `/shop` 浏览徽章、明信片、票券等周边兑换项

## 📊 能量与进阶

| 阶段 | 名称 | 阈值 | 稀有度 |
|---|---|---|---|
| 0 | 胚芽形态 | 0 | 普通 |
| 1 | 星核形态 | 100 | 进阶 |
| 2 | 星云形态 | 300 | 稀有 |
| 3 | 恒星形态 | 600 | 史诗 |
| 4 | 超新星形态 | 1000 | 传说 |

每道题答对 +20⚡，约需 50 题登顶超新星形态。

## 📝 题库说明

题目存储于 [`src/lib/quiz-data.js`](src/lib/quiz-data.js)，结构：

```js
{ id, topic, difficulty, q, opts: [4 项], ans: 正确索引, explanation }
```

- 6 主题 × 3 难度 × 15 题 = **270 题**
- `pickQuestions` 在每轮抽 12 题随机洗牌
- 难度递进锁：通关初级解锁中级，通关中级解锁高级，通关高级解锁主题皮肤

## 🌐 部署

仓库内置 GitHub Actions 工作流（[.github/workflows](.github/workflows)），推送到 `main` 自动构建并发布到 GitHub Pages。

线上地址：`https://<username>.github.io/meteor-mbti/`

## 📄 License

仅供学习与个人创作演示使用。

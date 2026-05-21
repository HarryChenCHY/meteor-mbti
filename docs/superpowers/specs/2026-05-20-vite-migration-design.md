# 迁移设计：单文件 HTML → Vite + React + OGL

**日期**: 2026-05-20  
**项目**: 星陨人格宇宙 (Meteor MBTI Universe)  
**目标**: 将 `index.html` 单文件应用迁移为正式 Vite + React 项目，以引入 OGL 库实现 DarkVeil CPPN WebGL 背景动画

---

## 1. 背景与动机

当前项目是一个 ~1949 行的单文件 HTML 应用，使用 CDN 加载 React 18 + Tailwind，Babel standalone 做 JSX 转译。存在的问题：

- OGL 是纯 ESM 包，无 UMD/CDN 构建，无法在无 bundler 环境中使用
- 单文件架构导致代码难以维护和拆分
- 缺少 HMR 热更新、类型提示等开发体验

**选定方案 A**：迁移到 Vite + React 正式项目，直接使用用户提供的 OGL 版 DarkVeil 组件。

---

## 2. 技术栈

| 层级 | 选择 | 理由 |
|------|------|------|
| 构建工具 | Vite 5 | 快速 HMR，ESM-first，零配置 React |
| UI 框架 | React 18 | 与现有代码一致 |
| 样式 | Tailwind CSS v3 + PostCSS | 与现有 class 名完全兼容 |
| 3D/WebGL | OGL | 用户指定，DarkVeil 组件依赖 |
| 包管理 | npm | 标准 |

---

## 3. 目标文件结构

```
meteor-mbti/
├── index.html               ← Vite HTML 入口（最简 shell）
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx             ← ReactDOM.createRoot
    ├── App.jsx              ← App 组件 + 路由状态
    ├── index.css            ← 所有 CSS（从 <style> 块迁移）
    ├── constants.js         ← 常量：STAGE_THRESHOLDS、PAGE_TITLES 等
    ├── components/
    │   ├── DarkVeil.jsx     ← OGL 版（用户提供，零改动）
    │   ├── DarkVeil.css     ← darkveil-canvas 样式
    │   ├── StarsCanvas.jsx  ← 星星 canvas 动画
    │   ├── PlanetSphere.jsx ← 3D 星球组件
    │   ├── MeteorOrb.jsx    ← 陨石球组件
    │   ├── Navbar.jsx
    │   ├── MobileTopBar.jsx
    │   ├── MobileTabBar.jsx
    │   ├── MoreMenuSheet.jsx
    │   ├── PageWrapper.jsx
    │   ├── SharedUI.jsx     ← SectionTitle + InfoCard + EnergyBar
    │   └── GlobalFooter.jsx
    └── pages/
        ├── HomePage.jsx
        ├── CreatePage.jsx
        ├── GeneratingPage.jsx
        ├── ResultPage.jsx
        ├── ArchivePage.jsx
        ├── CultivatePage.jsx
        ├── QuizPage.jsx
        ├── ShopPage.jsx
        └── SkinGalleryPage.jsx
```

---

## 4. DarkVeil 集成规格

使用用户提供的原始 OGL 组件代码，**零修改**。在 `App.jsx` 中以全屏背景方式挂载：

```jsx
// App.jsx 背景层
<div style={{ position:'fixed', inset:0, zIndex:0, opacity:0.22, mixBlendMode:'screen' }}>
  <DarkVeil
    hueShift={255}
    warpAmount={0.42}
    speed={0.26}
    noiseIntensity={0.014}
    scanlineIntensity={0}
    scanlineFrequency={0}
    resolutionScale={0.45}
  />
</div>
```

`DarkVeil.css` 内容：
```css
.darkveil-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
```

---

## 5. CSS 迁移规格

将 `index.html` 中 `<style>` 块（约 380 行）完整迁移到 `src/index.css`，结构不变。

Tailwind 配置从 `tailwind.config` 脚本块迁移到 `tailwind.config.js`：
- 自定义颜色：`canvas`, `s1-s3`, `ink`, `nebula.*`
- 自定义动画：`float`, `float-slow`, `float-fast`, `twinkle`, `streak`, `pulseGlow`
- 字体：`Space Grotesk` + `Noto Sans SC`

`src/index.css` 顶部添加 Tailwind 指令：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 6. 组件拆分规格

每个 `function XxxComponent` 从 `<script type="text/babel">` 中提取为独立文件。

**共享 state 传递**：当前 App 组件通过 props 向下传递 `energy`、`onNavigate` 等，保持此模式，不引入额外状态管理库。

**常量文件** (`src/constants.js`)：
- `STAGE_THRESHOLDS`, `STAGES`, `STAGE_COLORS`, `STAGE_SKINS`
- `PAGE_TITLES`, `MORE_MENU`, `MOBILE_TABS`
- `getStage()`, `getStageProgress()`, `isMoreTabPage()`

---

## 7. 不在范围内

- 不引入 React Router（保留现有 `useState` 路由方式）
- 不引入状态管理库（Redux/Zustand）
- 不修改任何业务逻辑或 UI 外观
- 不添加 TypeScript（保持 JS）
- 不修改现有 Tailwind class 名

---

## 8. 实现顺序

1. 初始化 Vite 项目配置文件（`package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`）
2. 创建 Vite `index.html` 入口
3. 迁移 CSS → `src/index.css`
4. 提取常量 → `src/constants.js`
5. 创建 `DarkVeil.jsx` + `DarkVeil.css`（OGL 版）
6. 提取共享组件（`StarsCanvas`, `PlanetSphere`, `MeteorOrb`, `Navbar`, `MobileTabBar`, `MobileTopBar`, `MoreMenuSheet`, `PageWrapper`, `SharedUI`, `GlobalFooter`）
7. 提取各页面组件（`HomePage` → `SkinGalleryPage`）
8. 组装 `App.jsx` + `src/main.jsx`
9. `npm install` + `npm run dev` 验证

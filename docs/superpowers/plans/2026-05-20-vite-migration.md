# Vite + React + OGL 迁移实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 `index.html` 单文件 React 应用迁移为 Vite + React 18 + Tailwind v3 + OGL 正式项目，使 DarkVeil CPPN 背景动画可使用 OGL 库

**架构：** 在现有目录原地初始化 Vite 项目（package.json + vite.config.js），将 index.html 的 1949 行拆分为 src/ 下约 22 个文件。OGL 版 DarkVeil 作为 `src/components/DarkVeil.jsx` 引入，其余组件和页面逐一提取。

**技术栈：** Vite 5, React 18, Tailwind CSS v3, PostCSS, ogl (npm)

---

## 任务 1：项目配置文件

**文件：**
- 创建：`package.json`
- 创建：`vite.config.js`
- 创建：`tailwind.config.js`
- 创建：`postcss.config.js`

- [ ] **步骤 1：创建 package.json**

```json
{
  "name": "meteor-mbti",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "ogl": "^1.0.9",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.11"
  }
}
```

- [ ] **步骤 2：创建 vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **步骤 3：创建 tailwind.config.js**（从 index.html tailwind.config 脚本块迁移）

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Space Grotesk', 'Noto Sans SC', 'system-ui', 'sans-serif'] },
      colors: {
        canvas: '#060606', s1: '#111111', s2: '#1a1a1a', s3: '#222222',
        ink: '#f0f0f0', 'ink-2': '#888888', 'ink-3': '#444444',
        hr: 'rgba(255,255,255,0.07)',
        nebula: { purple: '#6366f1', pink: '#d946ef', cyan: '#22d3ee' }
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        'float-slow': 'float 13s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        streak: 'streak 5s ease-in-out infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        pulseGlow: { '0%,100%': { opacity: .65 }, '50%': { opacity: 1 } },
        twinkle: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: .2, transform: 'scale(0.7)' } },
        streak: { '0%': { opacity: 0, transform: 'translateX(-80%) scaleX(0.3)' }, '20%': { opacity: 1 }, '80%': { opacity: 1, transform: 'translateX(120%) scaleX(1)' }, '100%': { opacity: 0, transform: 'translateX(120%) scaleX(1)' } },
      }
    }
  },
  plugins: [],
};
```

- [ ] **步骤 4：创建 postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **步骤 5：npm install**

```bash
cd c:/Users/haoyu.chen02/Desktop/meteor-mbti
npm install
```

预期：node_modules 目录创建，ogl 包可用

---

## 任务 2：Vite index.html 入口

**文件：**
- 修改：`index.html`（替换为 Vite 最简入口，旧内容备份到 index.html.bak）

- [ ] **步骤 1：备份旧文件**

```bash
cp index.html index.html.bak
```

- [ ] **步骤 2：创建新 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover,maximum-scale=5" />
  <meta name="theme-color" content="#060606" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="format-detection" content="telephone=no" />
  <title>星陨人格宇宙 | Meteor MBTI Universe</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 任务 3：src/index.css

**文件：**
- 创建：`src/index.css`

- [ ] **步骤 1：创建 CSS 文件**（提取自 index.html.bak 的 `<style>` 块，添加 Tailwind 指令）

内容为 Tailwind 指令 + 原有 CSS（~180 行）：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... 所有来自 index.html <style> 块的 CSS ... */
/* 包括：body/html 基础样式、card/glass、btn-primary/btn-outline、nav/mobile-nav */
/* energy-bar/progress-track、orbit、fade-in/page-enter、tag/form-input */
/* pill-tab/eyebrow、hero-light/light-streak-*、hero-headline */
/* planet-float-wrap、hero-aurora、noise-overlay、scrollbar 等 */
```

注：`#darkveil-canvas` 和 `#stars-canvas` 样式将改为由组件内联管理，不需要写入 CSS。

---

## 任务 4：src/constants.js

**文件：**
- 创建：`src/constants.js`

- [ ] **步骤 1：提取所有常量和工具函数**

```js
export const MBTI_LIST = ['INTJ-建筑师', /* ...完整列表... */];
export const SIGNS = ['白羊座', /* ... */];
export const BLOODS = ['A型', 'B型', 'O型', 'AB型'];
export const STYLES = ['偏可爱', '偏神秘', '偏酷感', '偏治愈'];
export const FORMS = ['更像陨石', '更像宇宙精灵'];
export const RENDERS = ['3D的手办感', '卡通插画感'];
export const PTYPES = ['守护型', '探索型', '预言型', '社交型'];

export const MOCK_RESULT = { /* ... */ };
export const MOCK_ARCHIVE = { /* ... */ };
export const MOCK_QUIZ = [ /* ... */ ];
export const SHOP_ITEMS = [ /* ... */ ];
export const CAT_COLORS = { /* ... */ };

export const STAGE_THRESHOLDS = [0, 100, 300, 600, 1000];
export const STAGES = ['胚芽形态', '星核形态', '星云形态', '恒星形态', '超新星形态'];
export const STAGE_COLORS = [ /* ... */ ];
export const STAGE_SKINS = [ /* ... */ ];

export const PAGE_TITLES = { /* ... */ };
export const MORE_MENU = [ /* ... */ ];
export const MOBILE_TABS = [ /* ... */ ];

export function getStage(energy) { /* ... */ }
export function getStageProgress(energy) { /* ... */ }
export function isMoreTabPage(p) { /* ... */ }
```

---

## 任务 5：DarkVeil 组件（OGL 版）

**文件：**
- 创建：`src/components/DarkVeil.jsx`（OGL 版，用户提供的原始代码）
- 创建：`src/components/DarkVeil.css`

- [ ] **步骤 1：创建 DarkVeil.css**

```css
.darkveil-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
```

- [ ] **步骤 2：创建 DarkVeil.jsx**（完整 OGL 版）

使用用户提供的原始组件代码，只修改导入语句：
```jsx
import { useRef, useEffect } from 'react';
import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';
import './DarkVeil.css';

const vertex = `attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}`;

const fragment = `
#ifdef GL_ES
precision lowp float;
#endif
/* ... 完整 GLSL fragment shader（来自用户粘贴的代码）... */
`;

export default function DarkVeil({ hueShift=0, noiseIntensity=0, scanlineIntensity=0,
  speed=0.5, scanlineFrequency=0, warpAmount=0, resolutionScale=1 }) {
  /* ... 完整 useEffect + canvas ref 实现 ... */
  return <canvas ref={ref} className="darkveil-canvas" />;
}
```

---

## 任务 6：StarsCanvas 组件

**文件：**
- 创建：`src/components/StarsCanvas.jsx`

- [ ] **步骤 1：提取星星动画**

从 index.html.bak 的星星 IIFE 提取为 React 组件：
```jsx
import { useEffect, useRef } from 'react';

export default function StarsCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext('2d');
    let stars = [], raf;
    /* ... resize / init / draw 逻辑完全照搬 ... */
    window.addEventListener('resize', resize);
    resize();
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:1,pointerEvents:'none'}} />;
}
```

---

## 任务 7：PlanetSphere 组件

**文件：**
- 创建：`src/components/PlanetSphere.jsx`

- [ ] **步骤 1：提取 PlanetSphere**

直接从 index.html.bak 提取 `function PlanetSphere` 为独立文件，添加 React 导入：
```jsx
import { React } from 'react'; // Array.from 已是原生，无需额外导入
export default function PlanetSphere({ size, style='pearl', ring=false, stars=false, extraStyle={} }) {
  /* 完整实现（约 80 行）*/
}
```

---

## 任务 8：MeteorOrb 组件

**文件：**
- 创建：`src/components/MeteorOrb.jsx`

- [ ] **步骤 1：提取 MeteorOrb**

```jsx
export default function MeteorOrb({ size=160, colors, glow=true, animate=true, rarity, level }) {
  /* 完整实现（约 190 行）*/
}
```

---

## 任务 9：导航组件

**文件：**
- 创建：`src/components/Navbar.jsx`
- 创建：`src/components/MobileTopBar.jsx`
- 创建：`src/components/MobileTabBar.jsx`
- 创建：`src/components/MoreMenuSheet.jsx`

各文件从 index.html.bak 提取对应函数，各自 `import` 所需常量。

- [ ] **步骤 1：创建 Navbar.jsx**（`function Navbar`，约 35 行）
- [ ] **步骤 2：创建 MobileTopBar.jsx**（`function MobileTopBar`，约 10 行）
- [ ] **步骤 3：创建 MobileTabBar.jsx**（`function MobileTabBar`，约 20 行）
- [ ] **步骤 4：创建 MoreMenuSheet.jsx**（`function MoreMenuSheet`，约 25 行）

---

## 任务 10：共享 UI 组件

**文件：**
- 创建：`src/components/PageWrapper.jsx`
- 创建：`src/components/SharedUI.jsx`（SectionTitle + InfoCard + EnergyBar）
- 创建：`src/components/GlobalFooter.jsx`

- [ ] **步骤 1：创建 PageWrapper.jsx**（约 8 行）
- [ ] **步骤 2：创建 SharedUI.jsx**（三个小组件合并，约 40 行）
- [ ] **步骤 3：创建 GlobalFooter.jsx**（约 20 行）

---

## 任务 11：页面组件

**文件：**
- 创建：`src/pages/HomePage.jsx`
- 创建：`src/pages/CreatePage.jsx`
- 创建：`src/pages/GeneratingPage.jsx`
- 创建：`src/pages/ResultPage.jsx`
- 创建：`src/pages/ArchivePage.jsx`
- 创建：`src/pages/CultivatePage.jsx`
- 创建：`src/pages/QuizPage.jsx`
- 创建：`src/pages/ShopPage.jsx`
- 创建：`src/pages/SkinGalleryPage.jsx`

每个文件从 index.html.bak 提取对应函数，添加：
- `import { useState, useEffect, useRef } from 'react'`
- `import { ... } from '../constants'`
- `import ComponentName from '../components/ComponentName'`
- `export default function PageName(...)`

- [ ] **步骤 1：创建 HomePage.jsx**（约 175 行）
- [ ] **步骤 2：创建 CreatePage.jsx**（约 155 行）
- [ ] **步骤 3：创建 GeneratingPage.jsx**（约 45 行）
- [ ] **步骤 4：创建 ResultPage.jsx**（约 60 行）
- [ ] **步骤 5：创建 ArchivePage.jsx**（约 70 行）
- [ ] **步骤 6：创建 CultivatePage.jsx**（约 85 行）
- [ ] **步骤 7：创建 QuizPage.jsx**（约 90 行）
- [ ] **步骤 8：创建 ShopPage.jsx**（约 155 行）
- [ ] **步骤 9：创建 SkinGalleryPage.jsx**（约 110 行）

---

## 任务 12：App.jsx + main.jsx

**文件：**
- 创建：`src/App.jsx`
- 创建：`src/main.jsx`

- [ ] **步骤 1：创建 App.jsx**

```jsx
import { useState } from 'react';
import DarkVeil from './components/DarkVeil';
import StarsCanvas from './components/StarsCanvas';
import Navbar from './components/Navbar';
import MobileTopBar from './components/MobileTopBar';
import MobileTabBar from './components/MobileTabBar';
import MoreMenuSheet from './components/MoreMenuSheet';
import GlobalFooter from './components/GlobalFooter';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import GeneratingPage from './pages/GeneratingPage';
import ResultPage from './pages/ResultPage';
import ArchivePage from './pages/ArchivePage';
import CultivatePage from './pages/CultivatePage';
import QuizPage from './pages/QuizPage';
import ShopPage from './pages/ShopPage';
import SkinGalleryPage from './pages/SkinGalleryPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [moreOpen, setMoreOpen] = useState(false);
  const [energy, setEnergy] = useState(62);
  const navigate = (p) => { setPage(p); setMoreOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const addEnergy = (n) => setEnergy(e => e + n);
  const spendEnergy = (n) => setEnergy(e => Math.max(e - n, 0));

  return (
    <>
      {/* Background layers */}
      <div style={{ position:'fixed', inset:0, zIndex:0, opacity:0.22, mixBlendMode:'screen', pointerEvents:'none' }}>
        <DarkVeil hueShift={255} warpAmount={0.42} speed={0.26} noiseIntensity={0.014}
          scanlineIntensity={0} scanlineFrequency={0} resolutionScale={0.45} />
      </div>
      <StarsCanvas />

      {/* Mouse glow (desktop only) */}
      <MouseGlow />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* App shell */}
      <div id="app">
        <MobileTopBar page={page} />
        <Navbar current={page} onNavigate={navigate} />
        <MoreMenuSheet open={moreOpen} onClose={() => setMoreOpen(false)} onNavigate={navigate} current={page} />
        {page === 'home' && <HomePage onNavigate={navigate} energy={energy} />}
        {page === 'create' && <CreatePage onNavigate={navigate} />}
        {page === 'generating' && <GeneratingPage onNavigate={navigate} />}
        {page === 'result' && <ResultPage onNavigate={navigate} />}
        {page === 'archive' && <ArchivePage onNavigate={navigate} energy={energy} />}
        {page === 'cultivate' && <CultivatePage onNavigate={navigate} energy={energy} onAddEnergy={addEnergy} />}
        {page === 'quiz' && <QuizPage onNavigate={navigate} onAddEnergy={addEnergy} />}
        {page === 'shop' && <ShopPage onNavigate={navigate} energy={energy} onSpendEnergy={spendEnergy} />}
        {page === 'skins' && <SkinGalleryPage onNavigate={navigate} energy={energy} />}
        <GlobalFooter />
        <MobileTabBar current={page} onNavigate={navigate} moreOpen={moreOpen} setMoreOpen={setMoreOpen} />
      </div>
    </>
  );
}

function MouseGlow() {
  /* desktop-only mouse follow glow，useEffect 添加 mousemove listener */
}
```

- [ ] **步骤 2：创建 src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 任务 13：验证

- [ ] **步骤 1：运行开发服务器**

```bash
npm run dev
```

预期：Vite 启动，控制台无 error，浏览器访问 http://localhost:5173

- [ ] **步骤 2：检查关键功能**
  - 主页加载，DarkVeil 背景动画可见（星云紫色效果）
  - 星星飘落动画可见
  - 星球浮动效果可见（桌面）
  - 点击导航各页面正常切换
  - 答题功能正常，能量累积正常

- [ ] **步骤 3：git commit**

```bash
git add -A
git commit -m "feat: migrate to Vite + React + OGL (DarkVeil CPPN background)"
```

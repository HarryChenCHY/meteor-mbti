# Next.js 迁移实现计划

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。步骤使用复选框（`- [ ]`）语法来跟踪进度。

**目标：** 将 Vite + React 18 + Tailwind v3 项目原地改造为 Next.js 15 App Router + Tailwind v4 + shadcn/ui（JavaScript）。

**架构：** Next.js 15 App Router，文件系统路由；React Context 管理全局能量状态；shadcn/ui 替换自定义 Button/Card/Dialog/Sheet/Badge/Progress；Tailwind v4 CSS-first 配置。

**技术栈：** Next.js 15、Tailwind CSS v4、shadcn/ui、React 18、JavaScript、OGL、GSAP、Motion

---

## 任务 1：包与配置文件

**文件：**
- 修改：`package.json`
- 创建：`next.config.js`
- 创建：`jsconfig.json`
- 创建：`postcss.config.mjs`
- 删除：`vite.config.js`、`tailwind.config.js`、`postcss.config.js`

- [ ] **步骤 1：更新 package.json**

```json
{
  "name": "meteor-mbti",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "gsap": "^3.15.0",
    "motion": "^12.39.0",
    "next": "^15.3.2",
    "ogl": "^1.0.11",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.184.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "lucide-react": "^0.513.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.1.7",
    "@tailwindcss/postcss": "^4.1.7"
  }
}
```

- [ ] **步骤 2：安装依赖**

```bash
npm install
```

预期：安装成功，无 peer dep 错误。

- [ ] **步骤 3：创建 next.config.js**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```

- [ ] **步骤 4：创建 jsconfig.json**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **步骤 5：创建 postcss.config.mjs**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}
  }
};
```

- [ ] **步骤 6：删除旧配置文件**

```bash
del vite.config.js tailwind.config.js postcss.config.js
```

- [ ] **步骤 7：Commit**

```bash
git add package.json next.config.js jsconfig.json postcss.config.mjs
git commit -m "chore: replace vite with next.js 15, tailwind v4"
```

---

## 任务 2：全局样式（Tailwind v4）

**文件：**
- 创建：`src/app/globals.css`（新建目录 `src/app/`）
- 删除：`src/index.css`

- [ ] **步骤 1：创建 src/app/ 目录并写入 globals.css**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Space Grotesk", "Noto Sans SC", system-ui, sans-serif;
  --color-canvas: #060606;
  --color-s1: #111111;
  --color-s2: #1a1a1a;
  --color-s3: #222222;
  --color-ink: #f0f0f0;
  --color-ink-2: #888888;
  --color-ink-3: #444444;
  --color-nebula-purple: #6366f1;
  --color-nebula-pink: #d946ef;
  --color-nebula-cyan: #22d3ee;

  --animate-float: float 9s ease-in-out infinite;
  --animate-float-slow: float 13s ease-in-out infinite;
  --animate-float-fast: float 6s ease-in-out infinite;
  --animate-spin-slow: spin 22s linear infinite;
  --animate-pulse-glow: pulseGlow 4s ease-in-out infinite;
  --animate-twinkle: twinkle 3s ease-in-out infinite;
  --animate-streak: streak 5s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.65; }
    50% { opacity: 1; }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.2; transform: scale(0.7); }
  }
  @keyframes streak {
    0% { opacity: 0; transform: translateX(-80%) scaleX(0.3); }
    20% { opacity: 1; }
    80% { opacity: 1; transform: translateX(120%) scaleX(1); }
    100% { opacity: 0; transform: translateX(120%) scaleX(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes pageEnter {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes aurora {
    0%, 100% { opacity: 0.55; transform: scaleX(1) translateX(0); }
    50% { opacity: 0.85; transform: scaleX(1.06) translateX(2%); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
}

/* shadcn/ui CSS variables — dark theme */
:root {
  --background: 0 0% 4%;
  --foreground: 0 0% 94%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 94%;
  --popover: 0 0% 7%;
  --popover-foreground: 0 0% 94%;
  --primary: 263 70% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 13%;
  --secondary-foreground: 0 0% 88%;
  --muted: 0 0% 10%;
  --muted-foreground: 0 0% 55%;
  --accent: 0 0% 13%;
  --accent-foreground: 0 0% 88%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 100% / 0.07;
  --input: 0 0% 100% / 0.07;
  --ring: 263 70% 50%;
  --radius: 0.5rem;
}

@layer base {
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html {
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
    scroll-behavior: smooth;
  }
  body {
    font-family: var(--font-sans);
    background: #060606;
    color: #f0f0f0;
    overflow-x: hidden;
    min-height: 100dvh;
    -webkit-font-smoothing: antialiased;
  }
  #app { min-height: 100dvh; position: relative; z-index: 1; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #060606; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #3a3a3a; }
  select { color-scheme: dark; }
}

@layer components {
  .card {
    background: #111;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 12px;
    transition: border-color .22s, box-shadow .22s;
  }
  .card:hover { border-color: rgba(255,255,255,0.13); box-shadow: 0 4px 40px rgba(0,0,0,0.45); }

  .glass { background: rgba(10,10,10,0.85); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.07); }

  .btn-primary {
    background: linear-gradient(135deg, #7c3aed 0%, #5e6ad2 100%);
    color: #fff;
    padding: 10px 22px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: -.01em;
    transition: background .2s, transform .14s, box-shadow .2s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    border: none;
    white-space: nowrap;
    box-shadow: 0 2px 16px rgba(124,58,237,0.28);
  }
  .btn-primary:hover { background: linear-gradient(135deg,#8b5cf6 0%,#7282ff 100%); transform: translateY(-1px); box-shadow: 0 6px 28px rgba(124,58,237,0.42); }
  .btn-primary:active { transform: translateY(0); background: linear-gradient(135deg,#6d28d9 0%,#4f5fc7 100%); }

  .btn-outline {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.7);
    padding: 10px 22px;
    border-radius: 8px;
    font-weight: 400;
    font-size: 14px;
    transition: all .18s;
    cursor: pointer;
    white-space: nowrap;
  }
  .btn-outline:hover { border-color: rgba(255,255,255,0.45); color: #fff; background: rgba(255,255,255,0.04); }

  .top-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    height: 56px;
    background: rgba(6,6,6,0.82);
    backdrop-filter: blur(22px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .nav-tab {
    padding: 6px 14px; border-radius: 9999px;
    font-size: 13.5px; font-weight: 400; color: #555;
    transition: color .18s, background .18s; cursor: pointer;
    background: transparent; border: none; font-family: inherit; letter-spacing: -.01em;
  }
  .nav-tab:hover { color: #ccc; }
  .nav-tab.active { color: #f0f0f0; background: rgba(124,58,237,0.18); box-shadow: inset 0 0 0 1px rgba(139,92,246,0.25); }

  .mobile-top-bar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 40; height: 48px;
    background: rgba(6,6,6,0.85); backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
  }
  .mobile-tab-bar {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
    background: rgba(6,6,6,0.9); backdrop-filter: blur(18px);
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .energy-bar {
    height: 100%; border-radius: 9999px;
    background: linear-gradient(90deg, #7c3aed, #a855f7, #c084fc);
    transition: width .65s ease;
    box-shadow: 0 0 8px rgba(168,85,247,0.45);
  }
  .progress-track { background: rgba(255,255,255,0.06); border-radius: 9999px; overflow: hidden; }

  .orbit { border: 1px solid rgba(255,255,255,0.05); border-radius: 50%; position: absolute; pointer-events: none; }

  .fade-in { animation: fadeIn .55s ease forwards; }
  .page-enter { animation: pageEnter .38s ease forwards; }
  .hero-aurora { animation: aurora 10s ease-in-out infinite; }

  .tag {
    display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 11.5px;
    border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
    color: #888; margin: 2px; letter-spacing: .01em;
  }

  .form-input {
    width: 100%; background: #111; border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 11px 14px; color: #f0f0f0; font-size: 14px;
    font-family: inherit; transition: border-color .18s; outline: none;
  }
  .form-input:focus { border-color: rgba(255,255,255,0.32); }
  .form-input option { background: #111; color: #f0f0f0; }

  .pill-tab {
    padding: 6px 16px; border-radius: 9999px; font-size: 13px; font-weight: 500;
    transition: all .18s; cursor: pointer; border: none; font-family: inherit; background: transparent;
  }
  .pill-tab.active { background: rgba(124,58,237,0.22); color: #f0f0f0; box-shadow: inset 0 0 0 1px rgba(139,92,246,0.3); }
  .pill-tab:not(.active) { color: #444; }
  .pill-tab:not(.active):hover { color: #999; }

  .eyebrow { font-size: 11px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase; color: #444; display: block; margin-bottom: 12px; }
  .hero-headline { font-size: clamp(2.6rem,9vw,6.5rem); font-weight: 700; letter-spacing: -.04em; line-height: 1.02; color: #f0f0f0; }

  .touch-pan { touch-action: pan-y; }
  .btn-tap { transition: transform .12s; }

  .planet-float-wrap { transition: transform .35s ease, filter .35s ease; will-change: transform; }
  .planet-float-wrap:hover { filter: brightness(1.18) saturate(1.12); transform: scale(1.06) !important; }

  .noise-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 9996;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: .022; mix-blend-mode: overlay;
  }

  .hero-light { position: absolute; pointer-events: none; border-radius: 50%; background: radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 65%); }
  .light-streak-1 { position: absolute; height: 1px; opacity: 0; pointer-events: none; background: linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent); mix-blend-mode: screen; top: 38%; width: 28%; animation: streak 7s ease-in-out 0s infinite; }
  .light-streak-2 { position: absolute; height: 1px; opacity: 0; pointer-events: none; background: linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent); mix-blend-mode: screen; top: 52%; width: 20%; animation: streak 7s ease-in-out 2.4s infinite; }
  .light-streak-3 { position: absolute; height: 1px; opacity: 0; pointer-events: none; background: linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent); mix-blend-mode: screen; top: 62%; width: 16%; animation: streak 7s ease-in-out 4.8s infinite; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}

@media (hover: hover) { .btn-tap:hover { transform: scale(1.01); } }
@media (hover: none) { .btn-tap:active { transform: scale(.97); } }
```

- [ ] **步骤 2：Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add globals.css with tailwind v4 + migrated custom CSS"
```

---

## 任务 3：Lib 层（常量 + Energy Context）

**文件：**
- 创建：`src/lib/constants.js`（复制 src/constants.js 内容，路径不变）
- 创建：`src/lib/energy-context.jsx`

- [ ] **步骤 1：创建 src/lib/constants.js**

内容与 `src/constants.js` 完全相同（直接复制文件内容），无需修改。

- [ ] **步骤 2：创建 src/lib/energy-context.jsx**

```jsx
'use client';
import { createContext, useContext, useState } from 'react';

const EnergyContext = createContext(null);

export function EnergyProvider({ children }) {
  const [energy, setEnergy] = useState(62);
  const addEnergy = (n) => setEnergy(e => e + n);
  const spendEnergy = (n) => setEnergy(e => Math.max(e - n, 0));
  return (
    <EnergyContext.Provider value={{ energy, addEnergy, spendEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  const ctx = useContext(EnergyContext);
  if (!ctx) throw new Error('useEnergy must be used within EnergyProvider');
  return ctx;
}
```

- [ ] **步骤 3：Commit**

```bash
git add src/lib/constants.js src/lib/energy-context.jsx
git commit -m "feat: add lib/constants and energy context"
```

---

## 任务 4：shadcn/ui 初始化

**文件：**
- 创建：`components.json`（由 shadcn 生成）
- 创建：`src/components/ui/*.jsx`（Button、Card、Dialog、Sheet、Badge、Progress、Sonner）
- 创建：`src/lib/utils.js`（由 shadcn 生成）

- [ ] **步骤 1：运行 shadcn init**

```bash
npx shadcn@latest init
```

交互选项按如下选择：
- Which style would you like to use? → **Default**
- Which color would you like to use as base color? → **Zinc**
- Would you like to use CSS variables for colors? → **Yes**
- Are you using TypeScript (recommended)? → **No**（JavaScript 模式）
- Where is your global CSS file? → `src/app/globals.css`
- Where is your tailwind.config.js located? → 直接回车（Tailwind v4 无此文件）
- Configure the import alias for components: → `@/components`
- Configure the import alias for utils: → `@/lib/utils`

**注意：** 若 init 在 globals.css 中自动追加了 CSS 变量（`:root { --background: ... }`），需要检查是否与任务 2 中手动设置的变量冲突，若有冲突以 shadcn 生成的为准（它会覆盖我们手动写的那段 `:root` block）。

- [ ] **步骤 2：安装所需 shadcn 组件**

```bash
npx shadcn@latest add button card dialog sheet badge progress sonner
```

预期：在 `src/components/ui/` 下生成 `button.jsx`、`card.jsx`、`dialog.jsx`、`sheet.jsx`、`badge.jsx`、`progress.jsx`、`sonner.jsx`。

- [ ] **步骤 3：Commit**

```bash
git add components.json src/components/ui src/lib/utils.js
git commit -m "feat: init shadcn/ui with button card dialog sheet badge progress sonner"
```

---

## 任务 5：静态组件迁移

**文件：**
- 修改：`src/components/PageWrapper.jsx`
- 修改：`src/components/GlobalFooter.jsx`
- 修改：`src/components/SharedUI.jsx`

这三个组件无交互，不需要 `'use client'`，只需修改 import 路径。

- [ ] **步骤 1：更新 src/components/PageWrapper.jsx**

```jsx
export default function PageWrapper({ children }) {
  return (
    <div className="relative z-10 min-h-[100dvh] pt-[calc(3rem+max(0px,env(safe-area-inset-top)))] pb-[max(4.5rem,env(safe-area-inset-bottom,0px)+4rem)] md:pt-14 md:pb-0 touch-pan">
      {children}
    </div>
  );
}
```

（内容不变，无需修改）

- [ ] **步骤 2：更新 src/components/SharedUI.jsx**

```jsx
export function SectionTitle({ title, sub, eyebrow }) {
  return (
    <div className="text-center mb-10 md:mb-14 px-1">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/92 tracking-tight leading-tight" style={{ letterSpacing: '-.025em' }}>{title}</h2>
      {sub && <p className="mt-3 text-white/38 text-sm max-w-lg mx-auto leading-relaxed">{sub}</p>}
    </div>
  );
}

export function InfoCard({ label, value, icon }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-white/35 mb-1.5 tracking-wide">{icon} {label}</div>
      <div className="font-medium text-white/85 text-sm">{value}</div>
    </div>
  );
}

export function EnergyBar({ value, max = 100, label = '星星能量' }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-white/40">{label}</span>
        <span className="text-white/70 font-medium">{value}</span>
      </div>
      <div className="h-1.5 progress-track rounded-full">
        <div className="energy-bar h-full rounded-full" style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
      </div>
    </div>
  );
}
```

（内容不变，无需修改）

- [ ] **步骤 3：GlobalFooter.jsx 无需修改**（内容不变）

- [ ] **步骤 4：Commit**

```bash
git add src/components/PageWrapper.jsx src/components/SharedUI.jsx src/components/GlobalFooter.jsx
git commit -m "chore: confirm static components unchanged"
```

---

## 任务 6：Canvas/WebGL 组件迁移

**文件：**
- 修改：`src/components/DarkVeil.jsx`（添加 'use client'）
- 修改：`src/components/StarsCanvas.jsx`（添加 'use client'）
- 修改：`src/components/MeteorOrb.jsx`（添加 'use client'）
- 修改：`src/components/PlanetSphere.jsx`（添加 'use client'）

- [ ] **步骤 1：DarkVeil.jsx — 添加 'use client' 指令**

在文件第一行插入：
```jsx
'use client';
```
其余内容保持不变。

- [ ] **步骤 2：StarsCanvas.jsx — 添加 'use client' 指令**

在文件第一行插入：
```jsx
'use client';
```
其余内容保持不变。

- [ ] **步骤 3：MeteorOrb.jsx — 添加 'use client' 指令**

在文件第一行插入：
```jsx
'use client';
```
其余内容保持不变。

- [ ] **步骤 4：PlanetSphere.jsx — 添加 'use client' 指令**

在文件第一行插入：
```jsx
'use client';
```
其余内容保持不变。

- [ ] **步骤 5：Commit**

```bash
git add src/components/DarkVeil.jsx src/components/StarsCanvas.jsx src/components/MeteorOrb.jsx src/components/PlanetSphere.jsx
git commit -m "feat: add 'use client' to canvas/webgl components"
```

---

## 任务 7：导航组件迁移

**文件：**
- 修改：`src/components/Navbar.jsx`
- 修改：`src/components/MobileTopBar.jsx`
- 修改：`src/components/MobileTabBar.jsx`（整合 MoreMenuSheet）
- 修改：`src/components/MoreMenuSheet.jsx`

- [ ] **步骤 1：更新 src/components/Navbar.jsx**

```jsx
'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const pages = [
    { key: '/', label: '首页' }, { key: '/create', label: '创建' },
    { key: '/quiz', label: '答题' }, { key: '/shop', label: '积分商城' },
    { key: '/archive', label: '档案' }, { key: '/cultivate', label: '养成' }, { key: '/skins', label: '皮肤图鉴' }
  ];
  return (
    <nav className="hidden md:block top-nav">
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => router.push('/')}>
          <span className="text-xl">🌠</span>
          <div className="leading-none">
            <span className="font-semibold text-white text-sm tracking-tight">星陨宇宙</span>
            <span className="block text-[9px] text-white/25 tracking-widest mt-px hidden lg:block">METEOR MBTI</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {pages.map(p => (
            <button key={p.key} onClick={() => router.push(p.key)}
              className={`nav-tab ${pathname === p.key ? 'active' : ''}`}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={() => router.push('/create')} className="btn-primary shrink-0" style={{ padding: '8px 18px', fontSize: '13px' }}>
          立即生成
        </button>
      </div>
    </nav>
  );
}
```

- [ ] **步骤 2：更新 src/components/MobileTopBar.jsx**

```jsx
'use client';
import { usePathname } from 'next/navigation';

const PAGE_TITLES = {
  '/': '星陨宇宙', '/create': '创建陨石', '/generating': '铸造中',
  '/result': '诞生结果', '/archive': '宇宙档案', '/cultivate': '陨石培育',
  '/quiz': '天文挑战', '/shop': '积分商城', '/skins': '皮肤图鉴'
};

export default function MobileTopBar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || '星陨宇宙';
  return (
    <header className="md:hidden mobile-top-bar" style={{ paddingTop: 'max(0px,env(safe-area-inset-top))' }}>
      <div className="h-12 flex items-center justify-center px-3">
        <span className="text-sm font-medium text-white/75 tracking-tight">{title}</span>
      </div>
    </header>
  );
}
```

- [ ] **步骤 3：更新 src/components/MoreMenuSheet.jsx**

```jsx
'use client';
import { useRouter, usePathname } from 'next/navigation';

const MORE_MENU = [
  { key: '/archive', label: '宇宙档案', icon: '📂' },
  { key: '/cultivate', label: '养成', icon: '🌱' },
  { key: '/skins', label: '皮肤图鉴', icon: '🎨' }
];

export default function MoreMenuSheet({ open, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  if (!open) return null;
  return (
    <div className="md:hidden fixed inset-0 z-[55] flex flex-col justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative card border-t-0 rounded-t-2xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] max-h-[78vh] overflow-y-auto touch-pan"
        style={{ background: '#0e0e0e', borderColor: 'rgba(255,255,255,0.08)' }}
        onClick={e => e.stopPropagation()}>
        <div className="w-8 h-0.5 bg-white/15 rounded-full mx-auto mb-4" />
        <p className="text-center text-xs text-white/30 mb-3 tracking-widest uppercase">更多</p>
        <div className="grid grid-cols-3 gap-2">
          {MORE_MENU.map(m => (
            <button key={m.key} onClick={() => { router.push(m.key); onClose(); }}
              className={`btn-tap flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium min-h-[4.5rem] transition-all ${pathname === m.key ? 'border-white/25 bg-white/08 text-white' : 'border-white/07 bg-white/03 text-white/45'}`}>
              <span className="text-xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3 rounded-xl border border-white/07 text-sm text-white/35">关闭</button>
      </div>
    </div>
  );
}
```

- [ ] **步骤 4：更新 src/components/MobileTabBar.jsx（整合 MoreMenuSheet state）**

```jsx
'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import MoreMenuSheet from './MoreMenuSheet';

const MOBILE_TABS = [
  { key: '/', icon: '🏠', label: '首页' },
  { key: '/create', icon: '✨', label: '创建' },
  { key: '/quiz', icon: '📝', label: '答题' },
  { key: '/shop', icon: '🎁', label: '商城' },
  { key: '__more__', icon: '⋯', label: '更多' }
];

const MORE_PAGES = ['/archive', '/cultivate', '/generating', '/result', '/skins'];

export default function MobileTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav className="md:hidden mobile-tab-bar" style={{ paddingBottom: 'max(0px,env(safe-area-inset-bottom))' }}>
        <div className="grid grid-cols-5 h-14 max-w-lg mx-auto">
          {MOBILE_TABS.map(t => {
            const active = t.key === '__more__'
              ? (MORE_PAGES.includes(pathname) || moreOpen)
              : pathname === t.key;
            return (
              <button key={t.key} type="button"
                onClick={() => t.key === '__more__' ? setMoreOpen(true) : router.push(t.key)}
                className={`btn-tap relative flex flex-col items-center justify-center gap-0.5 min-w-0 ${active ? 'text-white' : 'text-white/28'}`}>
                {active && <span className="absolute top-1.5 w-4 h-px rounded-full bg-white/60" />}
                <span className="text-lg leading-none mt-1">{t.icon}</span>
                <span className="text-[10px] font-medium leading-tight tracking-tight">{t.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      <MoreMenuSheet open={moreOpen} onClose={() => setMoreOpen(false)} />
    </>
  );
}
```

- [ ] **步骤 5：Commit**

```bash
git add src/components/Navbar.jsx src/components/MobileTopBar.jsx src/components/MobileTabBar.jsx src/components/MoreMenuSheet.jsx
git commit -m "feat: migrate navigation components to next/navigation"
```

---

## 任务 8：根布局

**文件：**
- 创建：`src/app/layout.jsx`
- 删除：`src/main.jsx`、`src/App.jsx`

- [ ] **步骤 1：创建 src/app/layout.jsx**

```jsx
import dynamic from 'next/dynamic';
import { EnergyProvider } from '@/lib/energy-context';
import StarsCanvas from '@/components/StarsCanvas';
import Navbar from '@/components/Navbar';
import MobileTopBar from '@/components/MobileTopBar';
import MobileTabBar from '@/components/MobileTabBar';
import GlobalFooter from '@/components/GlobalFooter';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const DarkVeil = dynamic(() => import('@/components/DarkVeil'), { ssr: false });

export const metadata = {
  title: '星陨人格宇宙',
  description: 'MBTI × 天文 | 铸造专属陨石人格',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <EnergyProvider>
          <div id="app">
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.22, mixBlendMode: 'screen', pointerEvents: 'none' }}>
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
            <StarsCanvas />
            <MobileTopBar />
            <Navbar />
            {children}
            <GlobalFooter />
            <MobileTabBar />
          </div>
          <Toaster />
        </EnergyProvider>
      </body>
    </html>
  );
}
```

- [ ] **步骤 2：删除旧文件**

```bash
del src\main.jsx src\App.jsx src\index.css
```

- [ ] **步骤 3：Commit**

```bash
git add src/app/layout.jsx
git commit -m "feat: add next.js root layout with providers"
```

---

## 任务 9：页面迁移

**文件：**
- 创建：`src/app/page.jsx`（HomePage）
- 创建：`src/app/create/page.jsx`
- 创建：`src/app/generating/page.jsx`
- 创建：`src/app/result/page.jsx`
- 创建：`src/app/archive/page.jsx`
- 创建：`src/app/cultivate/page.jsx`
- 创建：`src/app/quiz/page.jsx`
- 创建：`src/app/shop/page.jsx`
- 创建：`src/app/skins/page.jsx`

**所有页面的通用转换规则：**
1. 文件顶部加 `'use client';`
2. 导入路径 `../constants` → `@/lib/constants`
3. 导入路径 `../components/X` → `@/components/X`
4. 删除 `onNavigate` prop，改用 `const router = useRouter(); router.push('/path')`
5. 删除 `energy` prop，改用 `const { energy } = useEnergy()`
6. 删除 `onAddEnergy` / `onSpendEnergy` prop，改用 `const { addEnergy, spendEnergy } = useEnergy()`

- [ ] **步骤 1：创建 src/app/page.jsx（首页）**

```jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { getStage } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PlanetSphere from '@/components/PlanetSphere';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function HomePage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(hover:hover)').matches) return;
    const handler = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - .5) * 2,
        y: (e.clientY / window.innerHeight - .5) * 2,
      });
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const planets = [
    { size: 248, style: 'pearl', x: 2, y: 4, parallax: .018, floatClass: 'animate-float-slow', delay: '0s' },
    { size: 158, style: 'violet', x: 72, y: 1, parallax: -.025, floatClass: 'animate-float', delay: '.8s', ring: true },
    { size: 88, style: 'ghost', x: 87, y: 48, parallax: .03, floatClass: 'animate-float-fast', delay: '1.5s' },
    { size: 192, style: 'lavender', x: 78, y: 66, parallax: -.02, floatClass: 'animate-float-slow', delay: '2.1s', stars: true },
    { size: 68, style: 'ice', x: 1, y: 62, parallax: .025, floatClass: 'animate-float-fast', delay: '0.4s' },
    { size: 122, style: 'deep', x: 56, y: 80, parallax: -.018, floatClass: 'animate-float', delay: '1.2s' },
    { size: 52, style: 'ghost', x: 40, y: 3, parallax: .032, floatClass: 'animate-float-fast', delay: '2.8s' },
    { size: 148, style: 'pearl', x: 12, y: 76, parallax: -.022, floatClass: 'animate-float', delay: '1.8s' },
    { size: 78, style: 'rose', x: 92, y: 20, parallax: .022, floatClass: 'animate-float-fast', delay: '3.2s' },
  ];

  const exampleCards = [
    { name: '星陨·烈焰', mbti: 'ENTJ', sign: '狮子座', lvl: 3 },
    { name: '星陨·幽蓝', mbti: 'INFP', sign: '双鱼座', lvl: 1 },
    { name: '星陨·翠灵', mbti: 'ENFP', sign: '双子座', lvl: 2 },
    { name: '星陨·暗影', mbti: 'INTJ', sign: '天蝎座', lvl: 0 },
  ];

  return (
    <PageWrapper>
      <section ref={containerRef} className="relative min-h-[90dvh] flex flex-col items-center justify-center text-center px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="hero-aurora" style={{
            width: '75vw', maxWidth: 680, height: '55vw', maxHeight: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(100,52,205,0.13) 0%, rgba(80,32,188,0.07) 38%, transparent 72%)',
            filter: 'blur(58px)',
          }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg,transparent,rgba(139,92,246,0.28),transparent)' }} />

        <div className="hidden md:block absolute inset-0 pointer-events-none overflow-hidden">
          {planets.map((p, i) => (
            <div key={i} className={`planet-float-wrap ${p.floatClass}`} style={{
              position: 'absolute',
              left: `${p.x}%`, top: `${p.y}%`,
              transform: `translate(${mousePos.x * p.parallax * 100}px, ${mousePos.y * p.parallax * 80}px)`,
              animationDelay: p.delay,
              transition: 'transform .12s ease-out',
              pointerEvents: 'auto',
            }}>
              <PlanetSphere size={p.size} style={p.style} ring={!!p.ring} stars={!!p.stars} />
            </div>
          ))}
        </div>

        <div className="light-streak-1" style={{ left: 0 }} />
        <div className="light-streak-2" style={{ left: 0 }} />
        <div className="light-streak-3" style={{ left: 0 }} />

        <div className="relative z-10 fade-in max-w-4xl mx-auto">
          <div className="mb-7 flex justify-center scale-90 sm:scale-100">
            <MeteorOrb size={110} level={getStage(energy)} glow={true} animate={true} />
          </div>
          <h1 className="hero-headline mx-auto px-2">星陨人格宇宙</h1>
          <p className="text-sm text-white/30 mt-3 tracking-[.22em] uppercase font-light">Meteor MBTI Universe</p>
          <p className="mt-6 text-base md:text-lg text-white/45 max-w-xl mx-auto leading-relaxed font-light">
            把你的性格、星座、记忆与宇宙信息<br />
            铸造成唯一的<span className="text-white/75 font-medium">陨石生命体</span>
          </p>
          <div className="mt-10 flex gap-3 justify-center flex-wrap">
            <button onClick={() => router.push('/create')} className="btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
              🌠 立即生成我的陨石
            </button>
            <button onClick={() => router.push('/shop')} className="btn-outline" style={{ padding: '12px 24px', fontSize: '15px' }}>
              积分商城
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-20">
        <SectionTitle eyebrow="已诞生的星陨" title="每颗都独一无二" sub="承载着主人的灵魂印记" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {exampleCards.map((c, i) => (
            <div key={i} className="card p-5 text-center fade-in" style={{ animationDelay: `${i * .08}s` }}>
              <div className="flex justify-center mb-4" style={{ minHeight: 120, alignItems: 'center' }}>
                <MeteorOrb size={72} level={c.lvl} animate={true} />
              </div>
              <h3 className="font-medium text-white/85 text-sm">{c.name}</h3>
              <div className="mt-2 flex gap-1 justify-center flex-wrap">
                <span className="tag">{c.mbti}</span>
                <span className="tag">{c.sign}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 py-20">
        <SectionTitle eyebrow="铸造逻辑" title="六维参数，AI 推演专属陨石" />
        <div className="flex flex-wrap justify-center items-center gap-2 text-center">
          {['MBTI', '星座', '血型', '年龄', '照片', 'AI推演'].map((t, i) => (
            <span key={i} className="contents">
              <div className="card px-5 py-3 text-sm font-medium text-white/65">{t}</div>
              {i < 5 && <span className="text-white/20 text-lg">+</span>}
            </span>
          ))}
          <span className="text-white/20 text-lg mx-2">=</span>
          <div className="card px-5 py-3 text-sm font-medium text-white/85" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>专属陨石人格</div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-20">
        <SectionTitle eyebrow="成长系统" title="答题积累能量，解锁华丽形态" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📝', title: '天文答题', desc: '回答天文知识题，每题答对 +20 星星能量', action: '去答题', path: '/quiz' },
            { icon: '🌱', title: '陨石养成', desc: '持续喂养让陨石从胚芽进化到超新星形态', action: '去养成', path: '/cultivate' },
            { icon: '🎁', title: '积分兑换', desc: '用积累的星星能量兑换天文馆专属奖品', action: '去商城', path: '/shop' },
          ].map((item, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-medium text-white/82 mb-2 text-sm">{item.title}</h3>
              <p className="text-xs text-white/35 mb-5 leading-relaxed">{item.desc}</p>
              <button onClick={() => router.push(item.path)} className="btn-outline text-xs" style={{ padding: '8px 18px' }}>
                {item.action} →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-5 py-20 text-center">
        <SectionTitle eyebrow="永生机制" title="宇宙档案 · 永恒存在" />
        <div className="card p-10 text-white/40 text-sm leading-relaxed">
          每颗陨石人格一经铸造，即获得永久宇宙编号。它的成长记录、性格演化、星轨数据将被永久收录在星际档案馆中。即使星海变迁，你的陨石也将在这片数字宇宙中永恒闪耀。
        </div>
      </section>

      <footer className="border-t border-white/05 py-10 text-center text-white/20 text-xs">
        <p className="mb-1">🌠 星际档案馆 · Meteor MBTI Universe</p>
        <p>© 2026 星陨人格宇宙 — 你的灵魂，值得一颗星</p>
      </footer>
    </PageWrapper>
  );
}
```

- [ ] **步骤 2：创建 src/app/create/page.jsx**

```jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MBTI_LIST, SIGNS, BLOODS, STYLES, FORMS, RENDERS, PTYPES } from '@/lib/constants';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nickname: '', mbti: '', sign: '', blood: '', age: '', style: '', form: '', render: '', ptype: '' });
  const upd = (k, v) => setForm({ ...form, [k]: v });
  const titles = ['基础人格信息', '上传形象信息', '生成偏好选择', '确认铸造'];

  return (
    <PageWrapper>
      <div className="max-w-2xl mx-auto px-5 py-16 md:py-20">
        <SectionTitle eyebrow={`STEP ${step}/4`} title="铸造你的陨石人格" sub={titles[step - 1]} />

        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 h-px rounded-full transition-all duration-500"
              style={{ background: step >= s ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.08)' }} />
          ))}
        </div>

        <div className="card p-7 md:p-10 page-enter" key={step}>
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">昵称</label>
                <input value={form.nickname} onChange={e => upd('nickname', e.target.value)}
                  placeholder="输入你的宇宙代号" className="form-input" />
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">MBTI 类型</label>
                <select value={form.mbti} onChange={e => upd('mbti', e.target.value)} className="form-input">
                  <option value="">选择你的 MBTI</option>
                  {MBTI_LIST.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/38 mb-2 block tracking-wide">星座</label>
                  <select value={form.sign} onChange={e => upd('sign', e.target.value)} className="form-input">
                    <option value="">选择星座</option>
                    {SIGNS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/38 mb-2 block tracking-wide">血型</label>
                  <select value={form.blood} onChange={e => upd('blood', e.target.value)} className="form-input">
                    <option value="">选择血型</option>
                    {BLOODS.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">年龄</label>
                <input type="number" value={form.age} onChange={e => upd('age', e.target.value)}
                  placeholder="输入年龄" className="form-input" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="border border-dashed border-white/12 rounded-xl p-10 text-center hover:border-white/22 transition-colors cursor-pointer">
                <div className="text-3xl mb-3">📷</div>
                <p className="text-white/45 text-sm">点击上传个人形象照片</p>
                <p className="text-white/22 text-xs mt-1">支持 JPG/PNG，建议正面清晰照</p>
              </div>
              <div className="border border-dashed border-white/08 rounded-xl p-7 text-center hover:border-white/15 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-white/32 text-sm">上传风格参考图（可选）</p>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">希望生成的风格</label>
                <div className="flex gap-2 flex-wrap">
                  {STYLES.map(s => (
                    <button key={s} onClick={() => upd('style', s)}
                      className={`tag cursor-pointer transition-all ${form.style === s ? '!border-white/35 !bg-white/08 !text-white/80' : ''}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">角色形态偏好</label>
                <div className="flex gap-3">
                  {FORMS.map(f => (
                    <button key={f} onClick={() => upd('form', f)}
                      className={`flex-1 card p-4 text-center text-sm cursor-pointer transition-all ${form.form === f ? '!border-white/35 text-white/85' : 'text-white/40'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">视觉风格偏好</label>
                <div className="flex gap-3">
                  {RENDERS.map(r => (
                    <button key={r} onClick={() => upd('render', r)}
                      className={`flex-1 card p-4 text-center text-sm cursor-pointer transition-all ${form.render === r ? '!border-white/35 text-white/85' : 'text-white/40'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-white/38 mb-2 block tracking-wide">人格倾向</label>
                <div className="grid grid-cols-2 gap-3">
                  {PTYPES.map(p => (
                    <button key={p} onClick={() => upd('ptype', p)}
                      className={`card p-4 text-center text-sm cursor-pointer transition-all ${form.ptype === p ? '!border-white/35 text-white/85' : 'text-white/40'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h3 className="text-sm font-medium text-white/65 mb-4 tracking-wide">📋 铸造信息确认</h3>
              <div className="grid grid-cols-2 gap-2.5 text-sm">
                {[['昵称', form.nickname || '星尘旅人'], ['MBTI', form.mbti || 'INFP-调停者'], ['星座', form.sign || '双鱼座'], ['血型', form.blood || 'O型'], ['年龄', form.age || '22'], ['风格', form.style || '偏治愈'], ['形态', form.form || '宇宙精灵'], ['视觉', form.render || '卡通插画'], ['人格', form.ptype || '守护型']].map(([k, v], i) => (
                  <div key={i} className="card p-3">
                    <span className="text-white/30 text-xs tracking-wide">{k}</span>
                    <div className="font-medium text-white/75 mt-0.5 text-sm">{v}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => router.push('/generating')} className="btn-primary w-full justify-center mt-4" style={{ padding: '14px', fontSize: '15px' }}>
                🌠 开始铸造我的陨石人格
              </button>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1
              ? <button onClick={() => setStep(step - 1)} className="text-white/30 hover:text-white/65 transition-colors text-sm">← 上一步</button>
              : <span />
            }
            {step < 4 && (
              <button onClick={() => setStep(step + 1)} className="btn-outline text-sm" style={{ padding: '8px 20px' }}>下一步 →</button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 3：创建 src/app/generating/page.jsx**

```jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';

export default function GeneratingPage() {
  const router = useRouter();
  const steps = ['扫描宇宙坐标...', '读取MBTI维度...', '匹配星宿参数...', '重组陨石碎片...', '生成人格轨迹...', '编写宇宙档案...', '铸造唯一生命编号...', '完成！'];
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => {
        if (i >= steps.length - 1) { clearInterval(t); setTimeout(() => router.push('/result'), 800); return i; }
        return i + 1;
      });
      setProgress(p => Math.min(p + 13, 100));
    }, 900);
    return () => clearInterval(t);
  }, []);

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center px-5">
        <div className="relative w-44 h-44 mb-12 flex items-center justify-center">
          <div className="orbit w-full h-full" style={{ animation: 'spin 3.5s linear infinite' }} />
          <div className="orbit absolute" style={{ width: '70%', height: '70%', animation: 'spin 2.2s linear infinite reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <MeteorOrb size={80} level={0} glow={true} animate={true} />
          </div>
        </div>
        <div className="text-center max-w-md w-full">
          <h2 className="text-xl font-semibold text-white/82 mb-6 tracking-tight">陨石铸造中</h2>
          <div className="space-y-2 mb-8 text-left">
            {steps.map((s, i) => (
              <div key={i} className={`text-sm transition-all duration-500 flex items-center gap-2 ${i <= idx ? 'text-white/65' : 'text-white/15'} ${i === idx ? '!text-white/90 font-medium' : ''}`}>
                <span className="w-4 text-xs">{i < idx ? '✓' : i === idx ? '⟐' : '·'}</span>
                {s}
              </div>
            ))}
          </div>
          <div className="h-px progress-track">
            <div style={{ height: 1, width: `${progress}%`, background: 'rgba(255,255,255,0.5)' }} />
          </div>
          <p className="mt-3 text-xs text-white/25">{progress}%</p>
        </div>
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 4：创建 src/app/result/page.jsx**

```jsx
'use client';
import { useRouter } from 'next/navigation';
import { MOCK_RESULT } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { InfoCard } from '@/components/SharedUI';

export default function ResultPage() {
  const router = useRouter();
  const d = MOCK_RESULT;
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-[320px_1fr] gap-10">
          <div className="flex flex-col items-center">
            <div className="page-enter">
              <MeteorOrb size={220} level={2} glow={true} animate={true} />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-white/90 tracking-tight">{d.name}</h1>
            <p className="text-white/28 text-xs mt-2 tracking-widest font-light">{d.id}</p>
            <div className="flex gap-1 mt-4 flex-wrap justify-center">
              {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="mt-8 flex gap-3 flex-wrap justify-center w-full">
              <button onClick={() => router.push('/archive')} className="btn-primary text-sm">💾 存入宇宙档案</button>
              <button onClick={() => router.push('/cultivate')} className="btn-outline text-sm">🌱 开始培育陨石</button>
              <button onClick={() => router.push('/create')}
                className="text-xs text-white/25 hover:text-white/55 underline underline-offset-4 mt-2 w-full text-center transition-colors">
                重新铸造
              </button>
            </div>
          </div>

          <div className="space-y-3 fade-in">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
              <InfoCard icon="🪐" label="星球代码" value={d.planetCode} />
              <InfoCard icon="🧬" label="MBTI映射" value={d.mbti} />
              <InfoCard icon="⭐" label="守护星宿" value={d.star} />
              <InfoCard icon="🌱" label="成长阶段" value={d.stage} />
              <InfoCard icon="♓" label="星座" value={d.sign} />
              <InfoCard icon="🛤" label="行动轨迹" value={d.trajectory.join(' ')} />
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-2 tracking-wide">📖 性格描述</h3>
              <p className="text-white/55 text-sm leading-relaxed">{d.desc}</p>
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-2 tracking-wide">🔮 初始技能</h3>
              <div className="flex gap-1.5 flex-wrap">
                {d.skills.map(s => <span key={s} className="tag !text-white/60 !border-white/15">{s}</span>)}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-2 tracking-wide">💫 羁绊说明</h3>
              <p className="text-white/50 text-sm leading-relaxed">{d.bindDesc}</p>
            </div>
            <div className="card p-5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <h3 className="text-xs text-white/45 mb-2 tracking-wide">📡 今日宇宙播报</h3>
              <p className="text-white/55 text-sm leading-relaxed">{d.broadcast}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 5：创建 src/app/archive/page.jsx**

```jsx
'use client';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { MOCK_ARCHIVE, STAGES, getStage, getStageProgress } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function ArchivePage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const a = MOCK_ARCHIVE;
  const stage = getStage(energy);
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="宇宙档案" title="你的专属星际身份证" />
        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          <div className="space-y-4">
            <div className="card p-7 text-center">
              <div className="text-5xl mb-3">{a.avatar}</div>
              <h3 className="font-semibold text-white/82">{a.nickname}</h3>
              <p className="text-white/30 text-xs mt-1">宇宙旅人</p>
              <div className="mt-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/35">星星能量</span>
                  <span className="text-white/65 font-medium">{energy}</span>
                </div>
                <div className="h-1.5 progress-track rounded-full">
                  <div className="energy-bar h-full rounded-full" style={{ width: `${Math.min(getStageProgress(energy), 100)}%` }} />
                </div>
                <p className="text-xs text-white/28 mt-1.5">{STAGES[stage]} · 阶段 {stage + 1}/5</p>
              </div>
            </div>
            <div className="card p-6 text-center">
              <div className="flex justify-center"><MeteorOrb size={90} level={stage} glow={true} animate={true} /></div>
              <p className="font-medium text-white/72 mt-3 text-sm">{a.meteorName}</p>
              <p className="text-xs text-white/30 mt-0.5">{STAGES[stage]}</p>
            </div>
            <button onClick={() => router.push('/quiz')} className="btn-primary w-full justify-center text-sm">📝 去答题赚取能量 →</button>
            <button onClick={() => router.push('/shop')} className="btn-outline w-full text-sm">🎁 前往积分商城 →</button>
          </div>

          <div className="space-y-3">
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-3 tracking-wide">🔮 技能列表</h3>
              <div className="space-y-3">
                {a.skills.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/65 w-20 shrink-0">{s.name}</span>
                    <div className="flex-1 h-1 bg-white/06 rounded-full overflow-hidden">
                      <div className="h-full bg-white/45 rounded-full" style={{ width: `${s.lv * 30}%` }} />
                    </div>
                    <span className="text-xs text-white/38 w-10 text-right">Lv.{s.lv}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-xs text-white/30 mb-3 tracking-wide">📅 成长时间线</h3>
              <div className="space-y-3 border-l border-white/08 pl-4">
                {a.timeline.map((t, i) => (
                  <div key={i}>
                    <span className="text-xs text-white/30">{t.date}</span>
                    <p className="text-sm text-white/55 mt-0.5">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-5" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
              <h3 className="text-xs text-white/38 mb-2 tracking-wide">🔭 最近占卜播报</h3>
              <p className="text-sm text-white/50">{a.recentDivine}</p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 6：创建 src/app/cultivate/page.jsx**

```jsx
'use client';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { STAGES, getStage, getStageProgress } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function CultivatePage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const stage = getStage(energy);
  const progress = getStageProgress(energy);
  const skills = [
    { name: '星语感应', lv: 2, max: 5 },
    { name: '梦境编织', lv: 1, max: 5 },
    { name: '星尘护盾', lv: 1, max: 5 },
    { name: '时空漫步', lv: 0, max: 5 },
  ];
  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="陨石培育舱" title="用星星能量喂养你的陨石" />
        <div className="grid md:grid-cols-[1fr_280px] gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <div className="orbit w-full h-full opacity-20" style={{ animation: 'spin 22s linear infinite' }} />
              <div className="orbit absolute" style={{ width: '75%', height: '75%', opacity: .12, animation: 'spin 14s linear infinite reverse' }} />
              <div className="orbit absolute" style={{ width: '52%', height: '52%', opacity: .08, animation: 'spin 9s linear infinite' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <MeteorOrb size={130} level={stage} glow={true} animate={true} />
              </div>
            </div>
            <p className="text-base font-semibold text-white/82 tracking-tight">{STAGES[stage]}</p>
            <p className="text-xs text-white/30 mt-1">阶段 {stage + 1}/{STAGES.length}</p>
            <div className="w-full max-w-md mt-5">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-white/35">阶段进度</span>
                <span className="text-white/60 font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 progress-track rounded-full">
                <div className="energy-bar h-full rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-white/25 mt-2 text-center">总星星能量：{energy}</p>
            </div>
            <div className="flex gap-3 mt-8">
              {STAGES.map((s, i) => (
                <div key={i} className={`text-center transition-all ${i <= stage ? 'opacity-100' : 'opacity-20'}`}>
                  <div className="flex justify-center mb-1">
                    <MeteorOrb size={32} level={i} glow={i === stage} animate={false} />
                  </div>
                  <p className="text-[9px] text-white/35 w-12 text-center leading-tight">{s.replace('形态', '')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="text-sm font-medium text-white/65 mb-3">⚡ 积累能量</h3>
              <div className="space-y-2">
                <button onClick={() => router.push('/quiz')} className="btn-primary w-full justify-center text-xs" style={{ padding: '11px' }}>
                  📝 去答题获取能量 +20/题
                </button>
                <p className="text-[10px] text-white/25 text-center pt-1">答题是积累星星能量的唯一方式</p>
              </div>
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-white/45 mb-3">🌿 技能树</h3>
              {skills.map(s => (
                <div key={s.name} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/55">{s.name}</span>
                    <span className="text-white/35">Lv.{s.lv}/{s.max}</span>
                  </div>
                  <div className="h-1 bg-white/06 rounded-full overflow-hidden">
                    <div className="h-full bg-white/35 rounded-full" style={{ width: `${(s.lv / s.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-5">
              <h3 className="text-sm font-medium text-white/38 mb-2">✨ 稀有度</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`text-base ${i <= stage + 1 ? 'text-white/75' : 'text-white/10'}`}>★</span>
                ))}
              </div>
            </div>
            <button onClick={() => router.push('/shop')} className="btn-outline w-full text-xs" style={{ padding: '11px' }}>
              🎁 用能量兑换奖品
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 7：创建 src/app/quiz/page.jsx**

```jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { MOCK_QUIZ } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function QuizPage() {
  const router = useRouter();
  const { addEnergy } = useEnergy();
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const q = MOCK_QUIZ[qi];

  const answer = (i) => {
    setChosen(i);
    if (i === q.ans) { setScore(s => s + 20); setStreak(s => s + 1); addEnergy(20); }
    else { setStreak(0); }
    setTimeout(() => {
      setChosen(null);
      const next = qi + 1;
      if (next >= MOCK_QUIZ.length) { setFinished(true); }
      else { setQi(next); }
    }, 1200);
  };

  if (finished) return (
    <PageWrapper>
      <div className="max-w-xl mx-auto px-5 py-16 text-center">
        <div className="flex justify-center mb-6">
          <MeteorOrb size={110} level={Math.min(Math.floor(score / 200), 4)} glow={true} animate={true} />
        </div>
        <h2 className="text-2xl font-bold text-white/88 mb-2 tracking-tight">答题完成！</h2>
        <p className="text-white/40 mb-2">本轮获得 <span className="text-xl font-bold text-white/82">{score}</span> 星星能量</p>
        <p className="text-xs text-white/22 mb-10">能量已同步到你的陨石成长值</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => { setQi(0); setScore(0); setStreak(0); setFinished(false); }} className="btn-primary">再来一轮 🔄</button>
          <button onClick={() => router.push('/shop')} className="btn-outline">去兑换奖品 🎁</button>
          <button onClick={() => router.push('/cultivate')}
            className="text-xs text-white/25 hover:text-white/55 underline underline-offset-4 transition-colors">
            查看陨石成长
          </button>
        </div>
      </div>
    </PageWrapper>
  );

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto px-5 py-16">
        <div className="flex items-start justify-between mb-8 gap-4">
          <SectionTitle eyebrow={`第 ${qi + 1} 题 / 共 ${MOCK_QUIZ.length} 题`} title="天文知识挑战" />
          <div className="text-right shrink-0 pt-1">
            <div className="text-xs text-white/28">本轮得分</div>
            <div className="text-2xl font-bold text-white/82">{score}</div>
            {streak >= 2 && <div className="text-xs text-white/45 mt-0.5">🔥 连续 {streak}</div>}
          </div>
        </div>

        <div className="card p-7">
          <div className="flex items-center gap-3 mb-5">
            <MeteorOrb size={34} level={0} glow={false} animate={false} />
            <span className="text-xs text-white/28">正在喂养：星陨·织梦者 · 答对 +20 ⚡</span>
          </div>
          <h3 className="text-lg font-semibold text-white/88 mb-6 leading-snug">{q.q}</h3>
          <div className="space-y-2.5">
            {q.opts.map((o, i) => {
              let cls = 'card p-4 cursor-pointer text-sm transition-all w-full text-left ';
              if (chosen !== null) {
                if (i === q.ans) cls += '!border-white/45 !bg-white/06 text-white/90';
                else if (i === chosen) cls += '!border-white/15 !bg-white/03 text-white/25';
                else cls += 'opacity-30';
              } else cls += 'hover:!border-white/22 text-white/65 hover:text-white/85';
              return <button key={i} onClick={() => chosen === null && answer(i)} className={cls}>{o}</button>;
            })}
          </div>
          {chosen !== null && (
            <div className={`mt-4 text-sm text-center font-medium ${chosen === q.ans ? 'text-white/75' : 'text-white/40'}`}>
              {chosen === q.ans ? '✨ 正确！+20 星星能量' : '💫 加油，下次一定！'}
            </div>
          )}
        </div>

        <div className="mt-5 flex justify-center gap-1.5">
          {MOCK_QUIZ.map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i < qi ? 'bg-white/55' : i === qi ? 'bg-white/88' : 'bg-white/12'}`} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 8：创建 src/app/shop/page.jsx**

```jsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { SHOP_ITEMS, CAT_COLORS, STAGE_SKINS, STAGES, getStage, getStageProgress, STAGE_THRESHOLDS } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';
import { toast } from 'sonner';

export default function ShopPage() {
  const router = useRouter();
  const { energy, spendEnergy } = useEnergy();
  const [cat, setCat] = useState('全部');
  const [modal, setModal] = useState(null);
  const [redeemed, setRedeemed] = useState({});
  const cats = ['全部', '周边', '特权', '限定'];
  const filtered = cat === '全部' ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.cat === cat);

  const confirm = (item) => {
    spendEnergy(item.cost);
    setRedeemed(r => ({ ...r, [item.id]: true }));
    setModal(null);
    toast(`✨ 兑换成功！${item.name} 已加入你的星际邮包`);
  };

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="积分商城" title="用星星能量兑换专属奖励" />

        <div className="card p-5 mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/30 mb-1.5 tracking-wide">当前星星能量</div>
            <div className="text-3xl font-bold text-white/88 tracking-tight">⚡ {energy}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/25 mb-2">答题赚取更多能量</div>
            <button onClick={() => router.push('/quiz')} className="btn-outline text-xs" style={{ padding: '8px 16px' }}>📝 去答题</button>
          </div>
        </div>

        <div className="card p-5 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-medium text-sm text-white/72">✨ 陨石皮肤图鉴</h3>
              <p className="text-[10px] text-white/28 mt-0.5">星星能量越多，形态越华丽绚烂</p>
            </div>
            <button onClick={() => router.push('/skins')} className="btn-outline text-xs" style={{ padding: '7px 14px' }}>查看详情 →</button>
          </div>
          <div className="flex items-end justify-center gap-5 py-1">
            {STAGE_SKINS.map((skin, i) => {
              const unlocked = energy >= skin.threshold;
              const isCurrent = getStage(energy) === i;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className={`transition-all duration-300 ${!unlocked ? 'opacity-18 grayscale' : ''}`}
                    style={{ transform: isCurrent ? 'scale(1.32)' : 'scale(1)', transformOrigin: 'bottom center' }}>
                    <MeteorOrb size={36} level={i} glow={unlocked} animate={false} />
                  </div>
                  <p className={`text-[9px] text-center leading-tight ${isCurrent ? 'text-white/75 font-medium' : 'text-white/22'}`}>
                    {skin.name.replace('形态', '')}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[10px] text-white/25 mt-3">
            当前：<span className="text-white/60">{STAGES[getStage(energy)]}</span>
            {getStage(energy) < 4
              ? <span>　·　距下一阶段还需 <span className="text-white/65 font-semibold">⚡ {STAGE_THRESHOLDS[getStage(energy) + 1] - energy}</span></span>
              : <span className="text-white/50 ml-1">· 已达最高形态 🌟</span>
            }
          </p>
        </div>

        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`pill-tab ${cat === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {filtered.map(item => {
            const canAfford = energy >= item.cost;
            const isRedeemed = redeemed[item.id];
            return (
              <div key={item.id} className={`card p-4 flex flex-col transition-all ${isRedeemed ? 'opacity-55' : ''}`}>
                <div className="text-3xl text-center mb-3">{item.icon}</div>
                <h3 className="font-medium text-sm text-white/82 mb-1 text-center">{item.name}</h3>
                <p className="text-xs text-white/32 mb-3 text-center leading-relaxed flex-1">{item.desc}</p>
                <div className="flex items-center justify-between mb-2.5">
                  <span className={`tag text-[10px] py-0.5 px-2 ${CAT_COLORS[item.cat] || ''}`}>{item.cat}</span>
                  <span className="text-[10px] text-white/22">余 {item.left}</span>
                </div>
                <div className="text-center font-semibold mb-3">
                  <span className={canAfford && !isRedeemed ? 'text-white/72' : 'text-white/22'}>⚡ {item.cost}</span>
                </div>
                <button
                  disabled={isRedeemed || !canAfford}
                  onClick={() => !isRedeemed && canAfford && setModal(item)}
                  className={`w-full text-xs py-2 rounded-lg font-medium transition-all ${
                    isRedeemed ? 'border border-white/22 text-white/38' :
                    canAfford ? 'btn-primary justify-center' : 'border border-white/08 text-white/22 cursor-not-allowed'
                  }`}>
                  {isRedeemed ? '✓ 已兑换' : canAfford ? '立即兑换' : '能量不足'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 card p-5" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-medium text-white/38 mb-2.5">⚡ 如何获取星星能量？</h3>
          <div className="flex items-start gap-2 text-xs text-white/30">
            <span>📝</span>
            <span>参与<button onClick={() => router.push('/quiz')} className="text-white/55 underline underline-offset-2 mx-1 hover:text-white/75 transition-colors">天文知识答题</button>，每题答对 +20 星星能量。答题是积累能量的唯一途径。</span>
          </div>
        </div>

        {modal && (
          <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-5"
            onClick={() => setModal(null)}>
            <div className="card p-7 max-w-sm w-full page-enter" onClick={e => e.stopPropagation()}>
              <div className="text-4xl text-center mb-4">{modal.icon}</div>
              <h3 className="text-lg font-semibold text-white/88 text-center mb-1">{modal.name}</h3>
              <p className="text-xs text-white/35 text-center mb-6">{modal.desc}</p>
              <div className="space-y-2.5 mb-6">
                <div className="flex justify-between items-center card p-3.5">
                  <span className="text-sm text-white/38">所需能量</span>
                  <span className="text-lg font-bold text-white/82">⚡ {modal.cost}</span>
                </div>
                <div className="flex justify-between items-center card p-3.5">
                  <span className="text-sm text-white/38">兑换后余额</span>
                  <span className="text-lg font-bold text-white/65">⚡ {energy - modal.cost}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="flex-1 btn-outline text-sm">取消</button>
                <button onClick={() => confirm(modal)} className="flex-1 btn-primary justify-center text-sm">确认兑换</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 9：创建 src/app/skins/page.jsx**

```jsx
'use client';
import { useRouter } from 'next/navigation';
import { useEnergy } from '@/lib/energy-context';
import { STAGE_SKINS, STAGES, STAGE_THRESHOLDS, getStage, getStageProgress } from '@/lib/constants';
import MeteorOrb from '@/components/MeteorOrb';
import PageWrapper from '@/components/PageWrapper';
import { SectionTitle } from '@/components/SharedUI';

export default function SkinGalleryPage() {
  const router = useRouter();
  const { energy } = useEnergy();
  const currentStage = getStage(energy);
  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto px-5 py-16">
        <SectionTitle eyebrow="皮肤图鉴" title="陨石形态演化" sub="通过天文答题积累星星能量，解锁越来越华丽的陨石形态" />

        <div className="card p-5 mb-8 flex items-center justify-between">
          <div>
            <div className="text-xs text-white/28 mb-1.5 tracking-wide">当前星星能量</div>
            <div className="text-2xl font-bold text-white/88 tracking-tight">⚡ {energy}</div>
            <div className="text-xs text-white/30 mt-1">当前形态：<span className="text-white/65 font-medium">{STAGES[currentStage]}</span></div>
          </div>
          <button onClick={() => router.push('/quiz')} className="btn-primary text-sm" style={{ padding: '10px 20px' }}>
            📝 去答题赚能量
          </button>
        </div>

        <div className="space-y-4">
          {STAGE_SKINS.map((skin, i) => {
            const isUnlocked = energy >= skin.threshold;
            const isCurrent = currentStage === i;
            const isNextUp = currentStage === i - 1;
            const neededEnergy = isUnlocked ? 0 : skin.threshold - energy;
            return (
              <div key={i} className={`card p-5 transition-all duration-300 ${isCurrent ? '!border-white/25' : ''} ${!isUnlocked ? 'opacity-45' : ''}`}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="shrink-0 relative flex items-center justify-center" style={{ minWidth: 120, minHeight: 120 }}>
                    <MeteorOrb size={96} level={i} glow={isUnlocked} animate={isUnlocked} />
                    {!isUnlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl opacity-60">🔒</span>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap" style={{ letterSpacing: '.02em' }}>
                        当前形态
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-white/88">{skin.name}</h3>
                      <span className={`tag text-[10px] py-0.5 px-2.5 ${skin.rarityColor}`}>{skin.rarity}</span>
                      {isCurrent && <span className="tag text-[10px] py-0.5 px-2 !border-white/25 !bg-white/06 !text-white/65">✓ 当前</span>}
                      {!isUnlocked && isNextUp && <span className="tag text-[10px] py-0.5 px-2 !border-white/15 !text-white/40">下一目标</span>}
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed mb-3">{skin.desc}</p>
                    <div className="flex items-center gap-4 justify-center md:justify-start text-xs flex-wrap">
                      <span className="text-white/28">解锁要求：{skin.threshold === 0 ? '初始解锁' : `⚡ ${skin.threshold}`}</span>
                      {isUnlocked
                        ? <span className="text-white/50 font-medium">✓ 已解锁</span>
                        : <span className="text-white/40 font-medium">还需 +{neededEnergy} 能量</span>
                      }
                    </div>
                  </div>

                  {!isUnlocked && isNextUp && (
                    <div className="shrink-0 w-36 text-center">
                      <div className="text-xs text-white/25 mb-1.5">解锁进度</div>
                      <div className="h-1.5 progress-track rounded-full">
                        <div className="energy-bar h-full rounded-full" style={{ width: `${getStageProgress(energy)}%` }} />
                      </div>
                      <p className="text-sm font-bold text-white/65 mt-1">{getStageProgress(energy)}%</p>
                      <p className="text-[10px] text-white/28 mt-0.5">再答 {Math.ceil(neededEnergy / 20)} 题</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {currentStage < 4 && (
          <div className="mt-8 text-center card p-8" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="text-2xl mb-3">📝</div>
            <p className="text-white/65 font-medium mb-1.5">答题是唯一积累星星能量的方式</p>
            <p className="text-xs text-white/28 mb-6">
              每道天文知识题答对 +20 星星能量<br />
              距下一阶段还需 ⚡ {STAGE_THRESHOLDS[currentStage + 1] - energy} 能量，约需再答 {Math.ceil((STAGE_THRESHOLDS[currentStage + 1] - energy) / 20)} 题
            </p>
            <button onClick={() => router.push('/quiz')} className="btn-primary" style={{ padding: '11px 28px' }}>
              🚀 立即去答题解锁新形态
            </button>
          </div>
        )}
        {currentStage >= 4 && (
          <div className="mt-8 text-center card p-8" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
            <div className="text-3xl mb-3">🌟</div>
            <p className="text-white/85 font-bold text-lg mb-1.5">已达传说级：超新星形态</p>
            <p className="text-xs text-white/30">你的陨石已进化至最高形态，在宇宙中熠熠生辉</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
```

- [ ] **步骤 10：Commit**

```bash
git add src/app/
git commit -m "feat: migrate all 9 pages to next.js app router"
```

---

## 任务 10：清理旧文件并验证

**文件：**
- 删除：`src/main.jsx`（已在任务 8 步骤 2 删除）
- 删除：`src/App.jsx`（已在任务 8 步骤 2 删除）
- 删除：`src/index.css`（已在任务 8 步骤 2 删除）
- 删除：`src/constants.js`（被 `src/lib/constants.js` 替代）
- 删除：`src/pages/`（所有旧页面）

- [ ] **步骤 1：删除旧 src 文件**

```bash
del src\constants.js
rmdir /s /q src\pages
```

- [ ] **步骤 2：验证开发服务器启动**

```bash
npm run dev
```

预期：控制台输出 `▲ Next.js 15.x.x`，`Local: http://localhost:3000`，无 ERROR。

若报错 `Cannot find module '@/lib/utils'`：shadcn init 未生成该文件，手动创建：
```js
// src/lib/utils.js
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

- [ ] **步骤 3：逐页检查（浏览器）**

访问以下路由，确认无白屏、无控制台 Error：
- `http://localhost:3000/` — 首页，DarkVeil 背景可见，星球浮动正常
- `http://localhost:3000/create` — 4 步表单可切换
- `http://localhost:3000/quiz` — 答题可点击，能量累加
- `http://localhost:3000/shop` — 商品列表正常，兑换 toast 弹出
- `http://localhost:3000/skins` — 皮肤列表，锁定/解锁状态正确
- `http://localhost:3000/archive` — 档案页正常
- `http://localhost:3000/cultivate` — 培育页正常
- `http://localhost:3000/generating` — 进度条动画，自动跳转到 /result

- [ ] **步骤 4：验证构建**

```bash
npm run build
```

预期：`✓ Compiled successfully`，0 errors。

- [ ] **步骤 5：最终 Commit**

```bash
git add -A
git commit -m "feat: complete next.js 15 + tailwind v4 + shadcn/ui migration"
```

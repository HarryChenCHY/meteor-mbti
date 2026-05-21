# Next.js 迁移设计规格

> **面向 AI 代理的工作者：** 必需子技能：使用 superpowers:executing-plans 逐任务实现此计划。

**目标：** 将现有 Vite 5 + React 18 + Tailwind v3 项目原地改造为 Next.js 15 App Router + Tailwind v4 + shadcn/ui（JavaScript）架构。

**架构：** Next.js 15 App Router，文件系统路由替代 useState 手动路由；React Context 管理全局能量状态；shadcn/ui 深度替换自定义 CSS 组件类。

**技术栈：** Next.js 15、Tailwind CSS v4、shadcn/ui、React 18、JavaScript（无 TypeScript）、OGL、Three.js、GSAP、Motion

---

## 文件结构

### 删除
- `vite.config.js`
- `postcss.config.js`
- `tailwind.config.js`
- `src/main.jsx`
- `src/App.jsx`
- `src/index.css`

### 新增
- `next.config.js`
- `jsconfig.json`
- `src/app/layout.jsx`
- `src/app/globals.css`
- `src/app/page.jsx`
- `src/app/create/page.jsx`
- `src/app/generating/page.jsx`
- `src/app/result/page.jsx`
- `src/app/archive/page.jsx`
- `src/app/cultivate/page.jsx`
- `src/app/quiz/page.jsx`
- `src/app/shop/page.jsx`
- `src/app/skins/page.jsx`
- `src/lib/energy-context.jsx`
- `src/components/ui/` （shadcn/ui 自动生成：button、card、dialog、sheet、badge、progress、sonner）

### 迁移（路径变更）
- `src/constants.js` → `src/lib/constants.js`
- `src/components/*.jsx` → 保持路径，内容修改（加 `'use client'`，替换 shadcn 组件）

---

## 第一节：包与配置

### package.json
移除：`vite`、`@vitejs/plugin-react`、`autoprefixer`、`postcss`、`tailwindcss@^3`
新增：`next@^15`、`tailwindcss@next`（v4）、`@tailwindcss/postcss`、`class-variance-authority`、`clsx`、`tailwind-merge`、`lucide-react`、`@radix-ui/*`（由 shadcn init 管理）

### next.config.js
```js
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
```

### jsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## 第二节：样式系统（Tailwind v4）

### src/app/globals.css
Tailwind v4 使用 CSS-first 配置，无 `tailwind.config.js`。

```css
@import "tailwindcss";

@theme {
  /* 自定义颜色、字体、动画 */
  --color-primary: oklch(55% 0.28 270);
  --animate-pulse-slow: pulse 3s ease-in-out infinite;
}

@layer base {
  * { box-sizing: border-box; }
  body { background: #0a0a0f; color: white; font-family: var(--font-sans); }
}

@layer components {
  /* 迁移自 src/index.css 的自定义类，仅保留无 shadcn 替代的部分 */
  .tag { @apply inline-flex items-center border border-white/12 bg-white/04 text-white/50 rounded-md px-2 py-0.5 text-xs; }
  .pill-tab { @apply px-4 py-1.5 rounded-full border border-white/10 text-white/45 text-sm transition-all; }
  .pill-tab.active { @apply border-white/25 text-white/80 bg-white/06; }
  .progress-track { @apply bg-white/06; }
  .energy-bar { @apply bg-gradient-to-r from-violet-500 to-purple-400; }
  .page-enter { animation: fadeInUp 0.4s ease forwards; }
}
```

**替换规则（v3 → v4 变化）：**
- `bg-opacity-*` → `bg-black/50`（已经在用斜线语法，无需改动）
- `text-opacity-*` → `text-white/50`（同上）
- `ring-opacity-*` → `ring-black/50`

---

## 第三节：全局状态（Energy Context）

### src/lib/energy-context.jsx
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

---

## 第四节：根布局

### src/app/layout.jsx
```jsx
import { EnergyProvider } from '@/lib/energy-context';
import DarkVeil from '@/components/DarkVeil';
import StarsCanvas from '@/components/StarsCanvas';
import Navbar from '@/components/Navbar';
import MobileTopBar from '@/components/MobileTopBar';
import MobileTabBar from '@/components/MobileTabBar';
import GlobalFooter from '@/components/GlobalFooter';
import { Toaster } from '@/components/ui/sonner';
import dynamic from 'next/dynamic';
import './globals.css';

const DarkVeilClient = dynamic(() => import('@/components/DarkVeil'), { ssr: false });

export const metadata = { title: '星陨人格宇宙', description: 'MBTI × 天文' };

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <EnergyProvider>
          <div id="app">
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.22, mixBlendMode: 'screen', pointerEvents: 'none' }}>
              <DarkVeilClient hueShift={255} warpAmount={0.42} speed={0.26} noiseIntensity={0.014}
                scanlineIntensity={0} scanlineFrequency={0} resolutionScale={0.45} />
            </div>
            <StarsCanvas />
            <MobileTopBar />
            <Navbar />
            {children}
            <GlobalFooter />
            {/* MobileTabBar 内部管理 MoreMenuSheet 和 moreOpen state */}
            <MobileTabBar />
          </div>
          <Toaster />
        </EnergyProvider>
      </body>
    </html>
  );
}
```

---

## 第五节：页面路由

每个页面文件结构：
```jsx
'use client';
import { useEnergy } from '@/lib/energy-context';
import { useRouter } from 'next/navigation';
// ... 原页面组件代码，onNavigate 替换为 router.push('/path')
```

| 原页面 | 新路由文件 | 说明 |
|---|---|---|
| `page === 'home'` | `src/app/page.jsx` | `/` |
| `page === 'create'` | `src/app/create/page.jsx` | `/create` |
| `page === 'generating'` | `src/app/generating/page.jsx` | `/generating` |
| `page === 'result'` | `src/app/result/page.jsx` | `/result` |
| `page === 'archive'` | `src/app/archive/page.jsx` | `/archive` |
| `page === 'cultivate'` | `src/app/cultivate/page.jsx` | `/cultivate` |
| `page === 'quiz'` | `src/app/quiz/page.jsx` | `/quiz` |
| `page === 'shop'` | `src/app/shop/page.jsx` | `/shop` |
| `page === 'skins'` | `src/app/skins/page.jsx` | `/skins` |

**导航替换规则：**
- `onNavigate('quiz')` → `router.push('/quiz')`
- `onClick={() => onNavigate('home')}` → `onClick={() => router.push('/')}`
- Navbar/MobileTabBar/MoreMenuSheet 中的 `current` prop → `usePathname()` 获取当前路由

---

## 第六节：组件迁移策略

### `'use client'` 标记规则
| 组件 | 是否需要 | 原因 |
|---|---|---|
| `DarkVeil.jsx` | ✅ 必须 | OGL WebGL，浏览器 API |
| `StarsCanvas.jsx` | ✅ 必须 | Canvas API，useEffect |
| `MeteorOrb.jsx` | ✅ 必须 | useEffect/动画 |
| `PlanetSphere.jsx` | ✅ 必须 | CSS 动画 state |
| `Navbar.jsx` | ✅ 必须 | usePathname，点击事件 |
| `MobileTopBar.jsx` | ✅ 必须 | usePathname |
| `MobileTabBar.jsx` | ✅ 必须 | usePathname，useState |
| `MoreMenuSheet.jsx` | ✅ 必须 | useState，Sheet（移入 MobileTabBar 内部） |
| `PageWrapper.jsx` | ❌ 不需要 | 纯静态包装 |
| `GlobalFooter.jsx` | ❌ 不需要 | 纯静态 |
| `SharedUI.jsx` | ❌ 不需要 | 纯展示 |

### shadcn/ui 替换映射
| 原实现 | shadcn 组件 | 文件位置 |
|---|---|---|
| `.btn-primary` | `<Button>` | `components/ui/button.jsx` |
| `.btn-outline` | `<Button variant="outline">` | 同上 |
| `.card` div | `<Card><CardContent>` | `components/ui/card.jsx` |
| ShopPage 自定义 modal | `<Dialog>` | `components/ui/dialog.jsx` |
| MoreMenuSheet 自定义底部弹窗 | `<Sheet side="bottom">` | `components/ui/sheet.jsx` |
| `.tag` span | `<Badge variant="outline">` | `components/ui/badge.jsx` |
| `.progress-track` + `.energy-bar` | `<Progress>` | `components/ui/progress.jsx` |
| ShopPage 自定义 toast | `<Sonner>` (toast()) | `components/ui/sonner.jsx` |

### DarkVeil SSR 安全处理
OGL 使用浏览器 API，需动态导入防止 SSR 崩溃：
```jsx
// 在 layout.jsx 或使用处
import dynamic from 'next/dynamic';
const DarkVeil = dynamic(() => import('@/components/DarkVeil'), { ssr: false });
```

---

## 第七节：验证标准

每个任务完成后运行：
```bash
npm run dev
```
逐页访问：`/`、`/create`、`/quiz`、`/shop`、`/skins` 确认无控制台错误。

最终验证：
```bash
npm run build
```
0 错误，0 警告（除 next 内置提示外）。

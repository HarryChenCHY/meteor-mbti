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

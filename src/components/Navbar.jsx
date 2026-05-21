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

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

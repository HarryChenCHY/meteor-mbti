import { PAGE_TITLES } from '../constants';

export default function MobileTopBar({ page }) {
  const title = PAGE_TITLES[page] || '星陨宇宙';
  return (
    <header className="md:hidden mobile-top-bar" style={{ paddingTop: 'max(0px,env(safe-area-inset-top))' }}>
      <div className="h-12 flex items-center justify-center px-3">
        <span className="text-sm font-medium text-white/75 tracking-tight">{title}</span>
      </div>
    </header>
  );
}

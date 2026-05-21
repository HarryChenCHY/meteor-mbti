import { MOBILE_TABS, isMoreTabPage } from '../constants';

export default function MobileTabBar({ current, onNavigate, moreOpen, setMoreOpen }) {
  return (
    <nav className="md:hidden mobile-tab-bar" style={{ paddingBottom: 'max(0px,env(safe-area-inset-bottom))' }}>
      <div className="grid grid-cols-5 h-14 max-w-lg mx-auto">
        {MOBILE_TABS.map(t => {
          const active = t.key === '__more__' ? (isMoreTabPage(current) || moreOpen) : current === t.key;
          return (
            <button key={t.key} type="button"
              onClick={() => t.key === '__more__' ? setMoreOpen(true) : onNavigate(t.key)}
              className={`btn-tap relative flex flex-col items-center justify-center gap-0.5 min-w-0 ${active ? 'text-white' : 'text-white/28'}`}>
              {active && <span className="absolute top-1.5 w-4 h-px rounded-full bg-white/60" />}
              <span className="text-lg leading-none mt-1">{t.icon}</span>
              <span className="text-[10px] font-medium leading-tight tracking-tight">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

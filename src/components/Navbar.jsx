export default function Navbar({ current, onNavigate }) {
  const pages = [
    { key: 'home', label: '首页' }, { key: 'create', label: '创建' },
    { key: 'quiz', label: '答题' }, { key: 'shop', label: '积分商城' },
    { key: 'archive', label: '档案' }, { key: 'cultivate', label: '养成' }, { key: 'skins', label: '皮肤图鉴' }
  ];
  return (
    <nav className="hidden md:block top-nav">
      <div className="max-w-7xl mx-auto px-5 h-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => onNavigate('home')}>
          <span className="text-xl">🌠</span>
          <div className="leading-none">
            <span className="font-semibold text-white text-sm tracking-tight">星陨宇宙</span>
            <span className="block text-[9px] text-white/25 tracking-widest mt-px hidden lg:block">METEOR MBTI</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          {pages.map(p => (
            <button key={p.key} onClick={() => onNavigate(p.key)}
              className={`nav-tab ${current === p.key ? 'active' : ''}`}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={() => onNavigate('create')} className="btn-primary shrink-0" style={{ padding: '8px 18px', fontSize: '13px' }}>
          立即生成
        </button>
      </div>
    </nav>
  );
}

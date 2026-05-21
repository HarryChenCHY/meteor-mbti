export default function GlobalFooter() {
  return (
    <footer className="relative z-10 border-t border-white/05 mt-8 md:mt-12 py-5 md:py-6 px-4 sm:px-6 pb-28 md:pb-6" style={{ background: 'rgba(6,6,6,.92)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-white/22 text-center md:text-left">
        <div className="flex items-center gap-2">
          <span>🛰️</span>
          <div className="leading-tight">
            <div className="font-medium text-white/35 tracking-wider">上海天文馆 出品</div>
            <div className="text-[9px] text-white/18 tracking-[.18em]">SHANGHAI ASTRONOMY MUSEUM</div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-center text-[10px]">
          <span>📍 上海市浦东新区临港大道 380 号</span>
          <span className="text-white/12">|</span>
          <span>☎ 021-2068-6666</span>
        </div>
        <div className="text-[10px] text-white/18">© 2026 星陨人格宇宙</div>
      </div>
    </footer>
  );
}

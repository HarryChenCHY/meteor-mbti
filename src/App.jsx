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

  const navigate = (p) => {
    setPage(p);
    setMoreOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const addEnergy = (n) => setEnergy(e => e + n);
  const spendEnergy = (n) => setEnergy(e => Math.max(e - n, 0));

  return (
    <div id="app">
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.22, mixBlendMode: 'screen', pointerEvents: 'none' }}>
        <DarkVeil hueShift={255} warpAmount={0.42} speed={0.26} noiseIntensity={0.014}
          scanlineIntensity={0} scanlineFrequency={0} resolutionScale={0.45} />
      </div>
      <StarsCanvas />
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
  );
}

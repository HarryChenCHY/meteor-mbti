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

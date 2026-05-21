'use client';
import dynamic from 'next/dynamic';

const DarkVeil = dynamic(() => import('./DarkVeil'), { ssr: false });

export default function ClientDarkVeil(props) {
  return <DarkVeil {...props} />;
}

export default function PageWrapper({ children }) {
  return (
    <div className="relative z-10 min-h-[100dvh] pt-[calc(3rem+max(0px,env(safe-area-inset-top)))] pb-[max(4.5rem,env(safe-area-inset-bottom,0px)+4rem)] md:pt-14 md:pb-0 touch-pan">
      {children}
    </div>
  );
}

    // src/pages/home/BackgroundCarousel.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const slides = Object.values(
  import.meta.glob('@/assets/images/home/*.webp', { eager: true, import: 'default' })
) as string[];

export default function BackgroundCarousel({ visible }: { visible: boolean }) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    if (!visible) return;

    const els = gsap.utils.toArray<HTMLElement>('[data-slide]');

    gsap.to(els[0], { opacity: 1, duration: 1.5, ease: 'power2.out' });

    intervalRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % els.length;
      gsap.to(els[currentRef.current], { opacity: 0, duration: 1.2, ease: 'power2.inOut' });
      gsap.to(els[next], { opacity: 1, duration: 1.2, ease: 'power2.inOut' });
      currentRef.current = next;
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible]);

  return (
    <div className="absolute inset-0 md:left-1/3 left-0">
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          data-slide={i}
          className="absolute inset-0 w-full h-full object-cover object-left"
          style={{ opacity: 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/1 to-transparent" />
    </div>
  );
}
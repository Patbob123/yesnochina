import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import BackgroundCarousel from './BackgroundCarousel';
gsap.registerPlugin(SplitText);

const SQUARES = [
  { letter: 'Y', bg: '#4BAFB8' },
  { letter: 'N', bg: '#E8856A' },
  { letter: 'C', bg: '#f0ca6c' },
  { letter: 'N', bg: '#6bcf6b' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const squaresRef = useRef<HTMLDivElement>(null);
  const fullNameRef = useRef<HTMLSpanElement>(null);
  const careerNetRef = useRef<HTMLSpanElement>(null);
  const navbarRef = useRef<HTMLElement | null>(null);
  const [carouselVisible, setCarouselVisible] = useState(false);

  useGSAP(() => {
    const hasPlayed = sessionStorage.getItem('heroAnimPlayed');

    if (hasPlayed) {
      gsap.set(logoWrapRef.current, { opacity: 0 });
      gsap.set(navbarRef.current, { y: 0, opacity: 1 });
      gsap.set('#heroText', { opacity: 1, x: 0 });
      gsap.set('#theRest', { opacity: 1 });
      gsap.set('#buttons', { opacity: 1 });
      setCarouselVisible(true);
      return;
    }

    if (navbarRef.current) gsap.set(navbarRef.current, { y: -80, opacity: 0 });
    gsap.set('#heroText', { opacity: 0, x: -60 });
    gsap.set('#theRest', { opacity: 0, y: 20 });
    gsap.set('#buttons', { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(squaresRef.current, { scale: 0.5, opacity: 0, duration: 0.8 })
      .from(fullNameRef.current, { width: 0, opacity: 0, duration: 0.7, ease: 'power2.inOut' }, '+=0.2')
      .from(careerNetRef.current, { width: 0, opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.3')
      .to(logoWrapRef.current, {
        scale: 0.3,
        y: () => -(containerRef.current!.offsetHeight),
        opacity: 0,
        duration: 0.9,
        ease: 'power3.inOut',
      }, '+=0.6')
      .to(navbarRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' })
      .to('#heroText', { opacity: 1, x: 0, ease: 'expo.out', duration: 1 }, 'reveal')
      .to('#theRest', { opacity: 1, y: 0, ease: 'expo.out', duration: 1, delay: 0.2 }, 'reveal')
      .to('#buttons', { opacity: 1, y: 0, ease: 'expo.out', duration: 1, delay: 0.4 }, 'reveal')
      .call(() => {
        sessionStorage.setItem('heroAnimPlayed', 'true');
        setCarouselVisible(true);
      });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden bg-white"
    >
      <BackgroundCarousel visible={carouselVisible} />

      {/* Intro logo */}
      <div
        ref={logoWrapRef}
        className="absolute flex items-center gap-6"
        style={{ transformOrigin: 'top left' }}
      >
        <div ref={squaresRef} className="grid grid-cols-2 gap-1.5">
          {SQUARES.map(({ letter, bg }, i) => (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center text-white font-bold text-3xl"
              style={{ backgroundColor: bg }}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <span
            ref={fullNameRef}
            className="whitespace-nowrap text-4xl font-bold tracking-tight text-neutral-800 overflow-hidden"
            style={{ display: 'inline-block' }}
          >
            YOU'RE NEXT
          </span>
          <span
            ref={careerNetRef}
            className="whitespace-nowrap text-4xl text-neutral-500 overflow-hidden"
            style={{ display: 'inline-block' }}
          >
            career network
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div id="heroText" className="absolute h-full left-0 flex flex-col items-start justify-center lg:pl-20 px-10 max-w-2xl">
        <div className="flex flex-col items-start justify-center">
          <div className="font-extrabold lg:text-[4vw] text-[7vw] lg:leading-[4vw] leading-[7vw]">
            Launch your
          </div>
          <div className="font-extrabold lg:text-[4vw] text-[7vw] lg:leading-[4vw] leading-[7vw]">
            career here.
          </div>
        </div>
        <div id="theRest" className="flex flex-col items-start justify-center p-1">
          <div className="text-neutral-500 lg:text-[1.2vw] text-sm my-2">
            guys in uoft career network career network career network career network career network career network
          </div>
        </div>
        <div id="buttons" className="flex gap-x-3">
          <button className="flex justify-center md:text-[2vh] text-[9px] bg-brand-yellow font-bold py-3 px-6 rounded-full duration-200 hover:scale-110 transition-all text-white">
            Get Involved!
          </button>
          <button className="flex justify-center md:text-[2vh] text-[9px] bg-brand-teal font-bold py-3 px-6 rounded-full duration-200 hover:scale-110 transition-all text-white">
            Join as a volunteer!
          </button>
        </div>
      </div>
    </div>
  );
}
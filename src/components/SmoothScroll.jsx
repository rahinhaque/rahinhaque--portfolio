'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Gives a snappy, buttery feel instead of feeling heavy
      smoothWheel: true,
      wheelMultiplier: 1,
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrated RAF loop for lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Optional: Integrations with GSAP ScrollTrigger
    // if (typeof window !== 'undefined' && window.ScrollTrigger) {
    //   lenis.on('scroll', ScrollTrigger.update);
    //   gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    //   gsap.ticker.lagSmoothing(0);
    // }

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

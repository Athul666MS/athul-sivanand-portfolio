import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;

    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: isMobile ? 1.5 : 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Normalize scroll on mobile for consistent ScrollTrigger behavior
    if (isMobile) {
      ScrollTrigger.normalizeScroll(true);
    }

    // Refresh ScrollTrigger after fonts/images are ready
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    // Wait for fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshTriggers);
    }

    // Wait for images
    window.addEventListener('load', refreshTriggers);

    // Refresh on resize (debounced)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('load', refreshTriggers);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (isMobile) {
        ScrollTrigger.normalizeScroll(false);
      }
    };
  }, []);
}

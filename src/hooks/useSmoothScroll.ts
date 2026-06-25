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

    // ─── Refresh ScrollTrigger after layout-affecting events ───

    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    // Wait for fonts — they change text dimensions and section heights
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        // Double-rAF to ensure the browser has repainted with the loaded fonts
        requestAnimationFrame(() => {
          requestAnimationFrame(refreshTriggers);
        });
      });
    }

    // Wait for full page load (all images, stylesheets, iframes, etc.)
    window.addEventListener('load', () => {
      // Double-rAF after load to be certain layout is final
      requestAnimationFrame(() => {
        requestAnimationFrame(refreshTriggers);
      });
    });

    // ─── MutationObserver: catch lazy-loaded Suspense content ───
    // When React.lazy components resolve, the DOM changes (Suspense fallback → real content).
    // This shifts section positions. We must refresh ScrollTrigger when that happens.
    let mutationRefreshTimer: ReturnType<typeof setTimeout>;
    const observer = new MutationObserver(() => {
      // Debounce so we don't refresh 100 times during a burst of DOM changes
      clearTimeout(mutationRefreshTimer);
      mutationRefreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Stop observing after everything has settled (5s after load)
    const stopObserverTimer = setTimeout(() => {
      observer.disconnect();
    }, 5000);

    // ─── Resize handler (debounced) ───
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
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(mutationRefreshTimer);
      clearTimeout(stopObserverTimer);
      observer.disconnect();
      if (isMobile) {
        ScrollTrigger.normalizeScroll(false);
      }
    };
  }, []);
}

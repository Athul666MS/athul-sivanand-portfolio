import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiActivity, FiServer, FiLock, FiTerminal } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const exp = {
    role: "Junior Developer",
    company: "SMEC Technologies",
    period: "2025 - 2026",
    duration: "Full Time",
    logo: "https://ui-avatars.com/api/?name=SM&background=111111&color=C68045&font-size=0.4",
    achievements: [
      { icon: <FiServer className="w-5 h-5" />, text: "Engineered scalable backend systems with Django and MySQL." },
      { icon: <FiActivity className="w-5 h-5" />, text: "Optimized query performance reducing backend response time by 60-70%." },
      { icon: <FiLock className="w-5 h-5" />, text: "Developed modular REST API endpoints with role-based access control." },
      { icon: <FiTerminal className="w-5 h-5" />, text: "Managed deployments across Docker, Postman, and AWS infrastructure." }
    ]
  };

  /**
   * Creates all GSAP animations and ScrollTriggers.
   * Called only after layout is fully stable.
   */
  const initAnimations = useCallback(() => {
    const section = sectionRef.current;
    const progressLine = progressLineRef.current;
    if (!section || !progressLine) return;

    // Kill any previous context to avoid duplicates
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    ctxRef.current = gsap.context(() => {
      const q = gsap.utils.selector(section);

      // ─── Thermometer Progress Line ───
      // Animate ONLY the colored progress line's scaleY from 0 to 1.
      // The circle node stays fixed, only the line grows.
      gsap.set(progressLine, {
        scaleY: 0,
        transformOrigin: 'top center',
      });

      gsap.to(progressLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          end: 'bottom 40%',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Card entrance
      gsap.fromTo(q('.exp-card'),
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: q('.exp-card'), start: "top 80%", invalidateOnRefresh: true }
        }
      );

      // Timeline node pop (inner element only — preserves outer translate centering)
      gsap.fromTo(q('.timeline-node'),
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          clearProps: "scale",
          scrollTrigger: { trigger: q('.exp-card'), start: "top 60%", invalidateOnRefresh: true }
        }
      );

      // Achievement items stagger
      gsap.fromTo(q('.achievement-item'),
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: q('.exp-card'), start: "top 60%", invalidateOnRefresh: true }
        }
      );

      // Image composition
      gsap.fromTo(q('.exp-image'),
        { y: 150, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: q('.exp-image'), start: "top 80%", invalidateOnRefresh: true }
        }
      );
    }, section);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /**
     * Strategy: Wait for ALL layout-affecting resources before creating ScrollTriggers.
     *
     * Root cause of the desktop bug: ScrollTrigger.create() measures element positions
     * immediately. If fonts haven't loaded or images above this section haven't resolved,
     * those measurements are wrong. On resize, ScrollTrigger.refresh() recalculates
     * with the correct layout — which is why resize "fixes" it.
     *
     * The fix: Defer animation init until fonts + images within the section are loaded,
     * then use requestAnimationFrame to ensure the browser has painted the final layout.
     */

    // Collect all images within this section that contribute to layout
    const sectionImages = Array.from(section.querySelectorAll('img'));

    const imagePromises = sectionImages.map((img) => {
      if (img.complete && img.naturalHeight > 0) {
        return Promise.resolve();
      }
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      });
    });

    // Also wait for fonts — they affect text layout and therefore section heights
    const fontPromise = document.fonts?.ready ?? Promise.resolve();

    Promise.all([fontPromise, ...imagePromises]).then(() => {
      // Use double-rAF to ensure the browser has fully laid out and painted
      // before we measure. A single rAF can fire before paint on some browsers.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initAnimations();
        });
      });
    });

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [initAnimations]);

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 lg:py-48 bg-background text-text-dark relative z-20 overflow-hidden">
      
      {/* Background atmosphere */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-black/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-start mb-20 md:mb-32">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-serif uppercase tracking-tighter leading-none" data-cursor-text="CAREER">
            Professional<br />
            <span className="text-primary italic normal-case">Experience</span>
          </h2>
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          
          {/* ─── Timeline Structure ─── */}
          {/* 
            Layer architecture:
            1. Background line (gray) — always full height, always visible
            2. Progress line (brand color) — overlaid, grows via scaleY on scroll
            3. Circle node — fixed at top, never moves
          */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2" style={{ width: '2px' }}>
            {/* Layer 1: Background line — full height, always visible */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: '#E5E5E5' }}
            />
            {/* Layer 2: Progress line — grows from top via scaleY */}
            <div
              ref={progressLineRef}
              className="absolute inset-0 rounded-full will-change-transform"
              style={{
                backgroundColor: '#C68045',
                boxShadow: '0 0 10px rgba(198,128,69,0.5)',
                transformOrigin: 'top center',
                transform: 'scaleY(0)',
              }}
            />
          </div>

          {/* Timeline node — fixed at top, never moves */}
          <div
            className="pointer-events-none absolute left-6 top-[5.5rem] z-20 w-6 h-6 -translate-x-1/2 md:left-1/2"
            aria-hidden="true"
          >
            <div className="timeline-node h-full w-full rounded-full border-4 border-primary bg-background shadow-[0_0_15px_rgba(198,128,69,0.4)]" />
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 pt-10 pb-20 relative">
            
            {/* LEFT: Experience Card */}
            <div className="md:pr-12 lg:pr-20 relative pl-16 md:pl-0">

              {/* Glassmorphism Card */}
              <div 
                className="exp-card w-full bg-white/60 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 cursor-none group will-change-transform" 
                data-cursor-text="SMEC"
              >
                {/* Header */}
                <div className="flex items-center gap-5 mb-8 border-b border-black/5 pb-8">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="w-14 h-14 rounded-2xl shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-sans mb-1 group-hover:text-primary transition-colors leading-tight">
                      {exp.role}
                    </h3>
                    <h4 className="text-base sm:text-lg font-serif italic text-text-secondary">
                      {exp.company}
                    </h4>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full border border-black/10 text-xs font-bold uppercase tracking-widest text-text-secondary">
                    <FiClock className="text-primary" /> {exp.period}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
                    {exp.duration}
                  </div>
                </div>
                
                {/* Achievements */}
                <ul className="flex flex-col gap-5 text-text-secondary">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="achievement-item flex gap-4 items-start group/item will-change-transform">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 text-text-dark group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                      <span className="text-sm md:text-base leading-relaxed pt-2 font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Workspace Image Composition */}
            <div className="md:pl-12 lg:pl-20 relative pl-16 md:pl-12 flex items-start md:pt-16">
              <div className="exp-image w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden relative shadow-[0_30px_60px_rgba(0,0,0,0.15)] group cursor-none will-change-transform" data-cursor-text="WORKSPACE">
                <img 
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=75&fm=webp"
                  alt="Developer workspace at SMEC Technologies"
                  width={800}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] filter grayscale group-hover:grayscale-0"
                />
                {/* Cinematic overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/15 to-transparent mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-[1.5s] pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

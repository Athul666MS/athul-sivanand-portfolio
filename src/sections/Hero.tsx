import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { m, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';

import resumePdf from '../docs/resume.pdf';

const HERO_IMAGE = '/hero.webp';
const HERO_WIDTH = 1120;
const HERO_HEIGHT = 1400;

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefDesktop = useRef<HTMLHeadingElement>(null);
  const textRefMobile = useRef<HTMLHeadingElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRefDesktop = useRef<HTMLDivElement>(null);
  const imageContainerRefMobile = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitTextDesktop = textRefDesktop.current ? new SplitType(textRefDesktop.current, { types: 'lines,words,chars' }) : null;
      const splitTextMobile = textRefMobile.current ? new SplitType(textRefMobile.current, { types: 'lines,words,chars' }) : null;
      const splitBgText = bgTextRef.current ? new SplitType(bgTextRef.current, { types: 'chars' }) : null;

      const charsToAnimate = [
        ...(splitTextDesktop?.chars || []),
        ...(splitTextMobile?.chars || [])
      ];

      const tl = gsap.timeline();

      if (charsToAnimate.length > 0) {
        tl.set(charsToAnimate, { y: 100, opacity: 0 });
      }

      const imageTargets: Element[] = [];
      if (imageContainerRefDesktop.current) imageTargets.push(imageContainerRefDesktop.current);
      if (imageContainerRefMobile.current) imageTargets.push(imageContainerRefMobile.current);
      
      if (imageTargets.length > 0) {
        tl.set(imageTargets, { scale: 1.15, opacity: 0 });
      }

      if (splitBgText?.chars) {
        tl.set(splitBgText.chars, { y: 150, opacity: 0, scale: 0.8 });
        tl.to(splitBgText.chars, {
          y: 0,
          opacity: 0.03,
          scale: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: "power4.out"
        });
      }

      if (imageTargets.length > 0) {
        tl.to(imageTargets, {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: "power3.inOut"
        }, "-=1");
      }

      if (charsToAnimate.length > 0) {
        tl.to(charsToAnimate, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.02,
          ease: "power4.out"
        }, "-=1.5");
      }

      // Left side info stagger
      const leftInfo = containerRef.current?.querySelectorAll('.hero-left-item');
      if (leftInfo && leftInfo.length > 0) {
        tl.fromTo(leftInfo,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
          "-=1.2"
        );
      }

      // Scroll indicator
      const scrollIndicator = containerRef.current?.querySelector('.scroll-indicator');
      if (scrollIndicator) {
        tl.fromTo(scrollIndicator,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }

      return () => {
        splitTextDesktop?.revert();
        splitTextMobile?.revert();
        splitBgText?.revert();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;

    const imageTargets: Element[] = [];
    if (imageContainerRefDesktop.current) imageTargets.push(imageContainerRefDesktop.current);
    if (imageContainerRefMobile.current) imageTargets.push(imageContainerRefMobile.current);

    if (imageTargets.length > 0) {
      gsap.to(imageTargets, {
        x: xPos * 1.5,
        y: yPos * 1.5,
        duration: 1,
        ease: "power2.out"
      });
    }

    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        x: -xPos * 3,
        y: -yPos * 3,
        duration: 1.5,
        ease: "power2.out"
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: xPos * 4,
        y: yPos * 4,
        duration: 1.2,
        ease: "power2.out"
      });
    }
  };

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 120]);

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* ===== ATMOSPHERIC BACKGROUND ===== */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 25%, rgba(198,128,69,0.45) 0 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(17,17,17,0.35) 0 1px, transparent 1px)',
          backgroundSize: '42px 42px, 56px 56px',
        }}
      />
      <div className="absolute left-[-10vw] top-[18%] w-[34vw] h-[34vw] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-[28%] bottom-[-18%] w-[28vw] h-[28vw] rounded-full bg-black/[0.035] blur-[110px] pointer-events-none z-0" />
      <div className="absolute left-[8%] bottom-[18%] w-px h-36 bg-gradient-to-b from-transparent via-primary/[0.08] to-transparent pointer-events-none z-0" />
      
      {/* Giant low-opacity background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <h1 
          ref={bgTextRef}
          className="text-[clamp(4rem,10vw,12rem)] font-black text-primary uppercase whitespace-nowrap tracking-tighter will-change-transform opacity-[0.03] leading-none"
        >
          DEVELOPER
        </h1>
      </div>

      {/* Mouse-following glow behind the image */}
      <div 
        ref={glowRef}
        className="hidden lg:block absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46vw] h-[46vw] max-w-[760px] max-h-[760px] rounded-full pointer-events-none z-[1] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(198,128,69,0.08) 0%, rgba(198,128,69,0.035) 38%, transparent 70%)',
        }}
      />

      {/* =========================================
          DESKTOP LAYOUT (>= 1024px)
          ========================================= */}
      <div className="hidden lg:grid relative z-10 w-full max-w-[1920px] mx-auto h-screen px-8 lg:px-16 xl:px-24 grid-cols-12 grid-rows-[auto_1fr_auto] pointer-events-none">
        
        {/* ===== RIGHT SIDE ATMOSPHERE ===== */}
        <div className="col-start-8 col-end-13 row-start-1 row-end-4 pointer-events-none z-0 relative overflow-hidden">
          {/* Mesh gradients - soft and intentional */}
          <div className="absolute top-[12%] right-[-8%] w-[30vw] h-[30vw] bg-primary/[0.05] rounded-full blur-[125px] mix-blend-multiply" />
          <div className="absolute bottom-[24%] right-[2%] w-[24vw] h-[24vw] bg-primary/[0.04] rounded-full blur-[105px]" />
          <div className="absolute top-[48%] right-[16%] w-[16vw] h-[16vw] bg-black/[0.035] rounded-full blur-[85px]" />
          <div className="absolute top-[34%] right-[28%] w-28 h-28 rounded-full bg-primary/[0.055] blur-3xl" />
          <div className="absolute inset-y-[18%] right-[36%] w-px bg-gradient-to-b from-transparent via-black/[0.06] to-transparent" />
          
          {/* Soft glow particles - organic and subtle */}
          <m.div 
            animate={{ y: [-12, 12], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-[24%] right-[18%] w-16 h-16 bg-primary/[0.045] rounded-full blur-xl"
          />
          <m.div 
            animate={{ y: [10, -10], opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute bottom-[34%] right-[28%] w-24 h-24 bg-primary/[0.035] rounded-full blur-2xl"
          />
          <m.div 
            animate={{ y: [-8, 8], x: [-4, 4], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-[55%] right-[12%] w-10 h-10 bg-primary/[0.05] rounded-full blur-lg"
          />
          <m.div
            animate={{ y: [6, -8], x: [0, 8], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-[68%] right-[40%] w-7 h-7 bg-black/[0.045] rounded-full blur-md"
          />

          {/* Subtle geometric lines */}
          <div className="absolute top-[20%] right-[10%] w-px h-32 bg-gradient-to-b from-transparent via-primary/[0.08] to-transparent" />
          <div className="absolute bottom-[30%] right-[22%] w-px h-24 bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent" />
          <div className="absolute top-[36%] right-[8%] w-28 h-px bg-gradient-to-r from-transparent via-primary/[0.07] to-transparent" />
          <div className="absolute bottom-[22%] right-[34%] w-36 h-px bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
        </div>

        {/* ===== TOP ROW: Left Info + Center Image + Right Vertical Text ===== */}
        <div className="col-start-1 col-end-13 row-start-1 row-end-2 grid grid-cols-12 items-start pt-28 z-20">
          
          {/* Left: Hello section - improved hierarchy */}
          <div className="col-span-3 xl:col-span-3 flex flex-col gap-5 pointer-events-auto">
            <div className="hero-left-item text-[11px] font-bold tracking-[0.35em] text-text-secondary uppercase">
              Thrissur, Kerala
            </div>
            <h2 className="hero-left-item text-[clamp(2rem,3vw,3rem)] leading-none font-serif italic text-text-secondary/60">
              HELLO. 
            </h2>
            <p className="hero-left-item text-sm xl:text-base leading-relaxed text-text-secondary/80 max-w-[260px] font-sans">
              Building scalable backend systems
              <br />
              and modern web experiences.
              <br />
              <br />
              Specializing in REST APIs,
              <br />
              microservices architecture,
              <br />
              and high-performance applications.
            </p>
            <div className="hero-left-item flex flex-wrap gap-3 text-[10px] font-bold tracking-[0.2em] uppercase text-text-secondary">
              <span className="px-4 py-2 bg-black/5 rounded-full border border-black/8 hover:bg-black/10 transition-colors cursor-none" data-cursor-text="TECH">Microservices</span>
              <span className="px-4 py-2 bg-black/5 rounded-full border border-black/8 hover:bg-black/10 transition-colors cursor-none" data-cursor-text="TECH">Django</span>
              <span className="px-4 py-2 bg-black/5 rounded-full border border-black/8 hover:bg-black/10 transition-colors cursor-none" data-cursor-text="TECH">React</span>
            </div>

            {/* Buttons */}
            <div className="hero-left-item flex gap-5 mt-2">
              <MagneticButton>
                <a 
                  href="#projects" 
                  className="group flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary text-white hover:bg-text-dark transition-all duration-300 font-bold text-[11px] tracking-widest uppercase cursor-none shadow-[0_0_30px_rgba(198,128,69,0.25)] hover:shadow-[0_0_40px_rgba(198,128,69,0.4)]" 
                  data-cursor-text="VIEW"
                >
                  View Projects <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a 
                  href={resumePdf} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex min-w-[178px] items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-primary/40 text-text-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-bold text-[11px] tracking-widest uppercase cursor-none" 
                  data-cursor-text="PDF"
                >
                  Download Resume <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* ===== CENTER: Hero Focal Image — THE KING ===== */}
        <div className="col-start-4 col-end-10 row-start-1 row-end-4 z-20 flex justify-center items-start pt-16 pointer-events-auto">
          <m.div style={{ y: parallaxY }} className="relative w-full max-w-[520px] xl:max-w-[560px]">
            <div ref={imageContainerRefDesktop} className="w-full aspect-[3/4] will-change-transform overflow-hidden rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
              <img 
                src={HERO_IMAGE}
                alt="Athul Sivanand"
                width={HERO_WIDTH}
                height={HERO_HEIGHT}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </m.div>
        </div>

        {/* ===== Foreground: Name Typography — overlaps CHEST only ===== */}
        <div className="col-start-1 col-end-13 row-start-2 row-end-3 z-30 flex flex-col items-center justify-end pb-[clamp(2rem,5vh,4rem)] mix-blend-difference text-white pointer-events-none">
          <h1 
            ref={textRefDesktop} 
            className="flex w-[min(92vw,1180px)] items-center justify-center whitespace-nowrap text-center font-sans font-black uppercase tracking-[-0.03em] leading-[0.82] will-change-transform"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}
          >
            Athul <span className="ml-[0.16em] text-primary">Sivanand</span>
          </h1>
        </div>

        {/* ===== Right Edge: Vertical Typography ===== */}
        <div className="col-start-12 col-end-13 row-start-1 row-end-3 z-20 flex justify-end items-center pointer-events-auto">
          <div 
            className="text-primary font-bold text-sm xl:text-base uppercase whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', opacity: .45, letterSpacing: '.4em' }}
          >
            Full Stack Developer
          </div>
        </div>

        {/* ===== Bottom: Scroll Indicator ===== */}
        <div className="col-start-1 col-end-13 row-start-3 row-end-4 z-40 flex justify-center items-end pb-8 pointer-events-none">
          <m.div 
            className="scroll-indicator flex flex-col items-center gap-3"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-text-secondary/50">Scroll</span>
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="text-text-secondary/40">
              <path d="M6 0L6 18M6 18L1 13M6 18L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </m.div>
        </div>

      </div>

      {/* =========================================
          MOBILE LAYOUT (< 1024px)
          ========================================= */}
      <div className="lg:hidden relative z-10 w-full min-h-screen px-4 sm:px-8 flex flex-col items-center pt-28 pb-20 text-center overflow-hidden">
        
        {/* Mobile Atmosphere */}
        <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] bg-primary/[0.05] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[-15%] w-[40vw] h-[40vw] bg-primary/[0.04] rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(198,128,69,0.5) 0 1px, transparent 1px)', backgroundSize: '34px 34px' }} />

        {/* Mobile Framing Top */}
        <div className="mb-8 relative z-20">
          <h2 className="text-[clamp(1.8rem,5vw,2.5rem)] leading-none font-serif italic text-text-secondary/60">
            Hello.
          </h2>
        </div>

        {/* Mobile Image — LARGE and dominant */}
        <m.div 
          style={{ y: parallaxY }}
          className="w-[88%] sm:w-[75%] max-w-[420px] aspect-[3/4] z-10 mb-6 relative"
        >
          <div ref={imageContainerRefMobile} className="w-full h-full will-change-transform overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
            <img 
              src={HERO_IMAGE}
              alt="Athul Sivanand"
              width={HERO_WIDTH}
              height={HERO_HEIGHT}
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </m.div>

        {/* Mobile Name — overlapping chest area */}
        <h1 
          ref={textRefMobile} 
          className="flex w-full max-w-[420px] flex-col items-center will-change-transform mb-8 -mt-24 relative z-20 mix-blend-difference text-white"
        >
          <span className="origin-center scale-x-[0.9] font-sans font-black uppercase tracking-[-0.03em] leading-[0.82] text-[clamp(2.5rem,8vw,3.5rem)]">
            Athul
          </span>
          <span className="origin-center scale-x-[0.9] font-sans font-black uppercase tracking-[-0.03em] leading-[0.82] text-primary text-[clamp(2rem,6vw,3rem)]">
            Sivanand
          </span>
        </h1>

        {/* Mobile Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-[10px] font-bold tracking-[0.2em] uppercase text-text-secondary relative z-20">
          <span className="px-4 py-2 bg-black/5 rounded-full border border-black/8">Microservices</span>
          <span className="px-4 py-2 bg-black/5 rounded-full border border-black/8">Django</span>
          <span className="px-4 py-2 bg-black/5 rounded-full border border-black/8">React</span>
        </div>

        {/* Mobile Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto relative z-20">
          <a href="#projects" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-xs tracking-widest uppercase w-full cursor-none shadow-[0_0_25px_rgba(198,128,69,0.25)]" data-cursor-text="VIEW">
            View Projects <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full border border-primary/40 px-5 py-4 text-center text-text-dark hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 font-bold text-[11px] sm:text-xs tracking-widest uppercase cursor-none whitespace-nowrap" data-cursor-text="PDF">
            Download Resume <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </a>
        </div>

        {/* Mobile Scroll Indicator */}
        <m.div 
          className="scroll-indicator mt-auto pt-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-text-secondary/40">Scroll</span>
          <svg width="10" height="16" viewBox="0 0 12 20" fill="none" className="text-text-secondary/30">
            <path d="M6 0L6 18M6 18L1 13M6 18L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </m.div>

      </div>

    </section>
  );
};

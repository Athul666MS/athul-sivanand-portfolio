import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '../components/ui/MagneticButton';
import { FiArrowRight, FiDownload } from 'react-icons/fi';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefDesktop = useRef<HTMLHeadingElement>(null);
  const textRefMobile = useRef<HTMLHeadingElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRefDesktop = useRef<HTMLDivElement>(null);
  const imageContainerRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktopTargets = textRefDesktop.current ? [textRefDesktop.current] : [];
    const mobileTargets = textRefMobile.current ? [textRefMobile.current] : [];
    const imageTargets = [];
    if (imageContainerRefDesktop.current) imageTargets.push(imageContainerRefDesktop.current);
    if (imageContainerRefMobile.current) imageTargets.push(imageContainerRefMobile.current);

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
    
    if (imageTargets.length > 0) {
      tl.set(imageTargets, { scale: 1.2, opacity: 0 });
    }

    if (splitBgText?.chars) {
      tl.set(splitBgText.chars, { y: 150, opacity: 0, scale: 0.8 });
      tl.to(splitBgText.chars, {
        y: 0,
        opacity: 0.03, // Updated to 0.03 per master prompt
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

    return () => {
      splitTextDesktop?.revert();
      splitTextMobile?.revert();
      splitBgText?.revert();
      tl.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const xPos = (clientX / innerWidth - 0.5) * 20;
    const yPos = (clientY / innerHeight - 0.5) * 20;

    const imageTargets = [];
    if (imageContainerRefDesktop.current) imageTargets.push(imageContainerRefDesktop.current);
    if (imageContainerRefMobile.current) imageTargets.push(imageContainerRefMobile.current);

    if (imageTargets.length > 0) {
      gsap.to(imageTargets, {
        x: xPos * 2,
        y: yPos * 2,
        duration: 1,
        ease: "power2.out"
      });
    }

    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        x: -xPos * 4,
        y: -yPos * 4,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  };

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Giant Atmospheric Background Text - Fully Independent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
        <h1 
          ref={bgTextRef}
          className="text-[clamp(6rem,15vw,20rem)] font-black text-primary uppercase whitespace-nowrap tracking-tighter will-change-transform opacity-[0.03] leading-none"
        >
          DEVELOPER
        </h1>
      </div>

      {/* =========================================
          DESKTOP LAYOUT (>= 1024px)
          Bulletproof CSS Grid Overlaps
          ========================================= */}
      <div className="hidden lg:grid relative z-10 w-full max-w-[1920px] mx-auto h-screen px-8 lg:px-16 xl:px-24 grid-cols-12 grid-rows-6 pointer-events-none">
        
        {/* Right Side Atmosphere (Mesh gradients & Particles) */}
        <div className="col-start-9 col-end-13 row-start-1 row-end-7 pointer-events-none z-0 relative overflow-hidden">
          <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] bg-primary/10 rounded-full blur-[100px] animate-pulse mix-blend-multiply"></div>
          <div className="absolute bottom-[20%] right-[10%] w-[20vw] h-[20vw] bg-black/5 rounded-full blur-[80px]"></div>
          
          {/* Floating Particles */}
          <motion.div 
            animate={{ y: [-20, 20], x: [-10, 10], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            className="absolute top-[30%] right-[15%] w-6 h-6 border border-primary/20 rotate-45"
          ></motion.div>
          <motion.div 
            animate={{ y: [20, -20], x: [10, -10], rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            className="absolute bottom-[40%] right-[25%] w-8 h-8 border rounded-full border-text-secondary/10"
          ></motion.div>
          <motion.div 
            animate={{ y: [-15, 15], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-[60%] right-[20%] w-3 h-3 bg-primary/30 rounded-full"
          ></motion.div>
        </div>

        {/* Top Left: Framing Elements */}
        <div className="col-span-4 row-start-2 z-20 pointer-events-auto">
          <div className="mb-4 text-sm font-bold tracking-[0.3em] text-text-secondary uppercase">
            Thrissur, Kerala
          </div>
          <h2 className="text-[clamp(3rem,4vw,4.5rem)] leading-none font-serif italic text-text-secondary/70">
            Hello.
          </h2>
        </div>

        {/* Center: Hero Focal Image (Rows 2 to 5 ensures it's tall and centered) */}
        <div className="col-start-5 col-end-9 row-start-2 row-end-6 z-20 flex justify-center items-center pointer-events-auto">
          <motion.div style={{ y: parallaxY }} className="w-full max-w-[450px] xl:max-w-[500px] aspect-[3/4]">
            <div ref={imageContainerRefDesktop} className="w-full h-full will-change-transform overflow-hidden rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000" 
                alt="Athul Sivanand" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Foreground: Overlapping Typography (Row 4 guarantees it strikes the chest) */}
        {/* FIX: clamp sized down slightly and whitespace-nowrap applied with inline-blocks to ensure zero wrapping */}
        <div className="col-start-1 col-end-13 xl:col-start-2 row-start-4 z-30 flex items-center justify-start mix-blend-difference text-white pointer-events-none">
          <h1 
            ref={textRefDesktop} 
            className="text-[clamp(4.5rem,7vw,9.5rem)] leading-[0.85] font-sans font-black uppercase will-change-transform whitespace-nowrap"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0% 120%)' }}
          >
            <span className="inline-block mr-[2vw]">Athul</span>
            <span className="inline-block text-primary">Sivanand</span>
          </h1>
        </div>

        {/* Bottom Left: Interactive Elements */}
        <div className="col-span-6 row-start-6 z-40 flex flex-col gap-8 self-end pb-12 pointer-events-auto">
          <div className="flex flex-wrap gap-4 text-xs font-bold tracking-[0.2em] uppercase text-text-secondary">
            <span className="px-4 py-2 bg-black/5 rounded-full border border-black/10 hover:bg-black/10 transition-colors cursor-none" data-cursor-text="TECH">Microservices</span>
            <span className="px-4 py-2 bg-black/5 rounded-full border border-black/10 hover:bg-black/10 transition-colors cursor-none" data-cursor-text="TECH">Django</span>
            <span className="px-4 py-2 bg-black/5 rounded-full border border-black/10 hover:bg-black/10 transition-colors cursor-none" data-cursor-text="TECH">React</span>
          </div>
          <div className="flex gap-4">
            <MagneticButton>
              <a href="#projects" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white hover:bg-text-dark transition-colors font-bold text-xs tracking-widest uppercase cursor-none shadow-[0_0_20px_rgba(198,128,69,0.3)]" data-cursor-text="VIEW">
                View Projects <FiArrowRight className="text-lg transform group-hover:translate-x-1 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="/resume.pdf" target="_blank" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-primary/30 text-text-dark hover:bg-primary/5 transition-colors font-bold text-xs tracking-widest uppercase cursor-none" data-cursor-text="PDF">
                Resume <FiDownload className="text-lg" />
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right Edge: Vertical Typography */}
        <div className="col-start-12 row-start-3 row-end-5 z-20 flex justify-end items-center pointer-events-auto">
          <div 
            className="text-primary font-bold text-xs xl:text-sm tracking-[0.5em] uppercase whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            Full Stack Developer
          </div>
        </div>

      </div>

      {/* =========================================
          MOBILE LAYOUT (< 1024px)
          Flex Stack (Zero overlap for absolute safety)
          ========================================= */}
      <div className="lg:hidden relative z-10 w-full min-h-screen px-4 sm:px-8 flex flex-col items-center pt-32 pb-24 text-center overflow-hidden">
        
        {/* Mobile Atmosphere */}
        <div className="absolute top-[10%] right-[-20%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Mobile Framing Top */}
        <div className="mb-12 relative z-20">
          <h2 className="text-[clamp(2.5rem,8vw,4rem)] leading-none font-serif italic text-text-secondary/70">
            Hello.
          </h2>
        </div>

        {/* Mobile Image */}
        <motion.div 
          style={{ y: parallaxY }}
          className="w-[85%] sm:w-[70%] max-w-[400px] aspect-[4/5] z-10 mb-12 relative"
        >
          <div ref={imageContainerRefMobile} className="w-full h-full will-change-transform overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000" 
              alt="Athul Sivanand" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Mobile Name */}
        <h1 
          ref={textRefMobile} 
          className="text-[clamp(3.5rem,10vw,6rem)] leading-[0.9] font-sans font-black uppercase text-text-dark will-change-transform mb-8 whitespace-nowrap"
        >
          <span className="block">Athul</span>
          <span className="block text-primary">Sivanand</span>
        </h1>

        {/* Mobile Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-[10px] font-bold tracking-[0.2em] uppercase text-text-secondary relative z-20">
          <span className="px-4 py-2 bg-black/5 rounded-full border border-black/10">Microservices</span>
          <span className="px-4 py-2 bg-black/5 rounded-full border border-black/10">Django</span>
        </div>

        {/* Mobile Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative z-20">
          <a href="#projects" className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-xs tracking-widest uppercase w-full cursor-none" data-cursor-text="VIEW">
            View Projects <FiArrowRight className="text-lg transform group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/resume.pdf" target="_blank" className="flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-primary/30 text-text-dark font-bold text-xs tracking-widest uppercase w-full cursor-none" data-cursor-text="PDF">
            Resume <FiDownload className="text-lg" />
          </a>
        </div>

      </div>

    </section>
  );
};

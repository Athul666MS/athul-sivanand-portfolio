import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !textRef.current || !sectionRef.current) return;

    const splitText = new SplitType(textRef.current, { types: 'lines' });

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(sectionRef);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      tl.fromTo(titleRef.current, 
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" }
      );
      
      if (splitText.lines) {
        tl.fromTo(splitText.lines, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power3.out", clearProps: "all" }, 
          "-=0.4"
        );
      }

      tl.fromTo(q('.stat-card'), 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", clearProps: "all" }, 
        "-=0.4"
      );
    }, sectionRef);

    return () => {
      splitText.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white text-text-dark relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* LEFT COLUMN: Title + Description */}
        <div className="w-full">
          <h2 ref={titleRef} className="text-[clamp(3rem,6.5vw,5.5rem)] font-serif uppercase tracking-tight leading-[0.9] mb-8 md:mb-10 will-change-transform break-words" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0% 120%)' }}>
            <span className="text-primary italic normal-case block font-medium mb-2">The</span>
            <span className="block">SUMMARY</span>
          </h2>
          <p ref={textRef} className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-sans text-text-secondary leading-relaxed max-w-xl will-change-transform">
            Python Full Stack Developer with deep expertise in building back-end systems, REST APIs, and responsive web applications. I specialize in Django, React, and microservices architecture, focused on delivering clean, scalable solutions with high performance and continuous innovation.
          </p>
        </div>

        {/* RIGHT COLUMN: 2×2 Statistics Grid — ALWAYS VISIBLE */}
        <div className="w-full grid grid-cols-2 gap-5 md:gap-6 lg:gap-8 min-h-[400px] lg:border-l lg:border-text-dark/10 lg:pl-16">
          
          {/* Stat 1: Major Projects */}
          <div className="stat-card flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(198,128,69,0.08)] transition-all duration-500 group cursor-none" data-cursor-text="WOW">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans text-primary group-hover:scale-105 transition-transform origin-left will-change-transform leading-none">3+</span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mt-4">Major Projects</span>
          </div>
          
          {/* Stat 2: Technologies */}
          <div className="stat-card flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(198,128,69,0.08)] transition-all duration-500 group cursor-none" data-cursor-text="MANY">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-sans text-primary group-hover:scale-105 transition-transform origin-left will-change-transform leading-none">20+</span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mt-4">Technologies</span>
          </div>
          
          {/* Stat 3: Junior Developer */}
          <div className="stat-card flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-text-dark/8 bg-gradient-to-br from-white to-background/50 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500 group cursor-none" data-cursor-text="SMEC">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black font-sans text-text-dark group-hover:text-primary transition-colors will-change-transform leading-tight">Junior<br/>Developer</span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mt-4">Experience</span>
          </div>
          
          {/* Stat 4: REST API */}
          <div className="stat-card flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-text-dark/8 bg-gradient-to-br from-white to-background/50 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500 group cursor-none" data-cursor-text="BACKEND">
            <span className="text-2xl sm:text-3xl md:text-4xl font-black font-sans text-text-dark group-hover:text-primary transition-colors will-change-transform leading-tight">REST API</span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mt-4">Specialist</span>
          </div>

        </div>

      </div>
    </section>
  );
};

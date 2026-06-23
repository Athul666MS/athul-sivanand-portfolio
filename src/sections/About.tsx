import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !textRef.current || !countersRef.current) return;

    const splitTitle = new SplitType(titleRef.current, { types: 'lines,words,chars' });
    const splitText = new SplitType(textRef.current, { types: 'lines' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.from(splitTitle.chars, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power3.out"
    })
    .from(splitText.lines, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out"
    }, "-=0.4")
    .from(countersRef.current.children, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.4");

    return () => {
      splitTitle.revert();
      splitText.revert();
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32 lg:py-48 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 bg-white text-text-dark relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        <div className="flex-1">
          <h2 ref={titleRef} className="text-[clamp(3rem,8vw,7rem)] font-serif uppercase tracking-tight leading-[0.85] mb-8 md:mb-10 will-change-transform" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0% 120%)' }}>
            <span className="text-primary italic normal-case block font-medium pr-4">The</span>
            Developer
          </h2>
          <p ref={textRef} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-sans text-text-secondary leading-snug max-w-2xl will-change-transform">
            Python Full Stack Developer with deep expertise in building back-end systems, REST APIs, and responsive web applications. I specialize in Django, React, and microservices architecture, focused on delivering clean, scalable solutions with high performance and continuous innovation.
          </p>
        </div>

        <div ref={countersRef} className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 lg:gap-16 pt-10 border-t border-text-dark/10 lg:border-t-0 lg:border-l lg:pl-16">
          <div className="flex flex-col gap-2 group cursor-none" data-cursor-text="WOW">
            <span className="text-6xl sm:text-7xl md:text-8xl font-black font-sans text-primary group-hover:scale-110 transition-transform origin-left w-fit">3+</span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Major Projects</span>
          </div>
          <div className="flex flex-col gap-2 group cursor-none" data-cursor-text="MANY">
            <span className="text-6xl sm:text-7xl md:text-8xl font-black font-sans text-primary group-hover:scale-110 transition-transform origin-left w-fit">20+</span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary">Technologies</span>
          </div>
          <div className="flex flex-col gap-2 group cursor-none" data-cursor-text="SMEC">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-text-dark mb-auto group-hover:-translate-y-2 transition-transform w-fit">Junior Developer</span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary mt-2">Experience</span>
          </div>
          <div className="flex flex-col gap-2 group cursor-none" data-cursor-text="BACKEND">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-text-dark mb-auto group-hover:-translate-y-2 transition-transform w-fit">REST API</span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-text-secondary mt-2">Specialist</span>
          </div>
        </div>

      </div>
    </section>
  );
};

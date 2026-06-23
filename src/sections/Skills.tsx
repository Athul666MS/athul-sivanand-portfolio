import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Backend",
    items: ["Python", "Django", "DRF", "JWT", "WebSocket", "Microservices", "Redis"]
  },
  {
    category: "Frontend",
    items: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "Bootstrap"]
  },
  {
    category: "Cloud",
    items: ["AWS EC2", "AWS S3", "AWS RDS", "MySQL", "Docker"]
  },
  {
    category: "DevOps",
    items: ["Git", "GitHub", "Nginx", "Gunicorn", "Postman"]
  }
];

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Card stagger fade-up animation
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Skill pills stagger animation per card
      cards.forEach((card) => {
        const pills = card.querySelectorAll('.skill-pill');
        if (pills.length === 0) return;

        gsap.fromTo(
          pills,
          { y: 20, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "back.out(1.4)",
            clearProps: "all",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 md:py-32 lg:py-48 bg-[#111111] text-white overflow-hidden relative"
    >
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-6 lg:gap-8">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-serif uppercase tracking-tighter leading-[0.9]" data-cursor-text="TECH">
            Technical<br/>
            <span className="text-primary italic normal-case">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-sm text-base sm:text-lg lg:text-xl font-medium">
            A comprehensive toolkit for building scalable, high-performance web applications and distributed microservices.
          </p>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skillGroup, idx) => {
            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className={`
                  group relative p-6 md:p-8 rounded-[2rem] transition-all duration-500 overflow-hidden cursor-none will-change-transform
                  md:hover:-translate-y-4
                  md:hover:shadow-[0_20px_60px_rgba(198,128,69,0.25)]
                  bg-white/5 border border-white/10 md:hover:bg-white/10
                `}
                data-cursor-text={skillGroup.category.toUpperCase()}
              >
                {/* Gradient border overlay on hover (pseudo-element approach via layered div) */}
                <div
                  className="hidden md:block absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    padding: "1.5px",
                    background: "linear-gradient(135deg, #C68045 0%, rgba(198,128,69,0.2) 50%, #C68045 100%)",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Hover Glow Effect */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"></div>

                <h3 className="text-2xl md:text-3xl font-bold font-sans mb-6 md:mb-8 transition-colors relative z-10 text-white md:group-hover:text-primary">
                  {skillGroup.category}
                </h3>

                <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                  {skillGroup.items.map((item, i) => (
                    <span
                      key={i}
                      className={`
                        skill-pill px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300
                        md:hover:border-primary md:hover:text-primary md:hover:shadow-[0_0_15px_rgba(198,128,69,0.5)] md:hover:scale-105
                        bg-[#111111] border border-white/20
                      `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

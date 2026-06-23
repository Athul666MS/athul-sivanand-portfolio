import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = [
    {
      role: "Junior Developer",
      company: "SMEC Technologies",
      period: "Present",
      description: [
        "Engineered scalable backend systems with Django and MySQL.",
        "Optimized query performance reducing backend response time by 60-70%.",
        "Developed modular REST API endpoints with role-based access control.",
        "Managed deployments across Docker, Postman, and AWS infrastructure."
      ]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Line drawing animation
    gsap.fromTo(lineRef.current, 
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom 20%",
          scrub: true
        }
      }
    );

    // Cards sliding up animation
    cardRefs.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 lg:py-48 bg-[#ECECEC] text-[#111111] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative">
        <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-serif uppercase tracking-tighter leading-none mb-16 md:mb-32" data-cursor-text="WORK">
          Experience
        </h2>

        <div className="relative max-w-5xl mx-auto pl-6 md:pl-0">
          {/* Copper Accent Line */}
          <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[2px] bg-black/10 md:-translate-x-1/2">
            <div ref={lineRef} className="w-full bg-primary origin-top"></div>
          </div>

          <div className="flex flex-col gap-16 md:gap-24 relative z-10">
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                ref={el => { cardRefs.current[idx] = el; }}
                className={`flex flex-col md:flex-row w-full relative ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                
                {/* Timeline Dot */}
                <div className={`absolute top-8 w-6 h-6 rounded-full bg-white border-4 border-primary z-20 
                                -left-[31px] md:left-auto md:top-1/2 md:-translate-y-1/2 
                                ${idx % 2 === 0 ? 'md:right-[-12px] md:-translate-x-1/2 md:left-1/2' : 'md:left-1/2 md:-translate-x-1/2'}`}>
                </div>

                <div className={`w-full md:w-[45%] bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] shadow-xl md:hover:shadow-2xl transition-shadow duration-500 cursor-none group ml-2 md:ml-0`} data-cursor-text="SMEC">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-3 md:mb-4 block">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-sans mb-2 md:group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-serif italic text-text-secondary mb-6 md:mb-8">
                    {exp.company}
                  </h4>
                  
                  <ul className="flex flex-col gap-3 md:gap-4 text-text-secondary">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 md:gap-4 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                        <span className="text-sm md:text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

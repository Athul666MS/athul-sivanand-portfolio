import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiClock, FiActivity, FiServer, FiLock, FiTerminal } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const experiences = [
    {
      role: "Junior Developer",
      company: "SMEC Technologies",
      period: "2023 - Present",
      duration: "Full Time",
      logo: "https://ui-avatars.com/api/?name=SM&background=111111&color=C68045&font-size=0.4",
      achievements: [
        { icon: <FiServer className="w-5 h-5" />, text: "Engineered scalable backend systems with Django and MySQL." },
        { icon: <FiActivity className="w-5 h-5" />, text: "Optimized query performance reducing backend response time by 60-70%." },
        { icon: <FiLock className="w-5 h-5" />, text: "Developed modular REST API endpoints with role-based access control." },
        { icon: <FiTerminal className="w-5 h-5" />, text: "Managed deployments across Docker, Postman, and AWS infrastructure." }
      ]
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Copper line drawing animation
    gsap.fromTo(lineRef.current, 
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom 40%",
          scrub: 1
        }
      }
    );

    // Cards sliding up animation with stagger
    cardRefs.current.forEach((card) => {
      if (!card) return;
      
      const node = card.querySelector('.timeline-node');
      
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );

      // Node glow effect pop
      if (node) {
        gsap.fromTo(node,
          { scale: 0, boxShadow: "0 0 0px rgba(198,128,69,0)" },
          {
            scale: 1,
            boxShadow: "0 0 20px rgba(198,128,69,0.6)",
            duration: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 60%",
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 lg:py-48 bg-[#ECECEC] text-[#111111] relative z-20 overflow-hidden">
      {/* Background Mesh Glow */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-black/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        {/* Large Editorial Heading */}
        <div className="flex flex-col items-start mb-20 md:mb-32">
          <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-serif uppercase tracking-tighter leading-none" data-cursor-text="CAREER">
            Professional<br />
            <span className="text-primary italic normal-case">Experience</span>
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto pl-8 md:pl-0">
          
          {/* Copper Accent Line Container */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-black/5 md:-translate-x-1/2 rounded-full">
            <div ref={lineRef} className="w-full bg-primary origin-top shadow-[0_0_10px_rgba(198,128,69,0.5)] rounded-full"></div>
          </div>

          <div className="flex flex-col gap-16 md:gap-32 relative z-10 pt-10 pb-20">
            {experiences.map((exp, idx) => (
              <div 
                key={idx}
                ref={el => { cardRefs.current[idx] = el; }}
                className={`flex flex-col md:flex-row w-full relative ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
              >
                
                {/* Glowing Timeline Node */}
                <div className={`timeline-node absolute top-12 w-6 h-6 rounded-full bg-[#ECECEC] border-4 border-primary z-20 
                                -left-[35px] md:left-auto md:top-16 
                                ${idx % 2 === 0 ? 'md:right-[-12px] md:-translate-x-1/2 md:left-1/2' : 'md:left-1/2 md:-translate-x-1/2'}`}>
                </div>

                {/* Glassmorphism Card */}
                <div 
                  className={`w-full md:w-[45%] bg-white/60 backdrop-blur-2xl p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:border-primary/20 transition-all duration-500 cursor-none group ml-4 md:ml-0`} 
                  data-cursor-text="SMEC"
                >
                  
                  {/* Card Header (Logo + Title) */}
                  <div className="flex items-center gap-6 mb-8 border-b border-black/5 pb-8">
                    <img src={exp.logo} alt={exp.company} className="w-16 h-16 rounded-2xl shadow-md group-hover:scale-105 transition-transform" />
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black font-sans mb-1 group-hover:text-primary transition-colors leading-tight">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg sm:text-xl font-serif italic text-text-secondary">
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
                  
                  {/* Achievement Highlights with Icons */}
                  <ul className="flex flex-col gap-6 text-text-secondary">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group/item">
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center flex-shrink-0 text-text-dark group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300">
                          {item.icon}
                        </div>
                        <span className="text-sm md:text-base leading-relaxed pt-2 font-medium">{item.text}</span>
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

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="skills" ref={containerRef} className="py-20 md:py-32 lg:py-48 bg-[#111111] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-6 lg:gap-8">
          <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-serif uppercase tracking-tighter leading-[0.9]" data-cursor-text="TECH">
            Technical<br/>
            <span className="text-primary italic normal-case">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-sm text-base sm:text-lg lg:text-xl font-medium">
            A comprehensive toolkit for building scalable, high-performance web applications and distributed microservices.
          </p>
        </div>

        <motion.div style={{ y }} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skillGroup, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] transition-all duration-500 overflow-hidden cursor-none md:hover:-translate-y-4 md:hover:bg-white/10"
              data-cursor-text={skillGroup.category.toUpperCase()}
            >
              {/* Hover Glow Effect */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"></div>
              
              <h3 className="text-2xl md:text-3xl font-bold font-sans mb-6 md:mb-8 text-white md:group-hover:text-primary transition-colors relative z-10">
                {skillGroup.category}
              </h3>
              
              <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                {skillGroup.items.map((item, i) => (
                  <span 
                    key={i} 
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-[#111111] border border-white/20 rounded-full text-xs md:text-sm font-medium transition-all duration-300 md:hover:border-primary md:hover:text-primary md:hover:shadow-[0_0_15px_rgba(198,128,69,0.5)] md:hover:scale-105"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

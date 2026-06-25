import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiArrowRight } from 'react-icons/fi';
import { MagneticButton } from '../components/ui/MagneticButton';

const projects = [
  {
    title: "LABORA",
    type: "Featured Project",
    description: "Freelancing Platform (Microservices Architecture). Distributed system with independently managed services for authentication, jobs, messaging, and payments.",
    tech: ["Django REST", "Docker", "WebSocket", "Nginx", "JWT", "MySQL"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=75&fm=webp",
    github: "https://github.com/Labora-Backend",
    live: "#"
  },
  {
    title: "Multimart",
    type: "E-Commerce Platform",
    description: "Scalable multi-vendor marketplace with role-based dashboards, real-time order notifications, and secure payment integration.",
    tech: ["Django", "React", "AWS", "Razorpay", "OAuth"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=75&fm=webp",
    github: "https://github.com/smec-community-dev/multimart-athul-azeem",
    live: "https://multimart.duckdns.org/login/"
  },
  {
    title: "Hiremo",
    type: "Service Platform",
    description: "Skill exchange and work hiring platform featuring biometric verification using Haar Cascade and OpenCV.",
    tech: ["Django", "OpenCV", "MySQL", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=75&fm=webp",
    github: "#",
    live: "#"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <m.div 
      ref={containerRef}
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full mb-20 lg:mb-40 will-change-transform"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-14 group`}>
        
        {/* IMAGE — 55% width on desktop */}
        <div className={`w-full lg:w-[55%] aspect-[16/10] overflow-hidden rounded-2xl lg:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative z-10 pointer-events-auto`}>
          <m.div 
            style={{ y: imgY }}
            className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform"
          >
            <img 
              src={project.image} 
              alt={`${project.title} project preview`}
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover origin-center scale-110 group-hover:scale-100" 
              style={{ transition: 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
            />
          </m.div>
          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-[1.5s] pointer-events-none" />
        </div>

        {/* TEXT — 45% width on desktop */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center z-20">
          
          {/* Type badge */}
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4">
            {project.type}
          </p>

          {/* Title */}
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans uppercase leading-[0.9] text-white mb-6 group-hover:text-primary transition-colors duration-500">
            {project.title}
          </h3>

          {/* Description — ALWAYS visible */}
          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-6">
            {project.description}
          </p>

          {/* Tech tags — glass effect */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-[10px] md:text-xs font-medium uppercase tracking-widest backdrop-blur-sm hover:border-primary/40 hover:text-primary transition-colors duration-300">
                {t}
              </span>
            ))}
          </div>

          {/* Buttons — ALWAYS visible */}
          <div className="flex flex-col sm:flex-row gap-3 relative z-50 pointer-events-auto">
            {project.github !== "#" && (
              <MagneticButton>
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border border-white/20 text-white/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 backdrop-blur-md font-bold text-[11px] tracking-widest uppercase cursor-none w-full sm:w-auto"
                  data-cursor-text="SOURCE"
                >
                  <FiGithub className="text-base" />
                  Source Code
                </a>
              </MagneticButton>
            )}

            {project.live !== "#" && (
              <MagneticButton>
                <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-primary text-white hover:bg-white hover:text-text-dark transition-all duration-300 font-bold text-[11px] tracking-widest uppercase cursor-none w-full sm:w-auto shadow-[0_0_25px_rgba(198,128,69,0.2)]"
                  data-cursor-text="VISIT"
                >
                  Live Demo
                  <FiArrowRight className="text-base transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 lg:py-48 bg-[#111111] text-white relative z-20 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 w-full">
        
        {/* Section Title */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-32 gap-6">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-serif uppercase tracking-tighter leading-none" data-cursor-text="WORK">
            Selected <span className="text-primary italic normal-case">Works</span>
          </h2>
          <p className="text-white/40 max-w-sm text-base lg:text-lg font-medium">
            A collection of projects built with scalable architecture, clean code, and production-ready standards.
          </p>
        </div>

        <div className="flex flex-col w-full">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

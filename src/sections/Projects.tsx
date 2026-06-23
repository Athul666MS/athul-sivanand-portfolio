import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiArrowRight } from 'react-icons/fi';
import { MagneticButton } from '../components/ui/MagneticButton';

const projects = [
  {
    title: "LABORA",
    type: "Featured Project",
    description: "Freelancing Platform (Microservices Architecture). Distributed system with independently managed services for authentication, jobs, messaging, and payments.",
    tech: ["Django REST", "Docker", "WebSocket", "Nginx", "JWT", "MySQL"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    github: "https://github.com/Labora-Backend",
    live: "#"
  },
  {
    title: "Multimart",
    type: "E-Commerce",
    description: "Scalable multi-vendor marketplace with role-based dashboards, real-time order notifications, and secure payment integration.",
    tech: ["Django", "React", "AWS", "Razorpay", "OAuth"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069",
    github: "https://github.com/smec-community-dev/multimart-athul-azeem",
    live: "https://multimart.duckdns.org/login/"
  },
  {
    title: "HireMe",
    type: "Service Platform",
    description: "Skill exchange and work hiring platform featuring biometric verification using Haar Cascade and OpenCV.",
    tech: ["Django", "OpenCV", "MySQL", "Bootstrap"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070",
    github: "#",
    live: "#"
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax animation
  const imgY = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-24 lg:mb-48 group will-change-transform"
    >
      {/* Mobile Hierarchy: Image -> Title -> Description -> Buttons */}
      {/* Desktop Hierarchy: 40% Left Text -> 60% Right Image */}
      
      {/* Left Column (40%) - Text */}
      <div className={`w-full lg:w-[40%] flex flex-col justify-center order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} z-20`}>
        
        {/* Title & Type */}
        <div className="mb-6 overflow-hidden">
          <p className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm mb-4 lg:translate-y-[40px] lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            {project.type}
          </p>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans uppercase leading-[0.9] text-white relative inline-block group-hover:text-primary transition-colors duration-500 w-max">
            {project.title}
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"></span>
          </h3>
        </div>

        {/* Description & Tags */}
        <div className="lg:translate-y-[40px] lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-700 delay-100 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-widest backdrop-blur-sm shadow-xl">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons (High Z-Index, explicit pointer-events to guarantee clickability) */}
        <div className="flex flex-col sm:flex-row gap-4 relative z-50 pointer-events-auto lg:translate-y-[40px] lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-700 delay-200 ease-[cubic-bezier(0.25,1,0.5,1)]">
          <MagneticButton>
            <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors backdrop-blur-md font-bold text-xs tracking-widest uppercase cursor-none w-full sm:w-auto relative z-50"
              data-cursor-text="GITHUB"
            >
              <FiGithub className="text-lg" />
              Source Code
            </a>
          </MagneticButton>

          <MagneticButton>
            <a 
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-primary text-white hover:bg-white hover:text-[#111111] transition-colors font-bold text-xs tracking-widest uppercase cursor-none w-full sm:w-auto shadow-[0_0_20px_rgba(198,128,69,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] relative z-50"
              data-cursor-text="VISIT"
            >
              Live Demo
              <FiArrowRight className="text-lg transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Right Column (60%) - Image Container */}
      {/* BUG FIX: Removed pointer-events-none from image so mouse hover is accurately detected */}
      <div 
        ref={containerRef} 
        className={`w-full lg:w-[60%] aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl relative order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} z-10 pointer-events-auto`}
      >
        <motion.div 
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover origin-center scale-125 group-hover:scale-110" 
            style={{ transition: 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)' }}
          />
        </motion.div>
        {/* Cinematic dark overlay fading in on hover */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-colors duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] pointer-events-none"></div>
      </div>

    </motion.div>
  );
};

export const Projects = () => {
  return (
    <section id="projects" className="py-20 md:py-32 lg:py-48 bg-[#111111] text-white relative z-20 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 w-full">
        
        <div className="flex flex-col items-start mb-16 md:mb-32">
          <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-serif uppercase tracking-tighter leading-none mb-6" data-cursor-text="WORK">
            Selected <span className="text-primary italic normal-case">Works</span>
          </h2>
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

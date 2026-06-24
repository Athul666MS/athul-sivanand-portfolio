import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);
const certs = [
  {
    name: "Developing Front-End Apps with React",
    issuer: "IBM",
    date: "2026",
    id: "WPO8HDOGK113",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    logoClass: "w-10 h-10 md:w-11 md:h-11",
    verifyUrl: "https://coursera.org/verify/WPO8HDOGK113"
  },
  {
    name: "Backend Developer Certification",
    issuer: "STEYP",
    date: "2024",
    id: "kkp4008himzd5dzd1ydk",
    logo: "https://steyp.com/assets/assets/images/23-11-2021/steyp-logo.svg",
    logoClass: "w-12 h-12 md:w-14 md:h-14",
    verifyUrl: "https://res.cloudinary.com/day0ejakg/image/upload/Backend_Developer-certificate_3_h2dhr1.pdf"
  },
  {
    name: "UI Engineer Certification",
    issuer: "STEYP",
    date: "2024",
    id: "muc1ynccsqq3c7k0igeo",
    logo: "https://steyp.com/assets/assets/images/23-11-2021/steyp-logo.svg",
    logoClass: "w-12 h-12 md:w-14 md:h-14",
    verifyUrl: "https://res.cloudinary.com/day0ejakg/image/upload/UI_Engineer-certificate_2_at6t7w.pdf"
  },
  {
    name: "Google AI Essentials",
    issuer: "Google",
    date: "2026",
    id: "QE9T75VXBNKN",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    logoClass: "w-12 h-12 md:w-14 md:h-14",
    verifyUrl: "https://coursera.org/verify/specialization/QE9T75VXBNKN"
  }
];


export const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current!.querySelectorAll('.cert-card');

      gsap.fromTo(
        cards,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          clearProps: "all",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 md:py-32 lg:py-48 bg-[#ECECEC] text-[#111111] relative z-20 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-black/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-serif uppercase tracking-tighter leading-none"
            data-cursor-text="VERIFIED"
          >
            Professional<br />
            <span className="text-primary italic normal-case">Certifications</span>
          </h2>
        </div>

        {/* 2x2 Grid Layout */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card group relative bg-white/60 backdrop-blur-2xl p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-none will-change-transform md:hover:border-primary/30 md:hover:shadow-[0_20px_60px_rgba(198,128,69,0.1)] md:hover:-translate-y-2 flex flex-col justify-between h-full min-h-[300px]"
              data-cursor-text="VERIFY"
            >
              {/* Hover gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>

              <div className="relative z-10 flex flex-col h-full gap-8">
                {/* Header: Logo and Issuer */}
                <div className="flex items-center gap-4">
                  <img
                    src={cert.logo}
                    alt={`${cert.issuer} logo`}
                    width={56}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    className={`${cert.logoClass} object-contain shrink-0 rounded-xl md:group-hover:scale-105 transition-transform duration-300`}
                  />
                  <div>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-black font-sans leading-tight md:group-hover:text-primary transition-colors duration-300">
                      {cert.issuer}
                    </h4>
                    <span className="text-xs md:text-sm font-medium text-text-secondary uppercase tracking-widest">
                      {cert.date}
                    </span>
                  </div>
                </div>

                {/* Body: Certification Name */}
                <div className="flex-1 mt-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-sans leading-tight mb-2 md:group-hover:text-primary transition-colors duration-300">
                    {cert.name}
                  </h3>
                </div>

                {/* Footer: ID and Verify Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-black/10 pt-5 md:pt-6 gap-4">
                  <div>
                    <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest block mb-2">
                      Credential ID
                    </span>
                    <span className="text-[10px] md:text-sm font-mono bg-black/5 px-2 md:px-3 py-1 rounded text-text-dark md:group-hover:bg-primary/10 md:group-hover:text-primary transition-colors break-all">
                      {cert.id}
                    </span>
                  </div>
                  
                  <div className="shrink-0 self-end">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest border border-black/10 text-text-dark bg-white/80 transition-all duration-300 md:hover:bg-primary md:hover:text-white md:hover:border-primary md:hover:shadow-[0_8px_25px_rgba(198,128,69,0.3)] md:group-hover:border-primary/30"
                    >
                      Verify
                      <FiArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

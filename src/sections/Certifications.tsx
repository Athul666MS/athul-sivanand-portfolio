import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const certs = [
  {
    name: "Developing Front-End Apps with React",
    issuer: "IBM",
    date: "2024",
    id: "WPO8HDOGK113",
    logo: "https://ui-avatars.com/api/?name=IBM&background=111111&color=C68045&font-size=0.4&bold=true",
    verifyUrl: "https://coursera.org/verify/WPO8HDOGK113"
  },
  {
    name: "Backend Developer Certification",
    issuer: "STEYP",
    date: "2024",
    id: "kkp4008himzd5dzd1ydk",
    logo: "https://ui-avatars.com/api/?name=ST&background=111111&color=C68045&font-size=0.4&bold=true",
    verifyUrl: "#"
  },
  {
    name: "UI Engineer Certification",
    issuer: "STEYP",
    date: "2024",
    id: "muc1ynccsqq3c7k0igeo",
    logo: "https://ui-avatars.com/api/?name=ST&background=111111&color=C68045&font-size=0.4&bold=true",
    verifyUrl: "#"
  },
  {
    name: "Google AI Essentials",
    issuer: "Google",
    date: "2024",
    id: "QE9T75VXBNKN",
    logo: "https://ui-avatars.com/api/?name=G&background=111111&color=C68045&font-size=0.4&bold=true",
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
          scale: 0.97,
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
            className="text-[clamp(3rem,7vw,6rem)] font-serif uppercase tracking-tighter leading-none"
            data-cursor-text="VERIFIED"
          >
            Professional<br />
            <span className="text-primary italic normal-case">Certifications</span>
          </h2>
        </div>

        {/* Horizontal Card Stack */}
        <div ref={cardsRef} className="flex flex-col gap-5 md:gap-6">
          {certs.map((cert, idx) => (
            <div
              key={idx}
              className="cert-card group relative bg-white/60 backdrop-blur-2xl p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-[2rem] border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 cursor-none will-change-transform md:hover:border-primary/30 md:hover:shadow-[0_20px_60px_rgba(198,128,69,0.1)] md:hover:-translate-y-1"
              data-cursor-text="VERIFY"
            >
              {/* Hover gradient overlay */}
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5 md:gap-8 lg:gap-12">

                {/* Left: Logo + Issuer + Date */}
                <div className="flex items-center gap-4 md:min-w-[200px] lg:min-w-[240px] shrink-0">
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl shadow-md md:group-hover:scale-105 transition-transform duration-300"
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

                {/* Vertical divider (desktop only) */}
                <div className="hidden md:block w-px h-12 bg-black/10 shrink-0"></div>

                {/* Center: Certification Name + Credential ID */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold font-sans leading-snug mb-1.5">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest">
                      ID:
                    </span>
                    <span className="text-[10px] md:text-xs font-mono bg-black/5 px-2 py-0.5 rounded text-text-secondary md:group-hover:bg-primary/10 md:group-hover:text-primary transition-colors duration-300 truncate">
                      {cert.id}
                    </span>
                  </div>
                </div>

                {/* Right: Verify Button */}
                <div className="shrink-0">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest border border-black/10 text-text-dark bg-white/80 transition-all duration-300 md:hover:bg-primary md:hover:text-white md:hover:border-primary md:hover:shadow-[0_8px_25px_rgba(198,128,69,0.3)] md:group-hover:border-primary/30"
                  >
                    Verify
                    <FiArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 md:group-hover:translate-x-0.5 md:group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

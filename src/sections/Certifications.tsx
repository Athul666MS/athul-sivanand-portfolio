import React, { useRef } from 'react';

const certs = [
  {
    name: "Developing Front-End Apps with React",
    issuer: "IBM",
    id: "WPO8HDOGK113"
  },
  {
    name: "Backend Developer Certification",
    issuer: "STEYP",
    id: "kkp4008himzd5dzd1ydk"
  },
  {
    name: "UI Engineer Certification",
    issuer: "STEYP",
    id: "muc1ynccsqq3c7k0igeo"
  },
  {
    name: "Google AI Essentials",
    issuer: "Google",
    id: "QE9T75VXBNKN"
  }
];

export const Certifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="certifications" ref={containerRef} className="py-20 md:py-32 lg:py-48 bg-[#ECECEC] text-[#111111] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-serif uppercase tracking-tighter leading-none" data-cursor-text="VERIFIED">
            Professional<br/>
            <span className="text-primary italic normal-case">Certifications</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {certs.map((cert, idx) => (
            <div 
              key={idx}
              className="group relative bg-white p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-transparent transition-all duration-500 cursor-none md:hover:border-primary md:hover:shadow-2xl md:hover:-translate-y-4"
              data-cursor-text="VIEW"
            >
              <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-8 md:gap-12">
                <div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-black font-sans uppercase mb-2 md:mb-3 md:group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-text-secondary font-serif italic text-lg sm:text-xl">
                    {cert.issuer}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t border-black/10 pt-4 md:pt-6 gap-3 md:gap-4">
                  <div className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest">
                    Credential ID
                  </div>
                  <div className="text-[10px] md:text-sm font-mono bg-black/5 px-2 md:px-3 py-1 rounded text-text-dark md:group-hover:bg-primary/10 md:group-hover:text-primary transition-colors break-all">
                    {cert.id}
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

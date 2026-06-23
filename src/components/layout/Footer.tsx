import React from 'react';
import { MagneticButton } from '../ui/MagneticButton';

export const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8 md:gap-12">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-sans font-black uppercase tracking-tighter leading-none" data-cursor-text="WOW">
          Let's build something <span className="text-primary italic font-serif normal-case block md:inline">extraordinary</span>
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 mb-8 md:mb-12">
          <MagneticButton>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/20 text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors cursor-none block w-full sm:w-auto"
              data-cursor-text="GITHUB"
            >
              GitHub
            </a>
          </MagneticButton>
          <MagneticButton>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-primary text-white text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors cursor-none block w-full sm:w-auto"
              data-cursor-text="LINKEDIN"
            >
              LinkedIn
            </a>
          </MagneticButton>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6 md:pt-8 gap-4 md:gap-0">
          <p className="text-text-secondary text-xs md:text-sm font-bold tracking-wider uppercase text-center md:text-left">
            &copy; {new Date().getFullYear()} Athul Sivanand. All rights reserved.
          </p>
          <div className="text-text-secondary text-xs md:text-sm font-bold tracking-wider uppercase text-center md:text-right">
            Designed for impact
          </div>
        </div>
      </div>
    </footer>
  );
};

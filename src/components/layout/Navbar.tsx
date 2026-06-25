import React, { useEffect, useState, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home', num: '01' },
  { name: 'About', href: '#about', num: '02' },
  { name: 'Skills', href: '#skills', num: '03' },
  { name: 'Experience', href: '#experience', num: '04' },
  { name: 'Projects', href: '#projects', num: '05' },
  { name: 'Certifications', href: '#certifications', num: '06' },
  { name: 'Contact', href: '#contact', num: '07' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsOpen(!isOpen);

  // Smooth scroll to section using native scrollIntoView
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    const id = href.replace('#', '');
    const target = document.getElementById(id);

    if (target) {
      // Close mobile menu first if open
      if (isOpen) setIsOpen(false);

      // Small delay if menu was open to allow it to animate out
      const delay = isOpen ? 100 : 0;
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without scroll jump
        window.history.pushState(null, '', href);
      }, delay);
    }
  }, [isOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-40% 0px -55% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  // Handle direct URL access with hash fragment
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        // Delay to allow page to render first
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.6, ease: [0.12, 0, 0.39, 0] as any } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } },
    exit: { transition: { staggerChildren: 0.06, staggerDirection: -1 } }
  };

  const mobileLinkVars = {
    initial: { y: "30vh", opacity: 0, transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] as any } },
    open: { y: 0, opacity: 1, transition: { ease: [0, 0.55, 0.45, 1] as any, duration: 0.7 } },
    exit: { y: "30vh", opacity: 0, transition: { duration: 0.4, ease: [0.37, 0, 0.63, 1] as any } }
  };

  return (
    <>
      <nav className="fixed w-full z-[120] top-0 py-6 md:py-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="text-2xl md:text-3xl font-bold font-serif italic tracking-widest z-[101] hover:text-primary transition-colors pointer-events-auto"
          data-cursor-text="HOME"
        >
          Athul.
        </a>
        <div className="z-[101] pointer-events-auto">
          <MagneticButton>
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="group flex w-10 h-10 md:w-12 md:h-12 justify-center items-center cursor-none relative text-white"
              data-cursor-text={isOpen ? "CLOSE" : "MENU"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <m.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl md:text-5xl"
                  >
                    <FiX />
                  </m.span>
                ) : (
                  <m.span
                    key="menu"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5 md:gap-2"
                  >
                    <span className="w-7 md:w-9 h-[2px] bg-white block" />
                    <span className="w-7 md:w-9 h-[2px] bg-white block" />
                    <span className="w-7 md:w-9 h-[2px] bg-white block" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </MagneticButton>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#111111] z-[100] origin-top flex flex-col justify-center items-center overflow-hidden px-4 sm:px-8 md:px-16 lg:px-24 py-24 md:py-28"
          >
            {/* Huge Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
              <span className="text-[clamp(10rem,25vw,35rem)] font-black uppercase text-white/5 whitespace-nowrap select-none">
                ATHUL
              </span>
            </div>

            {/* Top Left Navigation Label */}
            <m.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 0.6, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute top-8 left-4 sm:top-12 sm:left-8 md:top-16 md:left-16 lg:left-24 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 pointer-events-none z-10"
            >
              
            </m.div>

            {/* Center Menu Items */}
            <m.div 
              variants={containerVars} 
              initial="initial" 
              animate="open" 
              exit="exit" 
              className="relative z-10 flex flex-col items-center justify-center text-center w-full group/nav"
            >
              {navLinks.map((link, idx) => (
                <div key={idx} className="overflow-hidden flex justify-center py-2 md:py-3 w-full">
                  <m.div variants={mobileLinkVars}>
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`group flex items-center gap-4 md:gap-8 text-[clamp(1.75rem,3.5vw,3rem)] font-sans uppercase font-black tracking-normal leading-[1] transition-all duration-500 cursor-none w-max mx-auto md:hover:scale-105 group-hover/nav:text-white/20 hover:!text-primary ${
                        activeSection === link.href.replace('#', '')
                          ? 'text-primary'
                          : 'text-white'
                      }`}
                      data-cursor-text={link.name.toUpperCase()}
                    >
                      <span className={`text-xs md:text-sm font-mono tracking-widest transition-colors duration-500 mt-1 md:mt-2 block ${
                        activeSection === link.href.replace('#', '')
                          ? 'text-primary/60'
                          : 'text-white/40 group-hover:text-primary/60'
                      }`}>
                        {link.num}
                      </span>
                      <span className="relative z-10 block">
                        {link.name}
                      </span>
                    </a>
                  </m.div>
                </div>
              ))}
            </m.div>

            {/* Bottom Left Social Links */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute bottom-8 left-4 sm:bottom-12 sm:left-8 md:bottom-16 md:left-16 lg:left-24 flex flex-col gap-3 md:gap-4 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-white/60 z-10"
            >
              <a 
                href="https://github.com/Athul666MS" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors cursor-none w-max" 
                data-cursor-text="GITHUB"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/athul-sivanand-73875635a" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors cursor-none w-max" 
                data-cursor-text="LINKEDIN"
              >
                LinkedIn
              </a>
            </m.div>

            {/* Bottom Right Email */}
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute bottom-8 right-4 sm:bottom-12 sm:right-8 md:bottom-16 md:right-16 lg:right-24 text-[10px] md:text-xs font-bold tracking-[0.1em] text-white/30 hover:text-white/80 transition-colors z-10 hidden sm:block"
            >
              <a 
                href="mailto:athulsivanand14@gmail.com" 
                className="cursor-none lowercase" 
                data-cursor-text="EMAIL"
              >
                athulsivanand14@gmail.com
              </a>
            </m.div>

          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] as any } },
    open: { y: 0, transition: { ease: [0, 0.55, 0.45, 1] as any, duration: 0.7 } },
    exit: { y: "30vh", transition: { duration: 0.4, ease: [0.37, 0, 0.63, 1] as any } }
  };

  return (
    <>
      <nav className="fixed w-full z-[120] top-0 py-6 md:py-10 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <Link to="/" className="text-2xl md:text-3xl font-bold font-serif italic tracking-widest z-[101] hover:text-primary transition-colors pointer-events-auto" data-cursor-text="HOME">
          Athul.
        </Link>
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
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl md:text-5xl"
                  >
                    <FiX />
                  </motion.span>
                ) : (
                  <motion.span
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
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </MagneticButton>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#111111] z-[100] origin-top flex flex-col justify-center items-center overflow-hidden px-4 py-24 md:py-28"
          >
            {/* Center Menu Items */}
            <motion.div variants={containerVars} initial="initial" animate="open" exit="exit" className="flex max-h-[68vh] w-full flex-col items-center justify-center text-center">
              {navLinks.map((link, idx) => (
                <div key={idx} className="overflow-hidden flex justify-center py-1 md:py-1.5">
                  <motion.div variants={mobileLinkVars}>
                    {link.href.startsWith('#') ? (
                      <a 
                        href={link.href} 
                        onClick={toggleMenu}
className="
text-[clamp(2rem,3.8vw,3.5rem)]
font-sans
uppercase
font-black
tracking-normal
leading-[0.9]
text-white
hover:text-primary
transition-all
duration-300
md:hover:scale-[1.025]
inline-block
relative
group
w-max
max-w-[94vw]
cursor-none
"                        data-cursor-text={link.name.toUpperCase()}
                      >
                        <span className="relative z-10 block">{link.name}</span>
                      </a>
                    ) : (
                      <Link 
                        to={link.href} 
                        onClick={toggleMenu}
                        className="text-[clamp(2.15rem,5.4vw,4.6rem)] font-sans uppercase font-black tracking-normal leading-[0.9] text-white hover:text-primary transition-all duration-300 md:hover:scale-[1.025] inline-block relative group w-max max-w-[94vw] cursor-none"
                        data-cursor-text={link.name.toUpperCase()}
                      >
                        <span className="relative z-10 block">{link.name}</span>
                      </Link>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>

            {/* Bottom Social Links Area */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 flex gap-8 md:gap-14 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase text-text-secondary"
            >
              <a 
                href="https://github.com/Athul666MS" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors cursor-none" 
                data-cursor-text="GITHUB"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/athul-sivanand-73875635a" 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-primary transition-colors cursor-none" 
                data-cursor-text="LINKEDIN"
              >
                LinkedIn
              </a>
              <a 
                href="mailto:athulsivanand14@gmail.com" 
                className="hover:text-primary transition-colors cursor-none" 
                data-cursor-text="EMAIL"
              >
                Email
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

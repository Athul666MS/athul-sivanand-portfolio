import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { Link } from 'react-router-dom';

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

  const menuVars = {
    initial: { scaleY: 0 },
    animate: { scaleY: 1, transition: { duration: 0.6, ease: [0.12, 0, 0.39, 0] as any } },
    exit: { scaleY: 0, transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } }
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: { transition: { delayChildren: 0.3, staggerChildren: 0.09, staggerDirection: 1 } }
  };

  const mobileLinkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] as any } },
    open: { y: 0, transition: { ease: [0, 0.55, 0.45, 1] as any, duration: 0.7 } }
  };

  return (
    <>
      <nav className="fixed w-full z-[100] top-0 py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex justify-between items-center mix-blend-difference text-white">
        <Link to="/" className="text-xl md:text-2xl font-bold font-serif italic tracking-widest z-[101] hover:text-primary transition-colors" data-cursor-text="HOME">
          Athul.
        </Link>
        <MagneticButton className="z-[101]">
          <div onClick={toggleMenu} className="group flex flex-col gap-1.5 md:gap-2 w-8 md:w-10 h-8 md:h-10 justify-center items-center cursor-none relative p-1 md:p-2">
            <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="w-6 md:w-8 h-[2px] bg-white block transition-transform origin-center" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 md:w-8 h-[2px] bg-white block transition-opacity" />
            <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="w-6 md:w-8 h-[2px] bg-white block transition-transform origin-center" />
          </div>
        </MagneticButton>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#111111] z-[99] origin-top flex flex-col justify-center items-center overflow-y-auto py-20"
          >
            <motion.div variants={containerVars} initial="initial" animate="open" exit="initial" className="flex flex-col gap-4 sm:gap-6 md:gap-8 text-center px-4 w-full">
              {navLinks.map((link, idx) => (
                <div key={idx} className="overflow-hidden w-full flex justify-center">
                  <motion.div variants={mobileLinkVars}>
                    {link.href.startsWith('#') ? (
                      <a 
                        href={link.href} 
                        onClick={toggleMenu}
                        className="text-[clamp(2rem,6vw,4.5rem)] font-sans uppercase font-black text-white hover:text-primary transition-colors inline-block relative group w-full"
                        data-cursor-text="GO"
                      >
                        <span className="relative z-10 block truncate max-w-full">{link.name}</span>
                        <span className="hidden md:block absolute left-0 bottom-0 w-full h-[0.1em] bg-primary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></span>
                      </a>
                    ) : (
                      <Link 
                        to={link.href} 
                        onClick={toggleMenu}
                        className="text-[clamp(2rem,6vw,4.5rem)] font-sans uppercase font-black text-white hover:text-primary transition-colors inline-block relative group w-full"
                        data-cursor-text="GO"
                      >
                        <span className="relative z-10 block truncate max-w-full">{link.name}</span>
                        <span className="hidden md:block absolute left-0 bottom-0 w-full h-[0.1em] bg-primary origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></span>
                      </Link>
                    )}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

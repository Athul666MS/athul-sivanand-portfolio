import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 lg:py-48 bg-white text-[#111111] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex flex-col lg:flex-row gap-16 lg:gap-20">
        
        {/* Left Info */}
        <div className="flex-1 w-full">
          <h2 className="text-[clamp(3rem,7vw,6rem)] font-serif uppercase tracking-tighter leading-[0.8] mb-8 md:mb-12" data-cursor-text="HELLO">
            Let's Build <span className="text-primary italic normal-case block pr-4">Something Great</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-3xl font-sans text-text-secondary max-w-md mb-12 md:mb-16 leading-tight">
            Looking for a backend specialist or a full-stack developer to bring your vision to life? Let's connect.
          </p>

          <div className="flex flex-col gap-6 md:gap-8 text-base sm:text-lg md:text-2xl font-bold font-sans lowercase tracking-wider">
            <a href="mailto:athulsivanand14@gmail.com" className="hover:text-primary transition-colors flex items-center gap-3 md:gap-4 group cursor-none w-max break-all" data-cursor-text="EMAIL">
              <span className="w-6 md:w-8 h-[2px] bg-black group-hover:bg-primary transition-colors shrink-0"></span>
              <span className="truncate">athulsivanand14@gmail.com</span>
            </a>
            <a href="tel:+918921387929" className="hover:text-primary transition-colors flex items-center gap-3 md:gap-4 group cursor-none w-max" data-cursor-text="CALL">
              <span className="w-6 md:w-8 h-[2px] bg-black group-hover:bg-primary transition-colors shrink-0"></span>
              +91 8921387929
            </a>
            <div className="flex items-center gap-3 md:gap-4 text-text-secondary w-max">
              <span className="w-6 md:w-8 h-[2px] bg-text-secondary shrink-0"></span>
              Thrissur, Kerala
            </div>
            <a href="https://github.com/Athul666MS" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3 md:gap-4 group cursor-none w-max" data-cursor-text="GITHUB">
              <span className="w-6 md:w-8 h-[2px] bg-black group-hover:bg-primary transition-colors shrink-0"></span>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/athul-sivanand-73875635a" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-3 md:gap-4 group cursor-none w-max" data-cursor-text="LINKEDIN">
              <span className="w-6 md:w-8 h-[2px] bg-black group-hover:bg-primary transition-colors shrink-0"></span>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 w-full lg:pl-10 mt-10 lg:mt-0">
          {formState === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 md:p-12 bg-[#ECECEC] rounded-2xl md:rounded-[3rem]"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-8 md:mb-10">
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-3xl md:text-5xl font-serif italic mb-4 md:mb-6 text-primary">Message Sent</h3>
              <p className="text-text-secondary font-sans text-lg md:text-xl">Thank you for reaching out. I'll get back to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10 md:gap-16 group/form w-full">
              <div className="relative z-0 w-full group">
                <input type="text" id="name" required className="block py-3 md:py-4 px-0 w-full text-xl md:text-3xl font-serif text-black bg-transparent border-0 border-b-[3px] border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer cursor-none" placeholder=" " data-cursor-text="TYPE" />
                <label htmlFor="name" className="absolute text-lg md:text-2xl font-sans font-medium text-text-secondary duration-300 transform -translate-y-8 md:-translate-y-10 scale-75 top-3 md:top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 md:peer-focus:-translate-y-10">What's your name?</label>
              </div>
              
              <div className="relative z-0 w-full group">
                <input type="email" id="email" required className="block py-3 md:py-4 px-0 w-full text-xl md:text-3xl font-serif text-black bg-transparent border-0 border-b-[3px] border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer cursor-none" placeholder=" " data-cursor-text="TYPE" />
                <label htmlFor="email" className="absolute text-lg md:text-2xl font-sans font-medium text-text-secondary duration-300 transform -translate-y-8 md:-translate-y-10 scale-75 top-3 md:top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 md:peer-focus:-translate-y-10">What's your email?</label>
              </div>

              <div className="relative z-0 w-full group">
                <textarea id="message" required rows={4} className="block py-3 md:py-4 px-0 w-full text-xl md:text-3xl font-serif text-black bg-transparent border-0 border-b-[3px] border-black/20 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer resize-none cursor-none" placeholder=" " data-cursor-text="TYPE"></textarea>
                <label htmlFor="message" className="absolute text-lg md:text-2xl font-sans font-medium text-text-secondary duration-300 transform -translate-y-8 md:-translate-y-10 scale-75 top-3 md:top-4 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 md:peer-focus:-translate-y-10">Tell me about your project</label>
              </div>

              <button 
                type="submit" 
                disabled={formState === 'submitting'}
                className="group/btn self-start text-xl md:text-3xl font-black font-sans uppercase tracking-widest flex items-center gap-4 md:gap-6 hover:text-primary transition-colors cursor-none disabled:opacity-50 mt-2 md:mt-4"
                data-cursor-text="SEND"
              >
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                <div className="w-10 md:w-16 h-[3px] bg-black group-hover/btn:bg-primary group-hover/btn:scale-x-150 origin-left transition-all duration-300"></div>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

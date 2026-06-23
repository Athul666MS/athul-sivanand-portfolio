import React from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Projects } from '../sections/Projects';
import { Certifications } from '../sections/Certifications';
import { Contact } from '../sections/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
};

export default Home;

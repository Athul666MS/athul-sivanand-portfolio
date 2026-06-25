import React, { Suspense, lazy } from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Experience } from '../sections/Experience';
import { Certifications } from '../sections/Certifications';

const Projects = lazy(() =>
  import('../sections/Projects').then((module) => ({ default: module.Projects }))
);
const Contact = lazy(() =>
  import('../sections/Contact').then((module) => ({ default: module.Contact }))
);

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <Certifications />
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;

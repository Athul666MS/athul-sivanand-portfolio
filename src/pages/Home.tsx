import React, { Suspense, lazy } from 'react';
import { Hero } from '../sections/Hero';
import { Experience } from '../sections/Experience';
import { Certifications } from '../sections/Certifications';

const About = lazy(() =>
  import('../sections/About').then((module) => ({ default: module.About }))
);
const Skills = lazy(() =>
  import('../sections/Skills').then((module) => ({ default: module.Skills }))
);
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
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <Skills />
      </Suspense>
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

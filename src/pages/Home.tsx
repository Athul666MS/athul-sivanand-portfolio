import React, { Suspense, lazy } from 'react';
import { Hero } from '../sections/Hero';

const About = lazy(() =>
  import('../sections/About').then((module) => ({ default: module.About }))
);
const Skills = lazy(() =>
  import('../sections/Skills').then((module) => ({ default: module.Skills }))
);
const Experience = lazy(() =>
  import('../sections/Experience').then((module) => ({ default: module.Experience }))
);
const Projects = lazy(() =>
  import('../sections/Projects').then((module) => ({ default: module.Projects }))
);
const Certifications = lazy(() =>
  import('../sections/Certifications').then((module) => ({ default: module.Certifications }))
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
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <Suspense fallback={null}>
        <Certifications />
      </Suspense>
      <Suspense fallback={null}>
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;

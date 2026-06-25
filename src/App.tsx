import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  useSmoothScroll();

  return (
    <LazyMotion features={domAnimation} strict>
      <CustomCursor />
      <Navbar />
      <Home />
      <Footer />
    </LazyMotion>
  );
}

export default App;

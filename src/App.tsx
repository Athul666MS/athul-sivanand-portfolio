import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  useSmoothScroll();

  return (
    <Router>
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorElement = target.closest('[data-cursor-text]');
      
      if (cursorElement || target.closest('a') || target.closest('button') || target.closest('[data-cursor="hover"]')) {
        setIsHovering(true);
        if (cursorElement) {
          setHoverText(cursorElement.getAttribute('data-cursor-text') || '');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Responsive cursor sizes
  let size = 80; // Desktop default
  let hoverSize = 100; // Desktop hover
  
  if (windowWidth < 480) {
    // Hide completely below 480px
    return null;
  } else if (windowWidth < 768) {
    size = 24; // Mobile (480px - 768px)
    hoverSize = 24;
  } else if (windowWidth < 1024) {
    size = 50; // Tablet (768px - 1024px)
    hoverSize = 50;
  }

  const currentSize = isHovering ? hoverSize : size;
  const showText = windowWidth >= 1024 && hoverText; // Only show text on desktop

  const variants = {
    default: {
      x: mousePosition.x - size / 2,
      y: mousePosition.y - size / 2,
      height: size,
      width: size,
      backgroundColor: 'transparent',
      border: '1px solid rgba(198, 128, 69, 0.7)',
      mixBlendMode: 'normal' as any,
    },
    hover: {
      x: mousePosition.x - hoverSize / 2,
      y: mousePosition.y - hoverSize / 2,
      height: hoverSize,
      width: hoverSize,
      backgroundColor: 'var(--color-primary)',
      border: 'none',
      mixBlendMode: 'normal' as any,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-white text-[10px] font-bold text-center tracking-widest shadow-lg will-change-transform"
      variants={variants}
      animate={isHovering && hoverText ? 'hover' : 'default'}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
    >
      {showText && <span className="uppercase">{hoverText}</span>}
    </motion.div>
  );
};

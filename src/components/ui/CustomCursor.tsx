import React, { useEffect, useState, useCallback } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

const SPRING_OUTER = { stiffness: 200, damping: 20, mass: 0.5 };
const SPRING_DOT = { stiffness: 300, damping: 20, mass: 0.3 }; // faster / more responsive

const RING_SIZE = 40;
const DOT_SIZE = 8;
const HOVER_SIZE = 90;

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  // Raw mouse values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Outer ring springs (standard)
  const ringX = useSpring(mouseX, SPRING_OUTER);
  const ringY = useSpring(mouseY, SPRING_OUTER);

  // Inner dot springs (faster response)
  const dotX = useSpring(mouseX, SPRING_DOT);
  const dotY = useSpring(mouseY, SPRING_DOT);

  // ── Touch / pointer detection ──────────────────────────────────
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine) and (min-width: 768px)');

    const update = () => setIsVisible(mql.matches);
    update();

    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // ── Mouse tracking & hover detection ───────────────────────────
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY],
  );

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const cursorElement = target.closest('[data-cursor-text]');

    if (cursorElement) {
      setIsHovering(true);
      setHoverText(cursorElement.getAttribute('data-cursor-text') || '');
    } else {
      setIsHovering(false);
      setHoverText('');
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, handleMouseMove, handleMouseOver]);

  // ── Hide on touch devices / small screens ──────────────────────
  if (!isVisible) return null;

  // ── Derived values ─────────────────────────────────────────────
  const showText = isHovering && hoverText;
  const currentSize = showText ? HOVER_SIZE : RING_SIZE;

  return (
    <>
      {/* ── Outer ring ──────────────────────────────────────────── */}
      <m.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: currentSize,
          height: currentSize,
          backgroundColor: showText
            ? 'var(--color-primary)'
            : 'transparent',
          border: showText
            ? 'none'
            : '1px solid rgba(198,128,69,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
      >
        {showText && (
          <m.span
            className="uppercase font-bold text-[10px] tracking-widest text-white text-center leading-tight pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {hoverText}
          </m.span>
        )}
      </m.div>

      {/* ── Inner dot ───────────────────────────────────────────── */}
      <m.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: 'var(--color-primary)',
        }}
        animate={{
          scale: showText ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.3 }}
      />
    </>
  );
};

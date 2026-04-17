'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

const springConfig = { damping: 25, stiffness: 500 };

export function AnimatedCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Отключаем курсор на мобильных и при prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches || window.innerWidth <= 768) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('data-cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      setIsPointer(!!isInteractive);
    };

    const handleMouseDown = () => setIsHovering(true);
    const handleMouseUp = () => setIsHovering(false);

    // Скрываем системный курсор
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    window.addEventListener('mousemove', updateCursor, { passive: true });
    window.addEventListener('mouseover', checkInteractive, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mouseover', checkInteractive);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Точка курсора */}
      <motion.div
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={cn(
          'fixed pointer-events-none z-[9999] w-2 h-2 rounded-full bg-primary',
          isPointer && 'scale-50',
          isHovering && 'scale-75'
        )}
      />

      {/* Круг вокруг курсора */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={cn(
          'fixed pointer-events-none z-[9998] w-10 h-10 rounded-full border-2 border-primary/50',
          isPointer && 'scale-150 border-primary/30 bg-primary/10',
          isHovering && 'scale-125'
        )}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}

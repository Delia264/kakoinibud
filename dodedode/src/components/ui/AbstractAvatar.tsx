'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AbstractAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AbstractAvatar({ size = 'lg', className }: AbstractAvatarProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32 md:w-48 md:h-48',
    xl: 'w-48 h-48 md:w-80 md:h-80',
  };

  return (
    <div
      className={cn(
        'avatar-abstract rounded-3xl relative',
        sizeClasses[size],
        className
      )}
    >
      {/* Animated shapes inside */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-3/4 h-3/4 border-4 border-white/30 rounded-full" />
      </motion.div>

      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
          scale: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-1/2 h-1/2 border-2 border-white/40 rounded-full" />
      </motion.div>

      {/* Floating circles */}
      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-4 right-4 w-4 h-4 bg-white/40 rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -8, 0],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-6 left-6 w-3 h-3 bg-white/30 rounded-full"
      />

      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-white/20 rounded-full blur-xl" />
      </div>
    </div>
  );
}

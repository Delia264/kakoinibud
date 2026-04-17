'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { PROFILE } from '@/lib/constants';
import { AbstractAvatar } from '@/components/ui/AbstractAvatar';

interface HeroSectionProps {
  onContactClick: () => void;
  onProjectsClick: () => void;
}

export function HeroSection({ onContactClick, onProjectsClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10"
    >
      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar */}
          <FadeIn>
            <div className="flex justify-center lg:justify-start">
              <AbstractAvatar size="xl" />
            </div>
          </FadeIn>

          {/* Right: Text Content */}
          <div className="text-center lg:text-left space-y-6 overflow-hidden">
            <FadeIn delay={0.1}>
              <p className="text-primary font-bold tracking-widest uppercase text-sm md:text-base">
                Привет, меня зовут
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-huge gradient-text break-words max-w-full">
                {PROFILE.name.split(' ')[0]}
                <br />
                {PROFILE.name.split(' ')[1] || ''}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/80 max-w-full">
                {PROFILE.role}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <p className="text-lg md:text-xl text-foreground/60 max-w-xl mx-auto lg:mx-0">
                Создаю современные, быстрые и доступные веб-приложения с
                использованием React, Next.js и TypeScript
              </p>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={onProjectsClick}
                  className="w-full sm:w-auto min-w-[200px] btn-bold text-lg px-8 py-4"
                >
                  <span className="relative z-10">Смотреть проекты</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onContactClick}
                  className="w-full sm:w-auto min-w-[200px] text-lg px-8 py-4 border-2"
                >
                  <span className="relative z-10">Связаться со мной</span>
                </Button>
              </div>
            </FadeIn>

            {/* Tech Stack Pills */}
            <FadeIn delay={0.6}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-6">
                {['React', 'Next.js', 'TypeScript', 'Tailwind'].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="px-4 py-2 bg-muted/50 border border-border rounded-full text-sm font-semibold text-foreground/70"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <FadeIn delay={0.8}>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
          >
            <span className="text-xs uppercase tracking-widest text-foreground/40">
              Листай вниз
            </span>
            <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}

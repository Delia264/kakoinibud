'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { SKILLS, PROFILE } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';

export function AboutSection() {
  return (
    <Section id="about" subtitle="Обо мне">
      <div className="section-card-about p-8 md:p-12">
      {/* Title с градиентом */}
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text inline-block">
          {PROFILE.name}
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Description */}
        <FadeIn>
          <div className="space-y-8">
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-xl text-foreground/80 leading-relaxed">
                {PROFILE.bio.full}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-card border-2 border-border rounded-2xl hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                    Локация
                  </span>
                </div>
                <p className="text-lg font-semibold">{PROFILE.location}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-6 bg-card border-2 border-border rounded-2xl hover:border-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                    Опыт
                  </span>
                </div>
                <p className="text-lg font-semibold">{PROFILE.experience}</p>
              </motion.div>
            </div>
          </div>
        </FadeIn>

        {/* Skills */}
        <FadeIn delay={0.2}>
          <div>
            <h3 className="text-3xl md:text-4xl font-black mb-8 text-foreground">
              НАВЫКИ
            </h3>
            <div className="space-y-6">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold text-foreground/60 bg-muted px-3 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden border border-border">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.1,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
      </div>
    </Section>
  );
}

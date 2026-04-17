'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PROJECTS } from '@/lib/constants';
import { FadeIn } from '@/components/animations/FadeIn';
import { cn } from '@/lib/utils';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null);

  return (
    <Section id="projects" subtitle="Избранные работы">
      <div className="section-card-projects p-8 md:p-12">
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text inline-block">
          ПРОЕКТЫ
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <Card
              variant="elevated"
              className={cn(
                'card-bold group cursor-pointer bg-card border-2 border-border',
                project.featured && 'border-primary'
              )}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      >
                        <svg
                          className="w-10 h-10 text-white/80"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300" />

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full">
                    Featured
                  </div>
                )}

                {/* Hover Arrow */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  className="absolute bottom-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.div>
              </div>

              <CardContent className="space-y-4 pt-6">
                <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <p className="text-foreground/60 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs font-bold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1.5 rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-border"
            >
              {/* Modal Header with Image */}
              <div className="aspect-video relative">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/40" />
                )}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors border-2 border-border z-10"
                  aria-label="Закрыть"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-8 space-y-6">
                <h3 className="text-3xl md:text-4xl font-black">
                  {selectedProject.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {selectedProject.fullDescription || selectedProject.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-bold uppercase tracking-wider bg-primary/10 text-primary px-4 py-2 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="lg" className="btn-bold">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Демо
                      </Button>
                    </a>
                  )}
                  {selectedProject.codeUrl && (
                    <a
                      href={selectedProject.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="lg" className="border-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 6.484v11.27c0 .276.224.5.5.5h.707a.5.5 0 00.5-.5v-2.196c0-.762.262-1.297.554-1.558.177-.158.391-.195.605-.195.214 0 .428.037.605.195.292.261.554.796.554 1.558v2.196a.5.5 0 00.5.5h.707a.5.5 0 00.5-.5V6.484c0-3.007-2.436-5.443-5.443-5.443S6.484 3.477 6.484 6.484v11.27a.5.5 0 00.5.5h.707a.5.5 0 00.5-.5v-2.196c0-.762.262-1.297.554-1.558.177-.158.391-.195.605-.195.214 0 .428.037.605.195.292.261.554.796.554 1.558v2.196a.5.5 0 00.5.5h.707a.5.5 0 00.5-.5V6.484z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Код
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </Section>
  );
}

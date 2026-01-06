'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.main
      className="flex flex-col gap-8 pb-20"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-3xl text-ink-100">projects</h1>
        <p className="text-sm text-chrome-400">
          curated builds focused on clarity, speed, and resilient systems
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </motion.main>
  );
}

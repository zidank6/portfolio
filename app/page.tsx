'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { HeroFrame } from '@/components/HeroFrame';
import { ProjectCard } from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.main
      className="flex flex-col gap-12 pb-20"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
    >
      <HeroFrame />

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl text-ink-100">projects</h2>
          <Link
            href="/projects"
            className="text-xs tracking-[0.3em] text-chrome-400 transition hover:text-ink-100"
          >
            view all
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </motion.main>
  );
}

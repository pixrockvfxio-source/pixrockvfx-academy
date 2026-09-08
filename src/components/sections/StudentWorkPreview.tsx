import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types/content';
import { projects } from '@/data/projects';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { ProjectCard } from '@/components/ProjectCard/ProjectCard';
import { ProjectDialog } from '@/components/ProjectCard/ProjectDialog';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function StudentWorkPreview() {
  const [active, setActive] = useState<Project | null>(null);
  const showcase = projects.slice(0, 3);

  return (
    <section className="section border-t border-ink-800/80" aria-labelledby="work-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            id="work-heading"
            eyebrow="Student work"
            title={
              <>
                Shots taken all the way to <span className="text-grade">delivery</span>
              </>
            }
            description="A finished shot with a breakdown says more than a folder of experiments. Here is what that looks like."
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button to="/student-work" variant="outline">
              Explore the showreel
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcase.map((project, index) => (
            <Reveal as="li" key={project.id} index={index} className="h-full">
              <ProjectCard project={project} onOpen={setActive} />
            </Reveal>
          ))}
        </ul>
      </div>

      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </section>
  );
}

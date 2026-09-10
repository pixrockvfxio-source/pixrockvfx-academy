import { ArrowRight } from 'lucide-react';
import { featuredCourses } from '@/data/courses';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { CourseGrid } from '@/components/CourseGrid/CourseGrid';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export function CoursesPreview() {
  return (
    <section className="section border-t border-ink-800/80" aria-labelledby="courses-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            id="courses-heading"
            eyebrow="Programmes"
            title={
              <>
Courses that map to real <span className="text-grade">studio roles</span>
              </>
            }
            description="Start with a foundation craft, specialise in a discipline, or take the twelve-month flagship. Every fee shown is inclusive of GST."
          />
          <Reveal delay={0.1} className="shrink-0">
            <Button to="/courses" variant="outline">
              View all courses
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </Reveal>
        </div>

        <CourseGrid courses={featuredCourses} className="mt-12" />
      </div>
    </section>
  );
}

import type { Course } from '@/types/content';
import { CourseCard } from '@/components/CourseCard/CourseCard';
import { Reveal } from '@/components/ui/Reveal';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/cn';

type Props = {
  courses: Course[];
  className?: string;
  emptyMessage?: string;
};

export function CourseGrid({ courses, className, emptyMessage }: Props) {
  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses match that filter"
        description={emptyMessage ?? 'Try a different track, or view the full catalogue.'}
      />
    );
  }

  return (
    <ul className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {courses.map((course, index) => (
        <Reveal as="li" key={course.slug} index={index % 3} className="h-full">
          <CourseCard course={course} />
        </Reveal>
      ))}
    </ul>
  );
}

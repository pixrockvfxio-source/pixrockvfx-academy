import { testimonials } from '@/data/testimonials';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { TestimonialSlider } from '@/components/TestimonialCard/TestimonialSlider';
import { Reveal } from '@/components/ui/Reveal';

export function TestimonialsSection() {
  return (
    <section className="section border-t border-ink-800/80 bg-ink-900/40" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <SectionTitle
          id="testimonials-heading"
          eyebrow="Student voices"
          title={
            <>
              What changes when you train <span className="text-grade">like a studio</span>
            </>
          }
        />

        <Reveal className="mt-12">
          <TestimonialSlider testimonials={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}

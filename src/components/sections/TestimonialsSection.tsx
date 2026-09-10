import { testimonials } from '@/data/testimonials';
import { SectionTitle } from '@/components/SectionTitle/SectionTitle';
import { TestimonialSlider } from '@/components/TestimonialCard/TestimonialSlider';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Renders nothing until there are real testimonials.
 *
 * The academy has no graduates yet (first intake April 2027), and the brochure
 * forbids any copy implying a track record. An empty heading with no quotes
 * under it would imply one, so the whole section is withheld — and returns on
 * its own the moment src/data/testimonials.ts has entries.
 */
export function TestimonialsSection() {
  if (testimonials.length === 0) return null;

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

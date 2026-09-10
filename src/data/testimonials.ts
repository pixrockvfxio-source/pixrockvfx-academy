import type { Testimonial } from '@/types/content';

/**
 * INTENTIONALLY EMPTY.
 *
 * PixRock Academy opens in April 2027 and has no graduates yet. The Parent
 * Brochure Copy is explicit about this (rule 3, and §5 "On our first batch"):
 *
 *   "We do not have placement results yet. The first batch has no track
 *    record, and no copy may imply one."
 *
 * Publishing invented or placeholder testimonials would break that rule, and
 * it is the kind of thing a prospective parent can check. The site handles an
 * empty list deliberately: the home page shows the founding-batch position
 * instead of a testimonial carousel.
 *
 * Add entries here only when they are real, attributable and consented. The
 * carousel returns automatically as soon as this array is non-empty.
 */
export const testimonials: Testimonial[] = [];

import { ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

type Props = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  className?: string;
};

/**
 * Closing call to action.
 *
 * Deliberately the one dark block on a light page. A pale panel on pale paper
 * has no pull, and this is the last thing a visitor sees before the footer —
 * it should stop them. The inversion also lets the brand's cinematic register
 * back in without fighting legibility anywhere else.
 */
export function CTASection({
  eyebrow = 'Admissions open',
  title,
  description,
  primaryLabel = 'Apply Now',
  primaryTo = '/enquiry',
  secondaryLabel = 'Talk to Our Counsellor',
  secondaryTo = '/contact',
  className,
}: Props) {
  return (
    <section className={cn('section', className)} aria-labelledby="cta-heading">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-panel bg-ink px-6 py-14 text-center shadow-lift sm:px-12 sm:py-18">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 left-1/2 size-[30rem] -translate-x-1/2 rounded-full bg-ember-600/25 blur-[110px]" />
            <div className="absolute -right-24 -bottom-32 size-80 rounded-full bg-signal-500/20 blur-[110px]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.24em] text-ember-300 uppercase">{eyebrow}</p>
            <h2 id="cta-heading" className="mt-4 text-display text-white">
              {title}
            </h2>
            <p className="mt-4 text-base/relaxed text-white/75 sm:text-lg/relaxed">{description}</p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button to={primaryTo} size="lg">
                {primaryLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Button>
              <Button
                to={secondaryTo}
                size="lg"
                variant="secondary"
                className="border-white/25 bg-white/10 text-white shadow-none hover:border-white/40 hover:bg-white/15"
              >
                <PhoneCall aria-hidden="true" className="size-4" />
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

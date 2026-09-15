import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';
import { academyFacts } from '@/data/academy';

/** Only facts the source documents allow us to state publicly. */
const stats = [
  { value: academyFacts.studioArtists, label: 'Artists in the building' },
  { value: academyFacts.certification, label: 'Certified production facility' },
  { value: academyFacts.firstIntake, label: 'First intake' },
];

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Home hero.
 *
 * On a light page the old treatment — full-bleed artwork under a heavy scrim —
 * stops working: there is no dark ground to sink the image into, and washing it
 * out to keep text legible leaves grey mud behind the headline. So the artwork
 * becomes a deliberate object instead of a backdrop: a framed panel beside the
 * copy, where it can stay at full contrast and carry its own weight. Type sits
 * on clean paper, which is where it reads best.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease },
        };

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      {/* Backdrop: paper, a faint grid, and two soft washes for warmth. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-canvas" />
        <div className="grid-lines absolute inset-0 opacity-40 mask-fade-b" />
        <div className="absolute -top-48 -left-40 size-[42rem] rounded-full bg-ember-100/70 blur-[120px]" />
        <div className="absolute -top-20 right-0 size-[34rem] rounded-full bg-signal-50 blur-[120px]" />
      </div>

      <div className="container-page pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- Copy ---------------- */}
          <div className="lg:col-span-7">
            <motion.p
              {...rise(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-body shadow-soft"
            >
              <Sparkles aria-hidden="true" className="size-3.5 text-ember-600" />
              {academyFacts.city} · First intake {academyFacts.firstIntake}
            </motion.p>

            <motion.h1 {...rise(0.14)} id="hero-heading" className="mt-7 text-hero text-ink">
              Learn VFX
              <br />
              inside a
              <br />
              <span className="text-grade">working studio.</span>
            </motion.h1>

            <motion.p {...rise(0.24)} className="mt-7 max-w-xl text-base/relaxed text-body sm:text-lg/relaxed">
              PixRock Academy is the training arm of PixRock — a TPN Gold+ certified VFX facility in{' '}
              {academyFacts.city} with around {academyFacts.studioArtists} artists. You train on our pipeline, to our
              standards, taught by people who are on live production this week.
            </motion.p>

            <motion.div
              {...rise(0.34)}
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/courses" size="lg">
                Explore Courses
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button to="/enquiry" variant="secondary" size="lg">
                Enquire Now
              </Button>
              <Button to="/contact" variant="ghost" size="lg">
                <PhoneCall aria-hidden="true" className="size-4" />
                Contact Us
              </Button>
            </motion.div>
          </div>

          {/* ---------------- Visual ---------------- */}
          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 26, scale: 0.985 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  transition: { duration: 0.8, delay: 0.2, ease },
                })}
            className="lg:col-span-5"
          >
            <div className="relative">
              <Media
                media={media.heroPrimary}
                aspect="aspect-[4/5]"
                priority
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="rounded-panel border border-line shadow-lift"
              />
              {/* Small inset frame, echoing a shot breakdown. */}
              <div className="absolute -bottom-6 -left-5 w-36 sm:w-44 lg:-left-8">
                <Media
                  media={media.heroSecondary}
                  aspect="aspect-square"
                  sizes="180px"
                  className="rounded-card border-4 border-canvas shadow-lift"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---------------- Stats ---------------- */}
        <motion.dl
          {...rise(0.46)}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-8 sm:grid-cols-3 lg:mt-20"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-bold text-ink sm:text-3xl">{stat.value}</span>
                <span className="mt-1 block text-sm text-subtle">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

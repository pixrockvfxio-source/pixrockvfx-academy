import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Media } from '@/components/ui/Media';
import { media } from '@/config/media';

const stats = [
  { value: '8', label: 'Specialised programmes' },
  { value: '12+', label: 'Industry tools covered' },
  { value: '1:1', label: 'Mentor shot reviews' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className="relative isolate overflow-hidden" aria-labelledby="hero-heading">
      {/* --- Backdrop layers -------------------------------------------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Media media={media.heroPrimary} aspect="aspect-auto" priority className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-ink-950/72" />
        <div className="absolute inset-0 bg-linear-to-b from-ink-950 via-ink-950/40 to-ink-950" />
        <div className="grid-lines absolute inset-0 opacity-30 mask-fade-b" />
        <div className="absolute -top-40 -left-32 size-[36rem] rounded-full bg-ember-600/20 blur-[130px]" />
        <div className="absolute -right-32 bottom-0 size-[30rem] rounded-full bg-signal-600/15 blur-[130px]" />
      </div>

      <div className="container-page flex min-h-[92svh] flex-col justify-center pt-32 pb-20 lg:min-h-[88vh] lg:pt-36 lg:pb-24">
        <div className="max-w-4xl">
          <motion.p
            {...rise(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-mist backdrop-blur-sm"
          >
            <Sparkles aria-hidden="true" className="size-3.5 text-ember-400" />
            Industry-focused VFX training · Admissions open
          </motion.p>

          <motion.h1 {...rise(0.14)} id="hero-heading" className="mt-7 text-hero text-chalk">
            Learn VFX.
            <br />
            <span className="text-grade">Create worlds.</span>
            <br />
            Build your career.
          </motion.h1>

          <motion.p {...rise(0.24)} className="mt-7 max-w-xl text-base/relaxed text-mist sm:text-lg/relaxed">
            PixRock VFX Academy trains artists the way facilities actually work — real plates, production workflows
            and mentor-led reviews, until your work meets the standard a studio hires on.
          </motion.p>

          <motion.div {...rise(0.34)} className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button to="/courses" size="lg">
              Explore Courses
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button to="/enquiry" variant="secondary" size="lg">
              Enquire Now
            </Button>
            <Button to="/contact" variant="ghost" size="lg">
              <PhoneCall aria-hidden="true" className="size-4" />
              Contact Us
            </Button>
          </motion.div>

          <motion.dl {...rise(0.46)} className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-ink-700/80 pt-7">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold text-chalk sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 block text-xs/relaxed text-slate-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>

      {/* Bottom fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-ink-950 to-transparent"
      />
    </section>
  );
}

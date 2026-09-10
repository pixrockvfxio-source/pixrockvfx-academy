import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, Clock3, UserCheck } from 'lucide-react';
import { Seo } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { EnquiryForm } from '@/components/ContactForm/EnquiryForm';
import { Reveal } from '@/components/ui/Reveal';
import { admissionSteps } from '@/data/academy';
import { getCourseBySlug } from '@/data/courses';

const assurances = [
  {
    icon: Clock3,
    title: 'A reply within one working day',
    description: 'Enquiries are answered by a counsellor, not an auto-responder.',
  },
  {
    icon: UserCheck,
    title: 'An honest recommendation',
    description:
      'Including telling you when a different course — or a different path entirely — suits you better.',
  },
  {
    icon: ShieldCheck,
    title: 'Your details stay with us',
    description: 'We use what you send only to respond to this enquiry. No lists, no resale.',
  },
];

export default function Enquiry() {
  const [params] = useSearchParams();
  // Allows deep links such as /enquiry?course=compositing from any campaign.
  const requested = params.get('course') ?? undefined;
  const preselected = getCourseBySlug(requested)?.slug;

  return (
    <>
      <Seo
        title="Admissions & Enquiry"
        description="Send an admissions enquiry to PixRock Academy, Coimbatore. Tell us your background and the discipline you are drawn to, and a counsellor will recommend the course that fits. First intake April 2027."
        path="/enquiry"
      />

      <PageHero
        eyebrow="Admissions"
        title={
          <>
            Start with a <span className="text-grade">conversation</span>
          </>
        }
        description="No portfolio needed at this stage. Tell us where you are now and what you want to build. We will explain the courses, the full fee including GST, and which option actually suits you."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Admissions' }]}
      />

      <section className="section" aria-labelledby="enquiry-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 id="enquiry-heading" className="text-title text-chalk">
              What happens next
            </h2>

            <Reveal delay={0.06}>
              <ol className="mt-8 space-y-6">
                {admissionSteps.map((step) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink-600 bg-ink-850 font-display text-xs font-bold text-ember-400">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-chalk">{step.title}</h3>
                      <p className="mt-1.5 text-sm/relaxed text-mist">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <ul className="mt-10 space-y-4 border-t border-ink-800 pt-8">
                {assurances.map((item) => (
                  <li key={item.title} className="flex gap-3.5">
                    <item.icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-signal-400" />
                    <p className="text-sm/relaxed text-mist">
                      <span className="font-semibold text-chalk">{item.title}.</span> {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <EnquiryForm defaultCourse={preselected} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

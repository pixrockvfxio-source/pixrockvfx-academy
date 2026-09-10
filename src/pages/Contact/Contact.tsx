import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Youtube, Linkedin, Facebook } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Seo, organisationJsonLd } from '@/components/Seo/Seo';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from '@/components/ContactForm/EnquiryForm';
import { Button } from '@/components/ui/Button';
import { siteConfig, formattedAddress, whatsappLink, telLink, mailtoLink } from '@/config/site';

const socialIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
};

export default function Contact() {
  const address = formattedAddress();
  const whatsapp = whatsappLink();
  const tel = telLink();
  const mail = mailtoLink('Enquiry from the website');
  const activeSocials = siteConfig.socials.filter((social) => social.href);

  return (
    <>
      <Seo
        title="Contact & Admissions"
        description="Get in touch with PixRock Academy in Coimbatore. Send an enquiry, call, message us on WhatsApp or book a visit to the facility. Morning and evening batches; first intake April 2027."
        path="/contact"
        jsonLd={organisationJsonLd()}
      />

      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to someone who has done the <span className="text-grade">job</span>
          </>
        }
        description="Bring your family, meet the faculty and look at how we work. There is no obligation, and counselling conversations are with people who have worked in production."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="section" aria-labelledby="contact-heading">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <h2 id="contact-heading" className="text-title text-chalk">
              Academy details
            </h2>

            <Reveal delay={0.06}>
              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-ember-400">
                    <MapPin aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-chalk">Campus</h3>
                    {address.length > 0 ? (
                      <address className="mt-1.5 text-sm/relaxed text-mist not-italic">
                        {address.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </address>
                    ) : (
                      <p className="mt-1.5 text-sm/relaxed text-mist">
                        {siteConfig.contact.city}
                        <span className="mt-1 block text-slate-muted">
                          Full street address published once confirmed — send an enquiry and we will share directions.
                        </span>
                      </p>
                    )}
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-ember-400">
                    <Phone aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-chalk">Phone</h3>
                    {tel ? (
                      <a href={tel} className="mt-1.5 block text-sm text-mist transition-colors hover:text-ember-300">
                        {siteConfig.contact.phone}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-sm text-slate-muted">Phone number coming soon.</p>
                    )}
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-ember-400">
                    <Mail aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-semibold text-chalk">Email</h3>
                    {mail ? (
                      <a
                        href={mail}
                        className="mt-1.5 block break-all text-sm text-mist transition-colors hover:text-ember-300"
                      >
                        {siteConfig.contact.email}
                      </a>
                    ) : (
                      <p className="mt-1.5 text-sm text-slate-muted">Email address coming soon.</p>
                    )}
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-ember-400">
                    <Clock aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-chalk">Batches &amp; office hours</h3>
                    <p className="mt-1.5 text-sm text-mist">{siteConfig.contact.batchTimings}</p>
                    <p className="mt-1 text-sm text-slate-muted">{siteConfig.contact.officeHours}</p>
                  </div>
                </li>
              </ul>

              {whatsapp ? (
                <div className="mt-9">
                  <Button href={whatsapp} variant="outline" size="lg">
                    <MessageCircle aria-hidden="true" className="size-4" />
                    Chat With Us on WhatsApp
                  </Button>
                </div>
              ) : (
                <p className="mt-9 rounded-card border border-ink-700 bg-ink-900/60 px-5 py-4 text-xs/relaxed text-slate-muted">
                  WhatsApp will be enabled here as soon as the academy number is confirmed. Set{' '}
                  <code className="text-mist">VITE_WHATSAPP_NUMBER</code> to activate it.
                </p>
              )}

              {activeSocials.length > 0 ? (
                <div className="mt-9">
                  <h3 className="font-display text-sm font-semibold text-chalk">Follow the work</h3>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {activeSocials.map((social) => {
                      const Icon = socialIcons[social.icon] ?? Instagram;
                      return (
                        <li key={social.label}>
                          <a
                            href={social.href as string}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label={`${siteConfig.shortName} on ${social.label}`}
                            className="inline-flex size-11 items-center justify-center rounded-full border border-ink-700 text-mist transition-colors hover:border-ember-500/50 hover:bg-ember-500/10 hover:text-ember-300"
                          >
                            <Icon aria-hidden="true" className="size-4" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <EnquiryForm title="Send us a message" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section border-t border-ink-800/80 pt-0" aria-labelledby="map-heading">
        <div className="container-page pt-14">
          <h2 id="map-heading" className="text-title text-chalk">
            Find the campus
          </h2>

          <Reveal delay={0.06} className="mt-7">
            {siteConfig.contact.mapEmbedUrl ? (
              <div className="overflow-hidden rounded-panel border border-ink-700">
                <iframe
                  src={siteConfig.contact.mapEmbedUrl}
                  title={`Map showing the location of ${siteConfig.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-[420px] w-full border-0 grayscale-[0.35]"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-panel border border-dashed border-ink-600 bg-ink-900/40 px-6 py-20 text-center">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink-800 text-slate-muted">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-chalk">Map coming soon</p>
                  <p className="mx-auto mt-1.5 max-w-md text-sm text-mist">
                    Once the campus address is confirmed, paste the Google Maps embed URL into{' '}
                    <code className="text-slate-muted">VITE_MAP_EMBED_URL</code> and the map will appear here.
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

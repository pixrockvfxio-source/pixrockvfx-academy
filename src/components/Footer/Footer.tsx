import { Link } from 'react-router-dom';
import { Instagram, Youtube, Linkedin, Facebook, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { courses } from '@/data/courses';
import { siteConfig, formattedAddress, mailtoLink, telLink, whatsappLink } from '@/config/site';

const socialIcons: Record<string, LucideIcon> = {
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  facebook: Facebook,
};

const quickLinks = [
  { label: 'About the academy', to: '/about' },
  { label: 'All courses', to: '/courses' },
  { label: 'Student work', to: '/student-work' },
  { label: 'Careers & outcomes', to: '/careers' },
  { label: 'Admissions & enquiry', to: '/enquiry' },
  { label: 'Contact us', to: '/contact' },
];

export function Footer() {
  const address = formattedAddress();
  const whatsapp = whatsappLink();
  const tel = telLink();
  const mail = mailtoLink();
  const activeSocials = siteConfig.socials.filter((social) => social.href);

  return (
    <footer className="relative mt-auto border-t border-ink-800 bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ember-500/50 to-transparent"
      />

      <div className="container-page py-14 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-sm/relaxed text-mist">
              Industry-focused visual effects training. Real plates, production workflows and mentor-led reviews —
              built to get your work to a standard a studio will hire.
            </p>

            {activeSocials.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {activeSocials.map((social) => {
                  const Icon = socialIcons[social.icon] ?? Instagram;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href as string}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${siteConfig.shortName} on ${social.label}`}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-ink-700 text-mist transition-colors hover:border-ember-500/50 hover:bg-ember-500/10 hover:text-ember-300"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-6 text-xs text-slate-muted">
                Social profiles will be listed here once they are confirmed.
              </p>
            )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-chalk">Quick links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-mist transition-colors hover:text-ember-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Courses */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-chalk">Courses</h2>
            <ul className="mt-4 space-y-2.5">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    to={`/courses/${course.slug}`}
                    className="text-sm text-mist transition-colors hover:text-ember-300"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-chalk">Get in touch</h2>
            <ul className="mt-4 space-y-3.5 text-sm text-mist">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember-400" />
                {address.length > 0 ? (
                  <address className="not-italic">
                    {address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : (
                  <span className="text-slate-muted">Campus address to be announced.</span>
                )}
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember-400" />
                {tel ? (
                  <a href={tel} className="transition-colors hover:text-ember-300">
                    {siteConfig.contact.phone}
                  </a>
                ) : (
                  <span className="text-slate-muted">Phone number coming soon.</span>
                )}
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember-400" />
                {mail ? (
                  <a href={mail} className="break-all transition-colors hover:text-ember-300">
                    {siteConfig.contact.email}
                  </a>
                ) : (
                  <span className="text-slate-muted">Email address coming soon.</span>
                )}
              </li>
              {whatsapp ? (
                <li className="flex gap-3">
                  <MessageCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ember-400" />
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-ember-300"
                  >
                    Chat with us on WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
            <p className="mt-4 text-xs text-slate-muted">{siteConfig.contact.officeHours}</p>
          </div>
        </div>

        <div className="hairline mt-12 flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-muted">
            <li>
              <Link to="/privacy-policy" className="transition-colors hover:text-mist">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-mist">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

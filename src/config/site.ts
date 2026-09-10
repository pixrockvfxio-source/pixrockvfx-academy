/**
 * Central site configuration.
 *
 * Every externally-visible detail (phone, email, address, social handles,
 * WhatsApp number, analytics ids) lives here so it can be changed in one place
 * — or supplied per-environment through Vite env vars — without touching UI
 * code. Values marked `null` are deliberate placeholders: nothing is invented.
 *
 * Only ever put PUBLIC values in `VITE_*` variables. Anything secret (SMTP
 * passwords, CRM tokens, database credentials) must stay on a server.
 */

const env = import.meta.env;

/** Returns the env value when it is a non-empty string, otherwise `fallback`. */
function fromEnv(value: unknown, fallback: string | null = null): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

export type SocialLink = {
  label: string;
  href: string | null;
  icon: 'instagram' | 'youtube' | 'linkedin' | 'facebook' | 'artstation';
};

export const siteConfig = {
  name: 'PixRock Academy',
  shortName: 'PixRock',
  tagline: 'VFX training inside a working production studio.',
  description:
    'PixRock Academy is the training arm of PixRock, a TPN Gold+ certified VFX studio in Coimbatore. Industry-focused courses in roto, prep, compositing, matchmove and real-time, taught by working artists. First intake April 2027.',

  /** Absolute origin, used to build canonical URLs and structured data. */
  url: fromEnv(env.VITE_SITE_URL, 'https://www.pixrockvfx.com') as string,

  contact: {
    /** e.g. "+91 90000 00000" — leave null until confirmed. */
    phone: fromEnv(env.VITE_CONTACT_PHONE),
    email: fromEnv(env.VITE_CONTACT_EMAIL),
    /** Digits only, with country code, e.g. "919000000000". */
    whatsapp: fromEnv(env.VITE_WHATSAPP_NUMBER),
    address: {
      line1: fromEnv(env.VITE_ADDRESS_LINE1),
      line2: fromEnv(env.VITE_ADDRESS_LINE2),
      city: fromEnv(env.VITE_ADDRESS_CITY),
      state: fromEnv(env.VITE_ADDRESS_STATE),
      postalCode: fromEnv(env.VITE_ADDRESS_POSTCODE),
      country: fromEnv(env.VITE_ADDRESS_COUNTRY, 'India'),
    },
    /** Published city — safe to state without the full street address. */
    city: 'Coimbatore, Tamil Nadu',
    /** Google Maps embed URL (Share → Embed a map → copy the src attribute). */
    mapEmbedUrl: fromEnv(env.VITE_MAP_EMBED_URL),
    officeHours: 'Monday – Saturday, 10:00 – 19:00',
    /** Class timings, from the brochure. Two shifts share the same lab. */
    batchTimings: 'Morning 9:00 am – 12:00 pm · Evening 6:00 pm – 9:00 pm',
  },

  /**
   * Endpoint that receives enquiry submissions.
   *
   * Defaults to the PHP handler deployed alongside index.html (see
   * `server/enquiry.php`), which stores each enquiry in MySQL and emails a
   * notification. Same-origin, so no CORS and no key in the browser.
   *
   * In local development there is no PHP server, so the form falls back to
   * preview mode: it validates and confirms without transmitting anything.
   * Set VITE_ENQUIRY_ENDPOINT to override either behaviour.
   */
  enquiryEndpoint: fromEnv(env.VITE_ENQUIRY_ENDPOINT, env.DEV ? null : '/enquiry.php'),

  socials: [
    { label: 'Instagram', href: fromEnv(env.VITE_SOCIAL_INSTAGRAM), icon: 'instagram' },
    { label: 'YouTube', href: fromEnv(env.VITE_SOCIAL_YOUTUBE), icon: 'youtube' },
    { label: 'LinkedIn', href: fromEnv(env.VITE_SOCIAL_LINKEDIN), icon: 'linkedin' },
    { label: 'Facebook', href: fromEnv(env.VITE_SOCIAL_FACEBOOK), icon: 'facebook' },
  ] satisfies SocialLink[],
} as const;

/** Pretty, multi-line address — omits any part that has not been configured. */
export function formattedAddress(): string[] {
  const a = siteConfig.contact.address;

  // The country carries a default, so on its own it is not an address. Without
  // a street line or a city the UI should show its "coming soon" state rather
  // than a lone country name.
  if (!a.line1 && !a.city) return [];

  const cityLine = [a.city, a.state, a.postalCode].filter(Boolean).join(', ');
  return [a.line1, a.line2, cityLine, a.country].filter((v): v is string => Boolean(v));
}

/** `wa.me` deep link, or null when no number has been configured yet. */
export function whatsappLink(message = "Hi PixRock Academy, I'd like to know more about your VFX courses."): string | null {
  const number = siteConfig.contact.whatsapp?.replace(/\D/g, '');
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telLink(): string | null {
  const phone = siteConfig.contact.phone?.replace(/[^\d+]/g, '');
  return phone ? `tel:${phone}` : null;
}

export function mailtoLink(subject = 'Course enquiry'): string | null {
  return siteConfig.contact.email
    ? `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`
    : null;
}

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
  name: 'PixRock VFX Academy',
  shortName: 'PixRock',
  tagline: 'Learn VFX. Create Worlds. Build Your Career.',
  description:
    'PixRock VFX Academy trains artists for the visual effects industry with production-style workflows, mentor-led reviews and a portfolio built on real project briefs.',

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
    /** Google Maps embed URL (Share → Embed a map → copy the src attribute). */
    mapEmbedUrl: fromEnv(env.VITE_MAP_EMBED_URL),
    officeHours: 'Monday – Saturday, 10:00 – 19:00',
  },

  /**
   * Endpoint that receives enquiry submissions. Point this at your own server
   * route or form service. When unset the form runs in "preview" mode: it
   * validates and confirms locally without transmitting anything.
   */
  enquiryEndpoint: fromEnv(env.VITE_ENQUIRY_ENDPOINT),

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
export function whatsappLink(message = "Hi PixRock, I'd like to know more about your VFX courses."): string | null {
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

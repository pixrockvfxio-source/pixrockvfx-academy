import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

type Props = {
  title: string;
  description: string;
  /** Path only, e.g. "/courses/compositing". */
  path: string;
  /** Absolute or root-relative image used for social previews. */
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  /** Optional schema.org payload rendered as JSON-LD. */
  jsonLd?: Record<string, unknown>;
};

/**
 * Per-page document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
 * <head>, so no helmet dependency is needed. index.html still carries sensible
 * defaults for the first paint and for crawlers that do not execute scripts.
 */
export function Seo({ title, description, path, image, type = 'website', noIndex = false, jsonLd }: Props) {
  // index.html ships default metadata so the first paint and non-JS crawlers
  // are not empty. Once React has mounted, those defaults would sit alongside
  // the per-page tags below — two <title> elements, two canonicals — so they
  // are removed here. Idempotent: re-running on a later page is a no-op.
  useEffect(() => {
    document.head.querySelectorAll('[data-default-meta]').forEach((node) => node.remove());
  }, []);

  const url = `${siteConfig.url.replace(/\/$/, '')}${path === '/' ? '/' : path}`;
  const fullTitle = path === '/' ? title : `${title} | ${siteConfig.name}`;
  const socialImage = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url.replace(/\/$/, '')}${image}`
    : `${siteConfig.url.replace(/\/$/, '')}/favicon.svg`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={socialImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </>
  );
}

/** Organisation schema reused on the home and contact pages. */
export function organisationJsonLd() {
  const { contact } = siteConfig;
  const address = contact.address;

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(address.city
      ? {
          address: {
            '@type': 'PostalAddress',
            ...(address.line1 ? { streetAddress: [address.line1, address.line2].filter(Boolean).join(', ') } : {}),
            addressLocality: address.city,
            ...(address.state ? { addressRegion: address.state } : {}),
            ...(address.postalCode ? { postalCode: address.postalCode } : {}),
            ...(address.country ? { addressCountry: address.country } : {}),
          },
        }
      : {}),
    sameAs: siteConfig.socials.map((social) => social.href).filter(Boolean),
  };
}

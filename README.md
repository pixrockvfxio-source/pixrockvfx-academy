# PixRock VFX Academy — Website

A production-ready React single-page application for **PixRock VFX Academy**, built with Vite,
TypeScript, Tailwind CSS v4 and Framer Motion, and configured for deployment on **Hostinger**
shared hosting.

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # local dev server on http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

`npm run build` runs three steps: it regenerates `public/sitemap.xml` from the course catalogue,
type-checks the project, then produces the optimised `dist/` folder.

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run typecheck` | TypeScript check only, no build |
| `npm run sitemap` | Regenerate `public/sitemap.xml` |

---

## Deploying to Hostinger

1. **Set your production values.** Copy `.env.example` to `.env.production` and fill in the
   confirmed phone number, email, address, WhatsApp number, map URL and social links.
   At minimum set `VITE_SITE_URL` to the live domain — canonical URLs, Open Graph tags and the
   sitemap are all built from it.

2. **Build.**

   ```bash
   npm install
   npm run build
   ```

3. **Upload.** In hPanel open **File Manager → `public_html`** and upload **the contents of
   `dist/`** — not the `dist` folder itself. The result should look like:

   ```
   public_html/
     index.html
     .htaccess
     favicon.svg
     robots.txt
     sitemap.xml
     site.webmanifest
     assets/…
   ```

4. **Confirm `.htaccess` uploaded.** It is a dotfile, so enable *Show hidden files* in File
   Manager. Without it, refreshing a deep link such as `/courses/compositing` returns Apache's
   own 404 instead of the app. `.htaccess` is included in `public/` and is copied into `dist/`
   automatically by the build.

5. **Enable SSL** in hPanel. The `.htaccess` already redirects HTTP to HTTPS; if you deploy
   before the certificate is issued, comment out the *Force HTTPS* block until it is active.

### What `.htaccess` handles

- SPA routing — any unknown path is served `index.html` so React Router can resolve it
- HTTPS redirect
- Gzip / Brotli compression
- Long-lived immutable caching for fingerprinted `assets/`, no-cache for `index.html`
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`)
- Blocking dotfiles, source maps and directory listings

### Deploying into a subfolder

If the site will live at `https://example.com/academy/` rather than a domain root, set
`base: '/academy/'` in `vite.config.ts` and `RewriteBase /academy/` in `public/.htaccess`
before building.

---

## Configuration — where to change things

Everything a non-developer is likely to change lives in `src/config/` and `src/data/`.
No copy, contact detail or course fact is hard-coded inside a component.

| I want to change… | Edit |
| --- | --- |
| Phone, email, address, WhatsApp, socials, map | `.env` / `.env.production` (see `.env.example`) — falls back to `src/config/site.ts` |
| Courses, modules, fees-free facts, FAQs | `src/data/courses.ts` |
| Student projects & showreel videos | `src/data/projects.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Software list and how it is labelled | `src/data/tools.ts` |
| Why-us features, learning journey, story, admissions steps | `src/data/academy.ts` |
| Images and artwork | `src/config/media.ts` |
| Colours, fonts, spacing, radius, shadows | `src/styles/index.css` (`@theme` block) |

### Adding a course

Append one object to the `courses` array in `src/data/courses.ts`. The card, the filter, the
detail page at `/courses/<slug>`, the enquiry form's dropdown, the footer list and the sitemap
all pick it up automatically — no component or route changes needed.

Optionally add a banner for it in `media.courses` in `src/config/media.ts`, keyed by the same
slug. Without one it renders generated placeholder artwork.

### Replacing the placeholder imagery

The site currently ships **no stock photography**. Every visual is either the brand mark or
original artwork generated from a seed (`src/components/ui/PlaceholderArt.tsx`) — deterministic,
licence-free, and requiring no network request.

To use real photography, drop the file into `public/media/` and set `src` on the entry in
`src/config/media.ts`:

```ts
heroPrimary: {
  ...ref('pixrock-hero-01', 'Compositing artist at a studio workstation'),
  src: '/media/hero-studio.webp',
  srcModern: '/media/hero-studio.avif', // optional AVIF, served first
  width: 1920,
  height: 1080,
},
```

Guidelines: WebP or AVIF, 16:9 for wide banners, 4:5 for portraits, and always keep
`width`/`height` accurate so the layout does not shift while loading. If a real image ever
fails to load, the component falls back to the generated artwork rather than showing a broken
image.

---

## The enquiry form and security

`EnquiryForm` never holds a credential. It POSTs JSON to `VITE_ENQUIRY_ENDPOINT`:

```json
{
  "name": "…", "phone": "…", "email": "…", "course": "compositing",
  "qualification": "…", "city": "…", "preferredContact": "phone",
  "message": "…", "submittedAt": "2026-01-01T00:00:00.000Z"
}
```

That endpoint must be a server route or form service **you control** — a small PHP script in
`public_html`, a serverless function, or a hosted form provider. SMTP passwords, CRM tokens and
any other secret live there, never in this repository and never in a `VITE_*` variable
(those are compiled into the public bundle and readable by anyone).

If `VITE_ENQUIRY_ENDPOINT` is unset the form runs in **preview mode**: it validates, shows the
success state and transmits nothing — so the site can go live before the backend exists.

Built-in protections: client-side validation with per-field errors, a honeypot field, an
explicit consent checkbox, and network-failure handling that offers a mailto fallback.

---

## Architecture

```
src/
├── components/
│   ├── ui/              Button, Media, PlaceholderArt, Badge, Accordion,
│   │                    FormField, PageHero, Reveal, EmptyState, Logo
│   ├── sections/        Composed home-page sections
│   ├── Navbar/ Footer/ Hero/ CourseCard/ CourseGrid/
│   ├── TestimonialCard/ ProjectCard/ CTASection/ ContactForm/
│   ├── SectionTitle/ Seo/ common/
├── pages/               One folder per route, default-exported for lazy loading
├── layouts/             RootLayout — nav, main landmark, footer, utilities
├── routes/              AppRoutes — the route table
├── data/                Content: courses, projects, testimonials, tools, academy
├── config/              site.ts (contact/env), media.ts (image registry)
├── lib/                 cn, hash, validation
├── types/               Shared content models
└── styles/index.css     Design tokens + base layer + component classes
```

**Content is separated from presentation.** Components take typed data as props; nothing
duplicates a course fact or a phone number. This is what makes a future admin panel or CMS a
drop-in change: replace the imports in `src/data/*` with fetched data of the same shape and the
UI needs no edits.

### Design system

Tokens are declared once in the `@theme` block of `src/styles/index.css` and consumed as
Tailwind utilities everywhere:

- **Colour** — a deep neutral `ink` scale under a cinematic "orange & teal" grade
  (`ember` warm accent, `signal` cool accent). No component invents its own colour.
- **Type** — Sora for display, Inter for body, with fluid `text-hero` / `text-display` /
  `text-title` steps that scale with the viewport.
- **Radius, shadow, easing** — `--radius-card`, `--radius-panel`, `--shadow-soft`,
  `--shadow-lift`, `--shadow-glow`, `--ease-out-soft`.

Changing the palette or the fonts is a single-file edit.

---

## Accessibility

- Semantic landmarks, one `<h1>` per page, ordered heading levels
- Skip-to-content link, visible focus ring on every interactive element
- Full keyboard support: menu closes on `Escape`, the project dialog traps and restores focus
- `aria-expanded` / `aria-controls` on the accordion and mobile menu, `aria-pressed` on filters
- Labelled form fields with `aria-invalid`, `aria-describedby` and inline error text
- Alt text on every image; decorative artwork marked `aria-hidden`
- `prefers-reduced-motion` honoured globally in CSS **and** in every Framer Motion component

## Performance

- Route-level code splitting; only the home page ships in the initial bundle
- Framework, animation and app code split into separate long-lived cache chunks
- Lazy loading and `async` decoding on all imagery, `fetchPriority="high"` on the hero
- Explicit `width`/`height` on images to prevent layout shift
- Fonts preconnected and loaded non-render-blocking with a `<noscript>` fallback
- No icon-font, no CSS framework runtime, no carousel library — the testimonial slider is
  native scroll-snap

## SEO

- Per-page `<title>`, meta description, canonical URL and Open Graph / Twitter tags via the
  `Seo` component (React 19 hoists document metadata natively — no helmet dependency)
- JSON-LD: `EducationalOrganization` on home and contact, `ItemList` on courses,
  `Course` on each detail page
- Clean, human-readable URLs: `/courses/compositing`
- `robots.txt` and a `sitemap.xml` regenerated from the course catalogue on every build

> **Note:** this is a client-rendered SPA. Google renders JavaScript, but if you need
> guaranteed crawlability for every crawler, add a prerender step (e.g. `vite-plugin-prerender`)
> — the `Seo` component's output is already structured for it.

---

## Known placeholders

These are deliberately unfinished pending real content, and each degrades honestly in the UI
rather than showing invented information:

- **Contact details** — phone, email, address, WhatsApp and map are blank until set via env
  vars; the UI shows "coming soon" notes instead of fake data
- **Testimonials** (`src/data/testimonials.ts`) — illustrative text under placeholder names;
  replace with real, consented quotes before launch
- **Student projects** (`src/data/projects.ts`) — placeholder titles and artist names; add
  `videoUrl` to any entry to enable the showreel player (YouTube, Vimeo or a direct file)
- **Showreel** — the Student Work page states the reel is being cut rather than embedding a
  filler video
- **Social links** — hidden entirely until URLs are configured
- **Legal pages** — Privacy Policy and Terms are starting templates, clearly marked as such,
  and must be reviewed by a legal adviser before launch
- **Open Graph image** — currently points at `favicon.svg`. Most social platforms will not
  render SVG previews; export a 1200×630 PNG or JPG to `public/og-cover.jpg` and update the
  `og:image` tag in `index.html` and the `image` default in `src/components/Seo/Seo.tsx`
- **Imagery** — generated placeholder artwork throughout; see *Replacing the placeholder
  imagery* above

## Future admin panel

The data layer is already shaped for one. Each content type in `src/data/` has a typed model in
`src/types/content.ts`, and no component reaches outside its props for content. To connect a
backend, replace the static exports with an API call returning the same shapes — courses,
modules, projects, testimonials, tools and enquiries are all independently addressable.

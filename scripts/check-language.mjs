/**
 * Fails the build if forbidden language reaches the site.
 *
 * The Parent Brochure Copy (v1.0, §8 "Words we never print") states that its
 * banned-phrase list "applies to the brochure, the website, social media,
 * WhatsApp messages and counsellor scripts equally". Careful writing is not a
 * control — a future edit, a new course or a pasted paragraph can reintroduce
 * a phrase that carries legal and reputational risk.
 *
 * So the rule is enforced here instead, on every build. Anything on this list
 * stops the build with the file and line that introduced it.
 *
 * Run automatically by `npm run build`; standalone via `npm run check:language`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, extname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const SCAN_DIRS = ['src'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.html', '.md', '.css']);

/**
 * Each rule: a regex, why it is banned, and what to say instead.
 * Keep this list in sync with the brochure. Do not remove an entry without
 * the same sign-off that would be needed to change the brochure.
 */
const RULES = [
  {
    pattern: /placement\s+guarantee|guaranteed\s+placement/i,
    reason: 'Implies a guaranteed job.',
    instead: '"placement assistance"',
  },
  {
    pattern: /100\s*%\s*placement|assured\s+(job|placement)|job\s+guarantee/i,
    reason: 'Implies a guaranteed job.',
    instead: '"placement assistance"',
  },
  {
    pattern: /guaranteed\s+salary|guarantee[ds]?\s+(a\s+)?(job|career|employment)/i,
    reason: 'Guarantees an outcome the academy cannot control.',
    instead: '"placement assistance", and describe what it actually includes',
  },
  {
    pattern: /(industry'?s\s+best|no\.?\s*1\s+institute|number\s+one\s+institute|best\s+vfx\s+institute)/i,
    reason: 'Unverifiable superlative.',
    instead: 'a specific, verifiable fact about the studio',
  },
  {
    pattern: /government\s+(approved|recognised|recognized|certified)/i,
    reason: 'Only permitted if empanelment is actually in place.',
    instead: '"TPN Gold+ certified studio"',
  },
  {
    pattern: /\b(degree|diploma)\s+equivalent|equivalent\s+to\s+a\s+degree|university\s+equivalent/i,
    reason: 'Implies degree equivalence.',
    instead: '"professional training programme"',
  },
  {
    pattern: /\b(?:100|[1-9][0-9])\s*%\s*(?:of\s+)?(?:our\s+)?(?:students|graduates)\s+(?:are\s+)?(?:placed|hired|employed)/i,
    reason: 'Claims a placement record. The academy has no graduates yet.',
    instead: 'the founding-batch framing: no graduate record yet, stated plainly',
  },
  {
    // Fees are a counselling conversation, not website copy. This also stops a
    // figure reaching the JavaScript bundle, where it would be readable even
    // if no component rendered it.
    pattern: /₹\s?[\d,]{3,}|\bRs\.?\s?[\d,]{3,}|\bINR\s?[\d,]{3,}/i,
    reason: 'A rupee amount. Fees are not published on this site.',
    instead: 'a prompt to speak to a counsellor about the full cost',
  },
];

/**
 * Salary figures and EMI amounts are marked [VERIFY] in the source documents
 * and must not be published until substantiated. These patterns are advisory:
 * they warn rather than fail, because a legitimate use may appear later.
 */
const WARN_RULES = [
  {
    pattern: /₹\s?[\d,]+\s*(?:\/\s*month|per\s+month|monthly)/i,
    reason: 'Looks like an EMI or salary figure. The NBFC tie-up is not signed and salary bands are unverified.',
  },
  {
    pattern: /\bEMI\b/i,
    reason: 'EMI terms must not be published until the finance partner agreement is signed.',
  },
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (SCAN_EXT.has(extname(full))) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(root, d))).concat(join(root, 'index.html'));

const failures = [];
const warnings = [];

for (const file of files) {
  const rel = relative(root, file);
  if (rel.includes('check-language')) continue;
  const lines = readFileSync(file, 'utf8').split('\n');

  lines.forEach((line, i) => {
    // An explicit, justified opt-out: `language-ok: <why>` on the same line.
    // Used where a banned phrase must appear in order to be forbidden.
    if (/language-ok/.test(line)) return;

    // Denials are not claims. "We do not guarantee employment" is required
    // legal wording; "placement guarantee" on its own is not. Look for a
    // negation governing the match rather than treating both the same.
    const denies =
      /\b(?:no|not|never|nor|without|cannot|can't|don't|doesn't)\b/i.test(line) ||
      /\b(?:do|does|will|can)\s+not\b/i.test(line);

    for (const rule of RULES) {
      // Denial only excuses guarantee-style claims. A published fee is banned
      // outright, so it ignores the negation check.
      const excusable = !/₹/.test(String(rule.pattern));
      if (rule.pattern.test(line) && !(denies && excusable)) {
        failures.push({ rel, line: i + 1, text: line.trim(), rule });
      }
    }
    for (const rule of WARN_RULES) {
      if (rule.pattern.test(line)) warnings.push({ rel, line: i + 1, text: line.trim(), rule });
    }
  });
}

for (const w of warnings) {
  console.warn(`[language] warn  ${w.rel}:${w.line}\n           ${w.rule.reason}\n           ${w.text.slice(0, 120)}`);
}

if (failures.length > 0) {
  console.error('\n[language] BUILD BLOCKED — forbidden wording found\n');
  for (const f of failures) {
    console.error(`  ${f.rel}:${f.line}`);
    console.error(`    ${f.text.slice(0, 140)}`);
    console.error(`    ${f.rule.reason} Use ${f.rule.instead}.\n`);
  }
  console.error(`${failures.length} violation(s). See scripts/check-language.mjs.\n`);
  process.exit(1);
}

console.log(`[language] ${files.length} files scanned — no forbidden wording${warnings.length ? `, ${warnings.length} warning(s)` : ''}`);

import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, PhoneCall, Send, TriangleAlert, MessageCircle } from 'lucide-react';
import { TextField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { getCourseBySlug } from '@/data/courses';
import { siteConfig, mailtoLink, whatsappLink } from '@/config/site';
import {
  initialRegistration,
  validateRegistration,
  hasErrors,
  type RegistrationErrors,
  type RegistrationValues,
} from '@/lib/validation';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  /** Course slug of the page this form sits on. Sent as context, never asked for. */
  courseSlug?: string;
  className?: string;
  title?: string;
  description?: string;
};

/**
 * Registration form.
 *
 * Two fields, by design. Every additional input costs completions, and the
 * funnel does not need more: the team calls each registration, moves the
 * conversation to WhatsApp, and collects everything else there.
 *
 * Security note: this component never holds a credential. It POSTs JSON to
 * `VITE_ENQUIRY_ENDPOINT` — a server route you control, where the database and
 * mail credentials live. With no endpoint configured it runs in preview mode:
 * it validates and confirms locally and transmits nothing.
 */
export function RegisterForm({
  courseSlug,
  className,
  title = 'Register your interest',
  description = 'Two details is all we need. A counsellor will call you, and we will take it from there.',
}: Props) {
  const formId = useId();
  const [values, setValues] = useState<RegistrationValues>(initialRegistration);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const firstErrorRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${formId}-${name}`;
  const course = getCourseBySlug(courseSlug);
  const whatsapp = whatsappLink(
    course
      ? `Hi PixRock Academy, I just registered for ${course.title}.`
      : 'Hi PixRock Academy, I just registered on your website.',
  );

  function update<K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the error as soon as the visitor starts fixing the field.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Silently accept and discard bot submissions that fill the honeypot.
    if (values.website.trim()) {
      setStatus('success');
      return;
    }

    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      setStatus('idle');
      requestAnimationFrame(() => firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    if (!siteConfig.enquiryEndpoint) {
      // Preview mode — nothing leaves the browser.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(siteConfig.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email: values.email.trim(),
          phone: values.phone.trim(),
          // Page context, captured rather than asked for.
          course: course?.slug ?? '',
          courseLabel: course?.title ?? '',
          sourcePath: typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '',
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        // The server validates independently. Show its field errors rather
        // than a generic failure, so the visitor can actually fix the problem.
        const payload = await response.json().catch(() => null);
        if (response.status === 422 && payload?.fields) {
          setErrors(payload.fields as RegistrationErrors);
          setStatus('idle');
          requestAnimationFrame(() => firstErrorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
          return;
        }
        throw new Error(payload?.error ?? `Request failed with status ${response.status}`);
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setServerMessage(
        error instanceof Error && error.message && !/failed to fetch/i.test(error.message)
          ? error.message
          : 'We could not complete your registration just now. Please check your connection and try again, or reach us directly.',
      );
    }
  }

  /* ---------------------------------------------------------------- success */
  if (status === 'success') {
    return (
      <div
        className={cn('rounded-panel border border-signal-500/30 bg-signal-50 p-8 text-center sm:p-12', className)}
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-surface text-signal-600 shadow-soft">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>

        <h3 className="mt-5 text-title text-ink">You&rsquo;re registered</h3>
        <p className="mx-auto mt-3 max-w-md text-sm/relaxed text-body sm:text-base/relaxed">
          We&rsquo;ve sent a confirmation to <span className="font-medium text-ink">{values.email.trim()}</span>. A
          counsellor will call you on{' '}
          <span className="font-medium text-ink">{values.phone.trim()}</span> within one working day.
        </p>

        {/* Step 3 of the funnel: move the conversation to WhatsApp. */}
        {whatsapp ? (
          <div className="mt-7">
            <Button href={whatsapp} size="lg">
              <MessageCircle aria-hidden="true" className="size-4" />
              Continue on WhatsApp
            </Button>
            <p className="mt-3 text-xs text-subtle">
              Prefer to message? Start the conversation now and skip the wait.
            </p>
          </div>
        ) : null}

        {!siteConfig.enquiryEndpoint ? (
          <p className="mx-auto mt-6 max-w-md rounded-xl border border-line bg-surface px-4 py-3 text-xs text-subtle">
            This is a preview of the form, so nothing was sent. Please contact the academy directly and we will pick
            things up from there.
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button variant="ghost" to="/courses">
            Browse the courses
          </Button>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------ form */
  const submitting = status === 'submitting';

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn('relative rounded-panel border border-line bg-surface p-6 shadow-soft sm:p-8', className)}
      aria-labelledby={`${formId}-title`}
    >
      <h2 id={`${formId}-title`} className="font-display text-xl font-bold text-ink sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm/relaxed text-body">{description}</p>

      {course ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-ember-600/25 bg-ember-50 px-3.5 py-1.5 text-xs font-medium text-ember-700">
          Registering for {course.title}
        </p>
      ) : null}

      <div ref={firstErrorRef} className="mt-7 grid gap-5">
        <TextField
          id={fieldId('email')}
          label="Email address"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(event) => update('email', event.target.value)}
        />
        <TextField
          id={fieldId('phone')}
          label="Contact number"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="Including country code"
          value={values.phone}
          error={errors.phone}
          onChange={(event) => update('phone', event.target.value)}
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={fieldId('website')}>Leave this field empty</label>
        <input
          id={fieldId('website')}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-body">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update('consent', event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 rounded border-line-strong accent-ember-600"
          />
          <span>
            I agree to be contacted by {siteConfig.name} by phone, WhatsApp and email about this registration.
            <span className="ml-1 text-ember-700" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} className="mt-1.5 text-xs text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3.5 text-sm text-red-800"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            {serverMessage}
            {mailtoLink('Course registration') ? (
              <>
                {' '}
                <a href={mailtoLink('Course registration') as string} className="underline underline-offset-2">
                  Email us instead
                </a>
                .
              </>
            ) : null}
          </span>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting} fullWidth className="sm:w-auto">
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Registering…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4" />
              Register Now
            </>
          )}
        </Button>
        <p className="flex items-center gap-1.5 text-xs text-subtle">
          <PhoneCall aria-hidden="true" className="size-3.5" />
          We call every registration within one working day.
        </p>
      </div>

      <p aria-live="polite" className="sr-only">
        {submitting ? 'Submitting your registration' : ''}
      </p>
    </form>
  );
}

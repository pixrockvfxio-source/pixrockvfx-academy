import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react';
import { TextField, SelectField, TextAreaField, RadioGroup } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { courseOptions } from '@/data/courses';
import { siteConfig, mailtoLink } from '@/config/site';
import {
  initialEnquiry,
  validateEnquiry,
  hasErrors,
  type EnquiryErrors,
  type EnquiryValues,
} from '@/lib/validation';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  /** Pre-selects a course, e.g. when opened from a course detail page. */
  defaultCourse?: string;
  className?: string;
  title?: string;
};

const contactMethods = [
  { value: 'phone', label: 'Phone call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
];

/**
 * Admissions enquiry form.
 *
 * Security note: this component never holds a credential. It POSTs JSON to
 * `VITE_ENQUIRY_ENDPOINT` — a server route or form service that you control,
 * where the mail credentials or CRM token live. If no endpoint is configured
 * the form runs in preview mode: it validates and confirms locally, and
 * transmits nothing, so the site can be deployed before the backend exists.
 */
export function EnquiryForm({ defaultCourse, className, title = 'Enquire about a programme' }: Props) {
  const formId = useId();
  const [values, setValues] = useState<EnquiryValues>({
    ...initialEnquiry,
    course: defaultCourse ?? '',
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const firstErrorRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: string) => `${formId}-${name}`;

  function update<K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) {
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

    const nextErrors = validateEnquiry(values);
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
      await new Promise((resolve) => setTimeout(resolve, 650));
      setStatus('success');
      return;
    }

    try {
      const response = await fetch(siteConfig.enquiryEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          course: values.course,
          qualification: values.qualification.trim(),
          city: values.city.trim(),
          preferredContact: values.preferredContact,
          message: values.message.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
      setServerMessage(
        'We could not send your enquiry just now. Please check your connection and try again, or reach us directly.',
      );
    }
  }

  if (status === 'success') {
    return (
      <div
        className={cn('rounded-panel border border-signal-500/30 bg-signal-500/5 p-8 text-center sm:p-12', className)}
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-signal-500/15 text-signal-300">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h3 className="mt-5 text-title text-chalk">Enquiry received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm/relaxed text-mist sm:text-base/relaxed">
          Thank you, {values.name.trim().split(' ')[0] || 'and welcome'}. A counsellor will get back to you within one
          working day to talk through the programme, batch timings and next steps.
        </p>
        {!siteConfig.enquiryEndpoint ? (
          <p className="mx-auto mt-5 max-w-md rounded-xl border border-ink-700 bg-ink-900/70 px-4 py-3 text-xs text-slate-muted">
            Preview mode: no enquiry endpoint is configured yet, so this submission was validated locally and not
            transmitted. Set <code className="text-mist">VITE_ENQUIRY_ENDPOINT</code> to connect it to your server.
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setValues({ ...initialEnquiry, course: defaultCourse ?? '' });
              setStatus('idle');
            }}
          >
            Submit another enquiry
          </Button>
          <Button variant="ghost" to="/courses">
            Browse courses
          </Button>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn('relative rounded-panel border border-ink-700 bg-ink-900/60 p-6 sm:p-8', className)}
      aria-labelledby={`${formId}-title`}
    >
      <h2 id={`${formId}-title`} className="font-display text-xl font-bold text-chalk sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-sm text-mist">
        Fields marked <span className="text-ember-400">*</span> are required. We use these details only to respond to
        your enquiry.
      </p>

      <div ref={firstErrorRef} className="mt-7 grid gap-5 sm:grid-cols-2">
        <TextField
          id={fieldId('name')}
          label="Student name"
          required
          autoComplete="name"
          placeholder="Your full name"
          value={values.name}
          error={errors.name}
          onChange={(event) => update('name', event.target.value)}
        />
        <TextField
          id={fieldId('phone')}
          label="Phone number"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="Including country code"
          value={values.phone}
          error={errors.phone}
          onChange={(event) => update('phone', event.target.value)}
        />
        <TextField
          id={fieldId('email')}
          label="Email address"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          error={errors.email}
          onChange={(event) => update('email', event.target.value)}
        />
        <SelectField
          id={fieldId('course')}
          label="Course interested in"
          required
          value={values.course}
          error={errors.course}
          onChange={(event) => update('course', event.target.value)}
        >
          <option value="">Select a course…</option>
          {courseOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
        <TextField
          id={fieldId('qualification')}
          label="Highest qualification"
          autoComplete="off"
          placeholder="e.g. 12th standard, Bachelor's degree"
          value={values.qualification}
          error={errors.qualification}
          onChange={(event) => update('qualification', event.target.value)}
        />
        <TextField
          id={fieldId('city')}
          label="City"
          autoComplete="address-level2"
          placeholder="Where are you based?"
          value={values.city}
          error={errors.city}
          onChange={(event) => update('city', event.target.value)}
        />

        <RadioGroup
          className="sm:col-span-2"
          name={fieldId('preferredContact')}
          legend="Preferred contact method"
          value={values.preferredContact}
          options={contactMethods}
          onChange={(value) => update('preferredContact', value as EnquiryValues['preferredContact'])}
        />

        <TextAreaField
          className="sm:col-span-2"
          id={fieldId('message')}
          label="Message"
          rows={4}
          placeholder="Tell us about your background, what you want to learn, or anything you'd like to ask."
          value={values.message}
          error={errors.message}
          hint={`${values.message.length}/1200`}
          onChange={(event) => update('message', event.target.value)}
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
        <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update('consent', event.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            className="mt-0.5 size-4 shrink-0 rounded border-ink-500 bg-ink-900 accent-ember-500"
          />
          <span>
            I agree to be contacted by {siteConfig.name} about this enquiry.
            <span className="ml-1 text-ember-400" aria-hidden="true">
              *
            </span>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} className="mt-1.5 text-xs text-red-400">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {status === 'error' ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/8 px-4 py-3.5 text-sm text-red-200"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <span>
            {serverMessage}
            {mailtoLink('Course enquiry') ? (
              <>
                {' '}
                <a href={mailtoLink('Course enquiry') as string} className="underline underline-offset-2">
                  Email us instead
                </a>
                .
              </>
            ) : null}
          </span>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={submitting} className="sm:w-auto" fullWidth>
          {submitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" className="size-4" />
              Submit Enquiry
            </>
          )}
        </Button>
        <p className="text-xs text-slate-muted">We reply within one working day.</p>
      </div>
      <p aria-live="polite" className="sr-only">
        {submitting ? 'Submitting your enquiry' : ''}
      </p>
    </form>
  );
}

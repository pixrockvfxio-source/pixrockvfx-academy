/**
 * Registration validation.
 *
 * The form deliberately asks for two things only — email and contact number.
 * Every extra field costs completions, and the funnel is designed so the rest
 * of the conversation happens on the phone and then on WhatsApp.
 *
 * The course a visitor registered from is captured from the page itself, not
 * asked for, so it adds context without adding a field.
 */

export type RegistrationValues = {
  email: string;
  phone: string;
  consent: boolean;
  /** Honeypot — must stay empty. Hidden from real people. */
  website: string;
};

export type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const initialRegistration: RegistrationValues = {
  email: '',
  phone: '',
  consent: false,
  website: '',
};

export function validateRegistration(values: RegistrationValues): RegistrationErrors {
  const errors: RegistrationErrors = {};

  const email = values.email.trim();
  if (!email) errors.email = 'We need an email address to confirm your registration.';
  else if (!EMAIL.test(email)) errors.email = 'That email address does not look right.';
  else if (email.length > 190) errors.email = 'That email address is too long.';

  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) errors.phone = 'We call every registration, so we need a number.';
  else if (digits.length < 8 || digits.length > 15) {
    errors.phone = 'Enter a valid contact number including country or area code.';
  }

  if (!values.consent) errors.consent = 'Please confirm we may contact you about this registration.';

  return errors;
}

export function hasErrors(errors: RegistrationErrors): boolean {
  return Object.keys(errors).length > 0;
}

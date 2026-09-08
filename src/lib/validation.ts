/** Field-level validators shared by the enquiry and contact forms. */

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  course: string;
  qualification: string;
  city: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  message: string;
  consent: boolean;
  /** Honeypot — must stay empty. Hidden from real users. */
  website: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const initialEnquiry: EnquiryValues = {
  name: '',
  phone: '',
  email: '',
  course: '',
  qualification: '',
  city: '',
  preferredContact: 'phone',
  message: '',
  consent: false,
  website: '',
};

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = 'Please tell us your name.';
  else if (name.length < 2) errors.name = 'That name looks too short.';
  else if (name.length > 80) errors.name = 'Please keep this under 80 characters.';

  const digits = values.phone.replace(/\D/g, '');
  if (!values.phone.trim()) errors.phone = 'A phone number helps us call you back.';
  else if (digits.length < 8 || digits.length > 15) errors.phone = 'Enter a valid phone number including area code.';

  const email = values.email.trim();
  if (!email) errors.email = 'We need an email address to reply.';
  else if (!EMAIL.test(email)) errors.email = 'That email address does not look right.';

  if (!values.course) errors.course = 'Choose the course you are interested in.';

  if (values.city.trim().length > 60) errors.city = 'Please keep this under 60 characters.';
  if (values.qualification.trim().length > 80) errors.qualification = 'Please keep this under 80 characters.';
  if (values.message.trim().length > 1200) errors.message = 'Please keep your message under 1200 characters.';

  if (!values.consent) errors.consent = 'Please confirm we may contact you about this enquiry.';

  return errors;
}

export function hasErrors(errors: EnquiryErrors): boolean {
  return Object.keys(errors).length > 0;
}

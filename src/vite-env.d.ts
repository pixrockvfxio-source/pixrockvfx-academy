/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  /** 'hash' switches the app to HashRouter for hosts with no rewrite rules. */
  readonly VITE_ROUTER?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_ADDRESS_LINE1?: string;
  readonly VITE_ADDRESS_LINE2?: string;
  readonly VITE_ADDRESS_CITY?: string;
  readonly VITE_ADDRESS_STATE?: string;
  readonly VITE_ADDRESS_POSTCODE?: string;
  readonly VITE_ADDRESS_COUNTRY?: string;
  readonly VITE_MAP_EMBED_URL?: string;
  readonly VITE_ENQUIRY_ENDPOINT?: string;
  readonly VITE_SOCIAL_INSTAGRAM?: string;
  readonly VITE_SOCIAL_YOUTUBE?: string;
  readonly VITE_SOCIAL_LINKEDIN?: string;
  readonly VITE_SOCIAL_FACEBOOK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

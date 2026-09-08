import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/config/site';

/**
 * Floating WhatsApp CTA. Renders nothing until a number is configured via
 * VITE_WHATSAPP_NUMBER, so we never ship a dead or invented link.
 */
export function WhatsAppFab() {
  const href = whatsappLink();
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group fixed right-4 bottom-4 z-40 inline-flex items-center gap-2.5 rounded-full border border-signal-500/40 bg-ink-900/90 py-3 pr-4 pl-3 text-sm font-medium text-chalk shadow-lift backdrop-blur-md transition-all duration-200 hover:border-signal-400 hover:bg-ink-850 sm:right-6 sm:bottom-6"
    >
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-signal-500/15 text-signal-300">
        <MessageCircle aria-hidden="true" className="size-4" />
      </span>
      <span className="hidden sm:inline">Chat with us</span>
      <span className="sr-only sm:hidden">Chat with us on WhatsApp</span>
    </a>
  );
}

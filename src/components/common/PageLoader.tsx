/** Route-level loading state shown while a lazily-loaded page chunk arrives. */
export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6"
    >
      <span className="relative inline-flex size-12 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-ink-700" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-ember-500" />
      </span>
      <p className="text-sm tracking-wide text-slate-muted">Loading…</p>
    </div>
  );
}

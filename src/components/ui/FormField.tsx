import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const controlBase =
  'w-full rounded-xl border bg-ink-900/70 px-4 py-3 text-[0.95rem] text-chalk placeholder:text-slate-muted/70 ' +
  'transition-colors duration-200 outline-none focus:border-ember-500/70 focus:bg-ink-900 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

function stateClasses(invalid?: boolean) {
  return invalid ? 'border-red-500/70' : 'border-ink-600 hover:border-ink-500';
}

type LabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  hint?: string;
};

function FieldLabel({ htmlFor, label, required, hint }: LabelProps) {
  return (
    <span className="mb-2 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="text-sm font-medium text-chalk">
        {label}
        {required ? (
          <span className="ml-1 text-ember-400" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-slate-muted">(optional)</span>
        )}
      </label>
      {hint ? <span className="text-xs text-slate-muted">{hint}</span> : null}
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {message}
    </span>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function TextField({ id, label, error, hint, className, required, ...rest }: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={cn('flex flex-col', className)}>
      <FieldLabel htmlFor={id} label={label} required={required} hint={hint} />
      <input
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlBase, stateClasses(Boolean(error)))}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ id, label, error, hint, className, children, required, ...rest }: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={cn('flex flex-col', className)}>
      <FieldLabel htmlFor={id} label={label} required={required} hint={hint} />
      <select
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlBase, stateClasses(Boolean(error)), 'appearance-none bg-[length:0] pr-10')}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238a93a5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.9rem center',
          backgroundSize: '1.1rem',
        }}
        {...rest}
      >
        {children}
      </select>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type TextAreaFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaField({ id, label, error, hint, className, required, ...rest }: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div className={cn('flex flex-col', className)}>
      <FieldLabel htmlFor={id} label={label} required={required} hint={hint} />
      <textarea
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlBase, stateClasses(Boolean(error)), 'min-h-32 resize-y')}
        {...rest}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

type RadioGroupProps = {
  name: string;
  legend: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
};

export function RadioGroup({ name, legend, value, options, onChange, className }: RadioGroupProps) {
  return (
    <fieldset className={cn('flex flex-col', className)}>
      <legend className="mb-2 text-sm font-medium text-chalk">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const id = `${name}-${option.value}`;
          const selected = value === option.value;
          return (
            <div key={option.value}>
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  'inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-sm transition-colors',
                  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ember-400',
                  selected
                    ? 'border-ember-500/60 bg-ember-500/12 text-ember-200'
                    : 'border-ink-600 text-mist hover:border-ink-500 hover:text-chalk',
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

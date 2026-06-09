import './input.scss';
import { ComponentChildren, h } from 'preact';

export interface InputProps {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: ComponentChildren;
  suffix?: ComponentChildren;
  size?: 'sm' | 'md' | 'lg';
  class?: string;
  wrapClass?: string;
  [key: string]: any;
}

export function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  size = 'md',
  class: className = '',
  wrapClass = '',
  ...rest
}: InputProps) {
  const inputCls = [
    'k-input',
    size !== 'md' ? `k-input-${size}` : '',
    prefix ? 'k-input-has-prefix' : '',
    suffix ? 'k-input-has-suffix' : '',
    error ? 'k-input-error' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div class={['k-input-wrap', wrapClass].filter(Boolean).join(' ')}>
      {label && <label class="k-label">{label}</label>}
      <div class="k-input-field-wrap">
        {prefix && <span class="k-input-prefix">{prefix}</span>}
        <input class={inputCls} {...rest} />
        {suffix && <span class="k-input-suffix">{suffix}</span>}
      </div>
      {error && <span class="k-error-msg">{error}</span>}
      {hint && !error && <span class="k-hint">{hint}</span>}
    </div>
  );
}

export interface TextareaProps {
  label?: string;
  hint?: string;
  error?: string;
  class?: string;
  wrapClass?: string;
  [key: string]: any;
}

export function Textarea({ label, hint, error, class: className = '', wrapClass = '', ...rest }: TextareaProps) {
  return (
    <div class={['k-input-wrap', wrapClass].filter(Boolean).join(' ')}>
      {label && <label class="k-label">{label}</label>}
      <textarea class={['k-input', error ? 'k-input-error' : '', className].filter(Boolean).join(' ')} {...rest} />
      {error && <span class="k-error-msg">{error}</span>}
      {hint && !error && <span class="k-hint">{hint}</span>}
    </div>
  );
}

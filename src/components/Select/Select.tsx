import './select.scss';
import { h } from 'preact';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  class?: string;
  wrapClass?: string;
  [key: string]: any;
}

export function Select({
  label,
  hint,
  error,
  options,
  placeholder,
  class: className = '',
  wrapClass = '',
  ...rest
}: SelectProps) {
  return (
    <div class={['k-input-wrap', wrapClass].filter(Boolean).join(' ')}>
      {label && <label class="k-label">{label}</label>}
      <select class={['k-select', error ? 'k-input-error' : '', className].filter(Boolean).join(' ')} {...rest}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span class="k-error-msg">{error}</span>}
      {hint && !error && <span class="k-hint">{hint}</span>}
    </div>
  );
}

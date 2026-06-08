import './checkbox.scss';
import { type ComponentChildren, h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { generateId } from '../../utils/generateId';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: CheckboxSize;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  class?: string;
}

function CheckIcon({ size }: { size: CheckboxSize }) {
  const s = size === 'sm' ? 9 : size === 'lg' ? 13 : 11;
  return (
    <svg
      aria-hidden="true"
      class="k-checkbox-check"
      width={s}
      height={s}
      viewBox="0 0 10 10"
      fill="none"
      stroke="#fff"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="1.5,5 4,7.5 8.5,2" />
    </svg>
  );
}

function DashIcon({ size }: { size: CheckboxSize }) {
  const s = size === 'sm' ? 9 : size === 'lg' ? 13 : 11;
  return (
    <svg
      aria-hidden="true"
      class="k-checkbox-indeterminate"
      width={s}
      height={s}
      viewBox="0 0 10 10"
      fill="none"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
    >
      <line x1="2" y1="5" x2="8" y2="5" />
    </svg>
  );
}

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  id,
  name,
  value,
  class: className = '',
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uid = id ?? generateId('cb');

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      class={['k-checkbox-wrap', disabled ? 'k-checkbox-wrap--disabled' : '', className].filter(Boolean).join(' ')}
      htmlFor={uid}
    >
      <span class={['k-checkbox', size !== 'md' ? `k-checkbox--${size}` : ''].filter(Boolean).join(' ')}>
        <input
          ref={inputRef}
          type="checkbox"
          id={uid}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e: Event) => onChange?.((e.target as HTMLInputElement).checked)}
          aria-checked={indeterminate ? 'mixed' : checked}
        />
        <span class="k-checkbox-box">
          <CheckIcon size={size} />
          <DashIcon size={size} />
        </span>
      </span>
      {(label || description) && (
        <span class="k-checkbox-label-wrap">
          {label && <span class="k-checkbox-label">{label}</span>}
          {description && <span class="k-checkbox-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  label?: string;
  options: CheckboxGroupOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  size?: CheckboxSize;
  direction?: 'vertical' | 'horizontal';
  class?: string;
  children?: ComponentChildren;
}

export function CheckboxGroup({
  label,
  options,
  value = [],
  onChange,
  size = 'md',
  direction = 'vertical',
  class: className = '',
}: CheckboxGroupProps) {
  function toggle(v: string) {
    onChange?.(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);
  }
  return (
    <div class={className}>
      {label && <div class="k-checkbox-group-label">{label}</div>}
      <div
        class={['k-checkbox-group', direction === 'horizontal' ? 'k-checkbox-group--horizontal' : '']
          .filter(Boolean)
          .join(' ')}
      >
        {options.map(opt => (
          <Checkbox
            key={opt.value}
            checked={value.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            label={opt.label}
            description={opt.description}
            disabled={opt.disabled}
            size={size}
            value={opt.value}
          />
        ))}
      </div>
    </div>
  );
}

import './switch.scss';
import { h } from 'preact';
import { generateId } from '../../utils/generateId';

export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  class?: string;
}

export function Switch({ checked, onChange, label, disabled, id, class: className = '' }: SwitchProps) {
  const uid = id ?? generateId('sw');

  return (
    <label class={['k-switch-wrap', className].filter(Boolean).join(' ')} htmlFor={uid}>
      <span class="k-switch">
        {/* Native input — full overlay, transparent */}
        <input
          type="checkbox"
          id={uid}
          checked={checked}
          disabled={disabled}
          onChange={(e: Event) => onChange?.((e.target as HTMLInputElement).checked)}
          aria-checked={checked}
        />
        {/* Track contains the thumb so overflow:hidden clips correctly */}
        <span class="k-switch-track">
          <span class="k-switch-thumb" />
        </span>
      </span>
      {label && <span class="k-switch-label">{label}</span>}
    </label>
  );
}

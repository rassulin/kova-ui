import './switch.scss';
import { h } from 'preact';
import { useState } from 'preact/hooks';
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
  const [generatedId] = useState(() => generateId('k-switch'));
  const uid = id || generatedId;
  return (
    <label class={['k-switch-wrap', disabled ? 'k-disabled' : '', className].filter(Boolean).join(' ')} for={uid}>
      <span class="k-switch">
        <input
          type="checkbox"
          id={uid}
          checked={checked}
          disabled={disabled}
          onChange={(e: any) => onChange?.(e.currentTarget.checked)}
        />
        <span class="k-switch-track" />
        <span class="k-switch-thumb" />
      </span>
      {label && <span class="k-switch-label">{label}</span>}
    </label>
  );
}

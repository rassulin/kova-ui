import './badge.scss';
import { ComponentChildren, h } from 'preact';

export type BadgeVariant = 'default' | 'accent' | 'cyan' | 'success' | 'warning' | 'danger' | 'pink';

export interface BadgeProps {
  variant?: BadgeVariant;
  dot?: boolean;
  class?: string;
  children?: ComponentChildren;
}

export function Badge({ variant = 'default', dot = false, class: className = '', children }: BadgeProps) {
  return (
    <span class={['k-badge', `k-badge-${variant}`, dot ? 'k-badge-dot' : '', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}

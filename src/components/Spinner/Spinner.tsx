import './spinner.scss';
import { h } from 'preact';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  class?: string;
}

export function Spinner({ size = 'md', class: className = '' }: SpinnerProps) {
  return (
    <span
      class={['k-spinner', `k-spinner-${size}`, className].filter(Boolean).join(' ')}
      role="status"
      aria-label="Loading"
    />
  );
}

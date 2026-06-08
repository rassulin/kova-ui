import './tooltip.scss';
import { h, ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: ComponentChildren;
  class?: string;
}

export function Tooltip({ content, placement = 'top', children, class: className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      class={['k-tooltip-wrap', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span class={`k-tooltip k-tooltip-${placement}`} role="tooltip">
          {content}
        </span>
      )}
    </span>
  );
}

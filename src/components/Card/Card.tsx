import './card.scss';
import { h, ComponentChildren } from 'preact';

export interface CardProps {
  title?: string;
  subtitle?: string;
  glow?: boolean;
  footer?: ComponentChildren;
  class?: string;
  children?: ComponentChildren;
  onClick?: () => void;
}

export function Card({ title, subtitle, glow, footer, class: className = '', children, onClick }: CardProps) {
  return (
    <div
      class={['k-card', glow ? 'k-card-glow' : '', onClick ? 'k-card-clickable' : '', className]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : {}}
    >
      {(title || subtitle) && (
        <div class="k-card-header">
          {title && <div class="k-card-title">{title}</div>}
          {subtitle && <div class="k-card-subtitle">{subtitle}</div>}
        </div>
      )}
      <div class="k-card-body">{children}</div>
      {footer && <div class="k-card-footer">{footer}</div>}
    </div>
  );
}

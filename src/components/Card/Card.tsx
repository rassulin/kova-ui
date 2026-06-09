import './card.scss';
import { ComponentChildren, h } from 'preact';

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
      onKeyDown={
        onClick
          ? (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') onClick();
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
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

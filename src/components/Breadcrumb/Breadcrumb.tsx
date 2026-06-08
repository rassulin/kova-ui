import './breadcrumb.scss';
import { h } from 'preact';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  class?: string;
}

export function Breadcrumb({ items, separator = '/', class: className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" class={['k-breadcrumb', className].filter(Boolean).join(' ')}>
      {items.map((item, i) => (
        <span key={i} class="k-breadcrumb-item">
          {i > 0 && (
            <span class="k-breadcrumb-sep" aria-hidden="true">
              {separator}
            </span>
          )}
          {i === items.length - 1 || !item.href ? (
            <span class={i === items.length - 1 ? 'k-breadcrumb-current' : 'k-breadcrumb-link'}>{item.label}</span>
          ) : (
            <a href={item.href} class="k-breadcrumb-link">
              {item.label}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}

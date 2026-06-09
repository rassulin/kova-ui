import './typography.scss';
import { ComponentChildren, h, JSX } from 'preact';

// ─── Shared types ─────────────────────────────────────────────────────────────

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type DisplaySize = 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type TextColor = 'default' | 'muted' | 'subtle' | 'accent' | 'success' | 'danger' | 'warning';
export type BannerVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

function cls(...parts: (string | undefined | false | null)[]) {
  return parts.filter(Boolean).join(' ');
}

// ─── H1 – H6 ─────────────────────────────────────────────────────────────────

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  weight?: TextWeight;
  color?: TextColor;
  class?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
  id?: string;
}

function Heading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return function HeadingEl({ as, weight, color, class: className = '', children, ...rest }: HeadingProps) {
    const Tag = (as ?? `h${level}`) as any;
    return (
      <Tag
        class={cls(
          `k-h${level}`,
          weight && `k-text-${weight}`,
          color && color !== 'default' && `k-text-${color}`,
          className,
        )}
        {...rest}
      >
        {children}
      </Tag>
    );
  };
}

// ─── Display ──────────────────────────────────────────────────────────────────

export interface DisplayProps {
  size?: DisplaySize;
  gradient?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span' | 'p';
  class?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
}

function Display({
  size = 'md',
  gradient = false,
  as: Tag = 'div',
  class: className = '',
  children,
  ...rest
}: DisplayProps) {
  return (
    <Tag class={cls('k-display', `k-display-${size}`, gradient && 'k-display-gradient', className)} {...rest}>
      {children}
    </Tag>
  );
}

// ─── Text ─────────────────────────────────────────────────────────────────────

export interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  mono?: boolean;
  label?: boolean; // uppercase tracking label style
  truncate?: boolean;
  as?: keyof JSX.IntrinsicElements;
  class?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
  [key: string]: any;
}

function Text({
  size,
  weight,
  color,
  mono = false,
  label = false,
  truncate = false,
  as: Tag = 'p',
  class: className = '',
  children,
  ...rest
}: TextProps) {
  const Tag2 = Tag as any;
  return (
    <Tag2
      class={cls(
        'k-text',
        size && `k-text-${size}`,
        weight && `k-text-${weight}`,
        color && color !== 'default' && `k-text-${color}`,
        mono && 'k-text-mono',
        label && 'k-text-label',
        truncate && 'k-text-truncate',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag2>
  );
}

// ─── Mono ─────────────────────────────────────────────────────────────────────

export interface MonoProps {
  size?: TextSize;
  color?: TextColor;
  as?: 'p' | 'span' | 'div' | 'pre';
  class?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
}

function Mono({ size, color, as: Tag = 'p', class: className = '', children, ...rest }: MonoProps) {
  const Tag2 = Tag as any;
  return (
    <Tag2
      class={cls('k-mono', size && `k-text-${size}`, color && color !== 'default' && `k-text-${color}`, className)}
      {...rest}
    >
      {children}
    </Tag2>
  );
}

// ─── Link ─────────────────────────────────────────────────────────────────────

export interface LinkProps {
  href?: string;
  variant?: 'default' | 'muted' | 'danger';
  external?: boolean;
  size?: TextSize;
  weight?: TextWeight;
  as?: 'a' | 'button' | 'span';
  class?: string;
  style?: JSX.CSSProperties;
  onClick?: (e: MouseEvent) => void;
  children?: ComponentChildren;
  [key: string]: any;
}

function Link({
  href,
  variant = 'default',
  external = false,
  size,
  weight,
  as: Tag = 'a',
  class: className = '',
  children,
  ...rest
}: LinkProps) {
  const Tag2 = Tag as any;
  const externalProps = external && Tag === 'a' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Tag2
      href={Tag === 'a' ? href : undefined}
      class={cls(
        'k-link',
        variant !== 'default' && `k-link-${variant}`,
        external && 'k-link-external',
        size && `k-text-${size}`,
        weight && `k-text-${weight}`,
        className,
      )}
      {...externalProps}
      {...rest}
    >
      {children}
    </Tag2>
  );
}

// ─── Blockquote ───────────────────────────────────────────────────────────────

export interface BlockquoteProps {
  cite?: string;
  class?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
}

function Blockquote({ cite, class: className = '', children, ...rest }: BlockquoteProps) {
  return (
    <blockquote class={cls('k-blockquote', className)} {...rest}>
      {children}
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}

// ─── Banner ───────────────────────────────────────────────────────────────────

export interface BannerProps {
  variant?: BannerVariant;
  title?: string;
  icon?: ComponentChildren;
  dismissible?: boolean;
  onDismiss?: () => void;
  class?: string;
  style?: JSX.CSSProperties;
  children?: ComponentChildren;
}

const BANNER_ICONS: Record<BannerVariant, ComponentChildren> = {
  info: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  success: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  neutral: (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

function Banner({
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  class: className = '',
  children,
  ...rest
}: BannerProps) {
  return (
    <div class={cls('k-banner', `k-banner-${variant}`, className)} role="alert" {...rest}>
      <span class="k-banner-icon" aria-hidden="true">
        {icon ?? BANNER_ICONS[variant]}
      </span>
      <div class="k-banner-body">
        {title && <div class="k-banner-title">{title}</div>}
        {children && <div class="k-banner-desc">{children}</div>}
      </div>
      {dismissible && (
        <button class="k-banner-dismiss" onClick={onDismiss} aria-label="Dismiss">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── DividerLabel ─────────────────────────────────────────────────────────────

export interface DividerLabelProps {
  class?: string;
  children?: ComponentChildren;
}

function DividerLabel({ class: className = '', children }: DividerLabelProps) {
  return <div class={cls('k-divider-label', className)}>{children}</div>;
}

// ─── Typography namespace ─────────────────────────────────────────────────────

export const Typography = {
  H1: Heading(1),
  H2: Heading(2),
  H3: Heading(3),
  H4: Heading(4),
  H5: Heading(5),
  H6: Heading(6),
  Display,
  Text,
  Mono,
  Link,
  Blockquote,
  Banner,
  DividerLabel,
};

// Named exports for direct import
export {
  Display as TypographyDisplay,
  Text as TypographyText,
  Mono as TypographyMono,
  Link as TypographyLink,
  Blockquote as TypographyBlockquote,
  Banner as TypographyBanner,
  DividerLabel as TypographyDividerLabel,
};

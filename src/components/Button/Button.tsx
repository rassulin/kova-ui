import './button.scss';
import { type ComponentChildren, h } from 'preact';
import { Icon, type IconName, type IconSize } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant = 'solid' | 'solid-cyan' | 'ghost' | 'outline' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const ICON_SIZE: Record<ButtonSize, IconSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'md',
};

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon shown before the label */
  icon?: IconName;
  /** Icon shown after the label */
  iconRight?: IconName;
  /** Square icon-only button — no label rendered */
  iconOnly?: boolean;
  /** Accessible label when iconOnly=true */
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  class?: string;
  children?: ComponentChildren;
  [key: string]: any;
}

export function Button({
  variant = 'solid',
  size = 'md',
  icon,
  iconRight,
  iconOnly = false,
  label,
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  href,
  class: className = '',
  children,
  ...rest
}: ButtonProps) {
  const cls = [
    'k-btn',
    `k-btn-${variant}`,
    `k-btn-${size}`,
    iconOnly ? 'k-btn-icon' : '',
    loading ? 'k-btn-loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const sz = ICON_SIZE[size];

  const content = (
    <>
      {loading ? (
        <Spinner size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'} />
      ) : (
        icon && <Icon name={icon} size={sz} />
      )}
      {iconOnly ? !icon && !loading && children : children && <span class="k-btn-text">{children}</span>}
      {!loading && iconRight && <Icon name={iconRight} size={sz} />}
    </>
  );

  if (href) {
    return (
      <a href={href} class={cls} aria-label={iconOnly ? label : undefined} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      class={cls}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={iconOnly ? label : undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
}

/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to `clsx` / `classnames`.
 *
 * @example
 * cn('k-btn', variant && `k-btn-${variant}`, disabled && 'k-btn-disabled')
 * // → 'k-btn k-btn-solid'
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

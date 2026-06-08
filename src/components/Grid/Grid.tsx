import './grid.scss';
import { h, ComponentChildren } from 'preact';

/* ── Progress ─────────────────────────────────────────────────── */
export interface ProgressProps {
  value: number;
  max?: number;
  glow?: boolean;
  class?: string;
}
export function Progress({ value, max = 100, glow = false, class: className = '' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      class={['k-progress', glow ? 'k-progress-glow' : '', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
    >
      <div class="k-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ── Skeleton ─────────────────────────────────────────────────── */
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  class?: string;
}
export function Skeleton({ width = '100%', height = 16, circle = false, class: className = '' }: SkeletonProps) {
  return (
    <span
      class={['k-skeleton', className].filter(Boolean).join(' ')}
      style={{
        display: 'block',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: circle ? '50%' : undefined,
      }}
      aria-hidden="true"
    />
  );
}

/* ── Grid ─────────────────────────────────────────────────────── */
export interface GridProps {
  cols?: 2 | 3 | 4 | 'auto';
  gap?: number;
  class?: string;
  children?: ComponentChildren;
}
export function Grid({ cols = 'auto', gap = 24, class: className = '', children }: GridProps) {
  return (
    <div
      class={['k-grid', cols !== 'auto' ? `k-grid-${cols}` : 'k-grid-auto', className].filter(Boolean).join(' ')}
      style={{ gap: `${gap}px` }}
    >
      {children}
    </div>
  );
}

/* ── Stack ────────────────────────────────────────────────────── */
export interface StackProps {
  direction?: 'row' | 'column';
  gap?: number;
  align?: string;
  justify?: string;
  class?: string;
  children?: ComponentChildren;
}
export function Stack({ direction = 'column', gap = 16, align, justify, class: className = '', children }: StackProps) {
  return (
    <div
      class={[direction === 'row' ? 'k-hstack' : 'k-stack', className].filter(Boolean).join(' ')}
      style={{ gap: `${gap}px`, alignItems: align, justifyContent: justify }}
    >
      {children}
    </div>
  );
}

/* ── Divider ──────────────────────────────────────────────────── */
export function Divider({ vertical = false }: { vertical?: boolean }) {
  return <hr class={vertical ? 'k-divider-v' : 'k-divider'} />;
}

/* ── Kbd ──────────────────────────────────────────────────────── */
export function Kbd({ children }: { children: ComponentChildren }) {
  return <kbd class="k-kbd">{children}</kbd>;
}

/* ── Code ─────────────────────────────────────────────────────── */
export function Code({ children, block = false }: { children: ComponentChildren; block?: boolean }) {
  if (block) return <pre class="k-pre">{children}</pre>;
  return <code class="k-code">{children}</code>;
}

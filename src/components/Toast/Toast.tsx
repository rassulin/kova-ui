import './toast.scss';
import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { createPortal } from 'preact/compat';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'tr' | 'tl' | 'br' | 'bl' | 'tc';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
  exiting?: boolean;
}

const ICONS: Record<ToastVariant, string> = {
  success: 'M20 6L9 17l-5-5',
  error: 'M18 6L6 18M6 6l12 12',
  warning: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
  info: 'M12 16v-4m0-4h.01M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z',
};

const DURATION_DEFAULTS: Record<ToastVariant, number> = {
  success: 3000,
  error: 5000,
  warning: 4000,
  info: 3500,
};

function ToastIcon({ variant }: { variant: ToastVariant }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="k-toast-icon"
      aria-hidden="true"
    >
      <path d={ICONS[variant]} />
    </svg>
  );
}

interface ToastContainerProps {
  toasts: ToastItem[];
  position: ToastPosition;
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, position, onRemove }: ToastContainerProps) {
  if (!toasts.length) return null;
  const content = (
    <div class={`k-toast-container k-toast-container-${position}`}>
      {toasts.map(t => {
        const variant = t.variant || 'info';
        const dur = t.duration ?? DURATION_DEFAULTS[variant];
        return (
          <div
            key={t.id}
            class={['k-toast', `k-toast-${variant}`, t.exiting ? 'k-toast-exit' : ''].filter(Boolean).join(' ')}
            role="alert"
            style={{ '--k-toast-dur': `${dur}ms` } as any}
          >
            <ToastIcon variant={variant} />
            <div class="k-toast-content">
              <div class="k-toast-title">{t.title}</div>
              {t.message && <div class="k-toast-msg">{t.message}</div>}
            </div>
            <button class="k-toast-close" onClick={() => onRemove(t.id)} aria-label="Dismiss">
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
          </div>
        );
      })}
    </div>
  );
  if (typeof document !== 'undefined') return createPortal(content, document.body);
  return content;
}

export interface UseToastOptions {
  position?: ToastPosition;
}

export function useToast({ position = 'tr' }: UseToastOptions = {}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts(ts => ts.map(t => (t.id === id ? { ...t, exiting: true } : t)));
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 300);
  }, []);

  const toast = useCallback(
    (title: string, opts: Partial<Omit<ToastItem, 'id' | 'title'>> = {}) => {
      const id = Math.random().toString(36).slice(2);
      const variant = opts.variant || 'info';
      const duration = opts.duration ?? DURATION_DEFAULTS[variant];
      setToasts(ts => [...ts, { id, title, variant, duration, ...opts }]);
      if (duration > 0) setTimeout(() => remove(id), duration);
      return id;
    },
    [remove],
  );

  const success = useCallback(
    (title: string, message?: string) => toast(title, { variant: 'success', message }),
    [toast],
  );
  const error = useCallback((title: string, message?: string) => toast(title, { variant: 'error', message }), [toast]);
  const warning = useCallback(
    (title: string, message?: string) => toast(title, { variant: 'warning', message }),
    [toast],
  );
  const info = useCallback((title: string, message?: string) => toast(title, { variant: 'info', message }), [toast]);

  const Container = useCallback(
    () => <ToastContainer toasts={toasts} position={position} onRemove={remove} />,
    [toasts, position, remove],
  );

  return { toast, success, error, warning, info, remove, Container };
}

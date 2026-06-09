import './modal.scss';
import { ComponentChildren, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { createPortal } from 'preact/compat';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ComponentChildren;
  class?: string;
  children?: ComponentChildren;
  closeOnOverlay?: boolean;
}

const MAX_WIDTHS = { sm: '380px', md: '520px', lg: '720px', xl: '960px' };

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  footer,
  class: className = '',
  children,
  closeOnOverlay = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const content = (
    <div
      class="k-modal-overlay"
      role="presentation"
      onClick={
        closeOnOverlay
          ? (e: MouseEvent) => {
              if (e.target === e.currentTarget) onClose?.();
            }
          : undefined
      }
    >
      <div
        class={['k-modal', className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ maxWidth: MAX_WIDTHS[size] }}
      >
        {(title || onClose) && (
          <div class="k-modal-header">
            {title && <h2 class="k-modal-title">{title}</h2>}
            {onClose && (
              <button class="k-modal-close" onClick={onClose} aria-label="Close">
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
        )}
        <div class="k-modal-body">{children}</div>
        {footer && <div class="k-modal-footer">{footer}</div>}
      </div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  return content;
}

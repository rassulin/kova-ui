import { useEffect } from 'preact/hooks';
import type { RefObject } from 'preact';

/**
 * Fires `handler` when a click or touch occurs outside the referenced element.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null)
 * useClickOutside(ref, () => setOpen(false))
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    }
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

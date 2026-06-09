import { useCallback, useState } from 'preact/hooks';

export interface UseDisclosureReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/**
 * Manages open/closed boolean state — useful for modals, drawers, dropdowns.
 *
 * @example
 * const { isOpen, open, close } = useDisclosure()
 * <Button onClick={open}>Show modal</Button>
 * <Modal open={isOpen} onClose={close}>...</Modal>
 */
export function useDisclosure(defaultOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(v => !v), []);
  return { isOpen, open, close, toggle };
}

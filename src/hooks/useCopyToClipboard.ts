import { useState, useCallback } from 'preact/hooks';

export interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

/**
 * Copies text to the clipboard and tracks copied state for UI feedback.
 *
 * @example
 * const { copied, copy } = useCopyToClipboard()
 *
 * <Button onClick={() => copy('npm install kova-ui')}>
 *   {copied ? 'Copied!' : 'Copy'}
 * </Button>
 */
export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        // fallback for older browsers
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      }
    },
    [resetDelay],
  );

  const reset = useCallback(() => setCopied(false), []);

  return { copied, copy, reset };
}

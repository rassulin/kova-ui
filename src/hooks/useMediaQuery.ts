import { useEffect, useState } from 'preact/hooks';

/**
 * Reactively tracks a CSS media query.
 *
 * @example
 * const isMobile  = useMediaQuery('(max-width: 768px)')
 * const isDark    = useMediaQuery('(prefers-color-scheme: dark)')
 * const isMotion  = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Convenience breakpoint hooks matching kova-ui's responsive grid
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(max-width: 1024px)');
export const useIsDark = () => useMediaQuery('(prefers-color-scheme: dark)');
export const useIsReduced = () => useMediaQuery('(prefers-reduced-motion: reduce)');

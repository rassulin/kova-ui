import { useCallback, useState } from 'preact/hooks';

/**
 * Persists state in localStorage with a JSON-serialised value.
 * Falls back gracefully when localStorage is unavailable (SSR, private mode).
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'dark')
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue(prev => {
          const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
          window.localStorage.setItem(key, JSON.stringify(next));
          return next;
        });
      } catch {
        // ignore write errors (quota exceeded, private mode, etc.)
      }
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch {
      // ignore (quota, private mode, SSR)
    }
  }, [key, initialValue]);

  return [storedValue, setValue, remove] as const;
}

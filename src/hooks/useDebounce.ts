import { useState, useEffect } from 'preact/hooks';

/**
 * Debounces a value — only updates after `delay` ms of inactivity.
 * Useful for search inputs, resize handlers, etc.
 *
 * @example
 * const [query, setQuery] = useState('')
 * const debouncedQuery = useDebounce(query, 300)
 *
 * useEffect(() => {
 *   fetchResults(debouncedQuery)
 * }, [debouncedQuery])
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

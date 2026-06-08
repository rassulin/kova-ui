/**
 * Generates a short unique ID — useful for accessible label associations
 * (linking `<label for="...">` to `<input id="...">`).
 *
 * @example
 * const id = generateId('input')  // → 'input-k7x2q'
 * const id = generateId()         // → 'kova-m3np1'
 */
export function generateId(prefix = 'kova'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}

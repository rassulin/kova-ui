const PALETTE = [
  '#8b5cf6', // violet
  '#22d3ee', // cyan
  '#4ade80', // green
  '#f472b6', // pink
  '#fbbf24', // amber
  '#f87171', // red
  '#60a5fa', // blue
];

/**
 * Returns a deterministic accent color for a given string (e.g. a user name).
 * The same string always produces the same color.
 *
 * @example
 * colorFromString('Alice Chen')  // → '#22d3ee'
 */
export function colorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

/**
 * Extracts up to 2 initials from a full name.
 *
 * @example
 * initials('Rustam Nazarov')  // → 'RN'
 * initials('Alice')           // → 'A'
 */
export function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();
}

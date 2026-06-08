import './theme.scss';
import { type ComponentChildren, createContext, h } from 'preact';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'preact/hooks';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light' | 'system';
export type RadiusScale = 'sharp' | 'default' | 'rounded';
export type Density = 'compact' | 'default' | 'comfortable';
export type ScrollbarStyle = 'styled' | 'hidden' | 'auto';

export interface KovaThemeProps {
  /** 'dark' | 'light' | 'system' (follows OS). @default 'system' */
  theme?: Theme;
  /** localStorage key for persistence. false = disabled. @default 'kova-theme' */
  storageKey?: string | false;
  /** Border-radius scale. @default 'default' */
  radius?: RadiusScale;
  /** Spacing / height density. @default 'default' */
  density?: Density;
  /** Override accent colour — any valid CSS colour string */
  accent?: string;
  /** Scrollbar appearance. @default 'styled' */
  scrollbar?: ScrollbarStyle;
  /** Raw --k-* token overrides */
  tokens?: Record<string, string>;
  as?: 'div' | 'main' | 'section' | 'article' | 'aside';
  class?: string;
  children?: ComponentChildren;
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  /** Resolved: always 'dark' or 'light' */
  theme: 'dark' | 'light';
  setting: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
  radius: RadiusScale;
  density: Density;
  accent: string | undefined;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setting: 'dark',
  setTheme: () => {},
  toggle: () => {},
  radius: 'default',
  density: 'default',
  accent: undefined,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getOsTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storageGet(key: string): Theme | null {
  try {
    const v = localStorage.getItem(key);
    if (v === 'dark' || v === 'light' || v === 'system') return v;
  } catch {}
  return null;
}

function storageSet(key: string, v: Theme) {
  try {
    localStorage.setItem(key, v);
  } catch {}
}

/** Parse any CSS colour → derive accent token set via canvas */
function deriveAccent(colour: string): Record<string, string> {
  if (typeof document === 'undefined') return {};
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    const ctx = c.getContext('2d');
    if (!ctx) return {};
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    const r = d[0];
    const g = d[1];
    const b = d[2];
    const mix = (n: number) => Math.round(n + (255 - n) * 0.28);
    return {
      '--k-accent': colour,
      '--k-accent-glow': `rgba(${r},${g},${b},0.25)`,
      '--k-accent-light': `rgb(${mix(r)},${mix(g)},${mix(b)})`,
      '--k-border-focus': `rgba(${r},${g},${b},0.55)`,
    };
  } catch {
    return {};
  }
}

// All radius variants always set every token so switching back to default works
const RADIUS: Record<RadiusScale, Record<string, string>> = {
  sharp: { '--k-r-sm': '3px', '--k-r-md': '5px', '--k-r-lg': '8px', '--k-r-xl': '12px', '--k-r-pill': '9999px' },
  default: { '--k-r-sm': '6px', '--k-r-md': '10px', '--k-r-lg': '16px', '--k-r-xl': '24px', '--k-r-pill': '9999px' },
  rounded: { '--k-r-sm': '10px', '--k-r-md': '16px', '--k-r-lg': '24px', '--k-r-xl': '36px', '--k-r-pill': '9999px' },
};

// ─── KovaTheme ────────────────────────────────────────────────────────────────

export function KovaTheme({
  theme: themeProp = 'system',
  storageKey = 'kova-theme',
  radius = 'default',
  density = 'default',
  accent,
  scrollbar = 'styled',
  tokens = {},
  as: Tag = 'div',
  class: className = '',
  children,
}: KovaThemeProps) {
  // biome-ignore lint/suspicious/noExplicitAny: dynamic tag ref
  const ref = useRef<any>(null);

  // ── Theme state ────────────────────────────────────────────────────────────
  const [setting, setSetting] = useState<Theme>(() => {
    if (storageKey) {
      const s = storageGet(storageKey);
      if (s) return s;
    }
    return themeProp;
  });
  const [osTheme, setOsTheme] = useState<'dark' | 'light'>(getOsTheme);

  const resolved: 'dark' | 'light' = setting === 'system' ? osTheme : setting;

  // Track OS preference changes when in system mode
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const fn = (e: MediaQueryListEvent) => setOsTheme(e.matches ? 'dark' : 'light');
    mql.addEventListener('change', fn);
    return () => mql.removeEventListener('change', fn);
  }, []);

  const setTheme = useCallback(
    (t: Theme) => {
      setSetting(t);
      if (storageKey) storageSet(storageKey, t);
    },
    [storageKey],
  );

  const toggle = useCallback(() => {
    setTheme(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setTheme]);

  // ── Compute all CSS vars to apply ─────────────────────────────────────────
  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};
    // Radius — always write all 5 tokens so switching scales works
    Object.assign(vars, RADIUS[radius]);
    // Accent derivation
    if (accent) Object.assign(vars, deriveAccent(accent));
    // Explicit overrides win last
    Object.assign(vars, tokens);
    return vars;
  }, [radius, accent, tokens]);

  // ── Write data-theme + CSS vars directly to the DOM element ───────────────
  // We use ref + setProperty — NOT the style prop — because:
  // 1. CSS custom properties (--k-*) are silently dropped by Preact's style typings
  // 2. setProperty is the only guaranteed way to set custom properties via JS
  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    el.setAttribute('data-theme', resolved);
    for (const [k, v] of Object.entries(cssVars)) {
      el.style.setProperty(k, v);
    }
  }, [resolved, cssVars]);

  const T = Tag as 'div';

  return (
    <ThemeContext.Provider value={{ theme: resolved, setting, setTheme, toggle, radius, density, accent }}>
      <T
        ref={ref}
        class={[
          'k-theme',
          `k-theme--${resolved}`,
          `k-theme--radius-${radius}`,
          `k-theme--density-${density}`,
          `k-theme--scrollbar-${scrollbar}`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        data-theme={resolved}
      >
        {children}
      </T>
    </ThemeContext.Provider>
  );
}

// ─── useTheme ─────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

export interface ThemeToggleProps {
  showLabel?: boolean;
  class?: string;
}

export function ThemeToggle({ showLabel = false, class: className = '' }: ThemeToggleProps) {
  const { theme, setting, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      class={['k-theme-toggle', className].filter(Boolean).join(' ')}
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      {showLabel && (
        <span class="k-theme-toggle-label">
          {setting === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

function SunIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative, parent has aria-label
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: decorative, parent has aria-label
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// Keep KovaProvider as alias so existing imports don't break
export { KovaTheme as KovaProvider };
export type { KovaThemeProps as KovaProviderProps };

import type { Preview } from '@storybook/preact';
import '../src/styles.scss';

// Set data-theme on the Storybook iframe root so all CSS vars resolve
// KovaTheme stories override this locally on their own wrapper element
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', 'dark');

  // Write all default CSS custom properties directly to :root
  // so components render correctly even outside a <KovaTheme> wrapper
  const root = document.documentElement;
  const defaults: Record<string, string> = {
    '--k-r-sm':   '6px',
    '--k-r-md':   '10px',
    '--k-r-lg':   '16px',
    '--k-r-xl':   '24px',
    '--k-r-pill': '9999px',
    '--k-accent':        '#8b5cf6',
    '--k-accent-glow':   'rgba(139,92,246,0.25)',
    '--k-accent-light':  '#a78bfa',
    '--k-border-focus':  'rgba(139,92,246,0.6)',
  };
  for (const [k, v] of Object.entries(defaults)) {
    root.style.setProperty(k, v);
  }
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'kova-dark',
      values: [
        { name: 'kova-dark',    value: '#0d0d0f' },
        { name: 'kova-surface', value: '#111114' },
        { name: 'light',        value: '#ffffff' },
      ],
    },
    layout: 'centered',
    docs: {
      theme: {
        base: 'dark',
        brandTitle: 'kova-ui',
        brandUrl: 'https://www.npmjs.com/package/kova-ui',
        colorPrimary: '#8b5cf6',
        colorSecondary: '#22d3ee',
        appBg: '#0d0d0f',
        appContentBg: '#111114',
        appBorderColor: 'rgba(255,255,255,0.07)',
        appBorderRadius: 10,
        fontBase: "'Syne', sans-serif",
        fontCode: "'DM Mono', monospace",
        textColor: '#f5f5f7',
        textInverseColor: '#080808',
        textMutedColor: '#8b8b99',
        barTextColor: '#8b8b99',
        barHoverColor: '#f5f5f7',
        barSelectedColor: '#8b5cf6',
        barBg: '#0d0d0f',
        inputBg: '#18181c',
        inputBorder: 'rgba(255,255,255,0.07)',
        inputTextColor: '#f5f5f7',
        inputBorderRadius: 6,
      },
    },
  },
};

export default preview;

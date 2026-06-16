import type { Preview } from '@storybook/preact';
import { h, Fragment } from 'preact';
import '../src/styles.scss';
import { SpriteSheet } from '../src/components/Icon/Icon';

const preview: Preview = {
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => h(Fragment, null, h(SpriteSheet, null), h(Story, null)),
  ],
  parameters: {
    backgrounds: {
      default: 'kova-dark',
      values: [
        { name: 'kova-dark', value: '#0d0d0f' },
        { name: 'kova-surface', value: '#111114' },
        { name: 'light', value: '#ffffff' },
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

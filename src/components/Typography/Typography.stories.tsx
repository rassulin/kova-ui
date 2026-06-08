import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Typography** is a namespace of composable text primitives. All props are semantic — no raw pixel values.

\`\`\`ts
import { Typography } from 'kova-ui'

<Typography.H1>Page title</Typography.H1>
<Typography.Text size="lg" weight="medium">Subtitle</Typography.Text>
<Typography.Link href="/docs">Read the docs</Typography.Link>
\`\`\`

Or import named components directly:

\`\`\`ts
import { TypographyText, TypographyLink } from 'kova-ui'
\`\`\`

### Size scale

| size | font-size | line-height |
|------|-----------|-------------|
| xs   | 11px      | 1.5         |
| sm   | 13px      | 1.6         |
| md   | 15px      | 1.7 (default) |
| lg   | 17px      | 1.6         |
| xl   | 20px      | 1.5         |
| 2xl  | 24px      | 1.4         |

### The \`as\` prop

Every component accepts \`as\` to control the rendered HTML element without changing visual style:

\`\`\`tsx
<Typography.H2 as="h1">Visually H2, semantically H1</Typography.H2>
<Typography.Text as="span">Inline text</Typography.Text>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const gap = (px: number) => ({ display: 'flex', flexDirection: 'column' as const, gap: `${px}px` });
const row = (px = 12) => ({ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'baseline', gap: `${px}px` });

// ── Headings ──────────────────────────────────────────────────────────────────

export const Headings: Story = {
  render: () => (
    <div style={gap(24)}>
      <Typography.H1>H1 — The quick brown fox</Typography.H1>
      <Typography.H2>H2 — The quick brown fox</Typography.H2>
      <Typography.H3>H3 — The quick brown fox</Typography.H3>
      <Typography.H4>H4 — The quick brown fox</Typography.H4>
      <Typography.H5>H5 — The quick brown fox</Typography.H5>
      <Typography.H6>H6 — The quick brown fox</Typography.H6>
    </div>
  ),
};

// ── Display ───────────────────────────────────────────────────────────────────

export const DisplayText: Story = {
  name: 'Display',
  render: () => (
    <div style={gap(32)}>
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size}>
          <Typography.Text size="xs" color="subtle" style={{ marginBottom: '4px' }}>
            size="{size}"
          </Typography.Text>
          <Typography.Display size={size}>Build faster.</Typography.Display>
        </div>
      ))}
      <div>
        <Typography.Text size="xs" color="subtle" style={{ marginBottom: '4px' }}>
          gradient
        </Typography.Text>
        <Typography.Display size="xl" gradient>
          Ship with confidence.
        </Typography.Display>
      </div>
    </div>
  ),
};

// ── Text sizes ────────────────────────────────────────────────────────────────

export const TextSizes: Story = {
  name: 'Text — Sizes',
  render: () => (
    <div style={gap(12)}>
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => (
        <div key={size} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
          <Typography.Text size="xs" color="subtle" mono style={{ width: '32px', flexShrink: 0 }}>
            {size}
          </Typography.Text>
          <Typography.Text size={size}>The quick brown fox jumps over the lazy dog.</Typography.Text>
        </div>
      ))}
    </div>
  ),
};

// ── Text weights ──────────────────────────────────────────────────────────────

export const TextWeights: Story = {
  name: 'Text — Weights',
  render: () => (
    <div style={gap(10)}>
      {(['normal', 'medium', 'semibold', 'bold', 'extrabold'] as const).map(w => (
        <div key={w} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Typography.Text size="xs" color="subtle" mono style={{ width: '80px', flexShrink: 0 }}>
            {w}
          </Typography.Text>
          <Typography.Text size="lg" weight={w}>
            The quick brown fox
          </Typography.Text>
        </div>
      ))}
    </div>
  ),
};

// ── Text colors ───────────────────────────────────────────────────────────────

export const TextColors: Story = {
  name: 'Text — Colors',
  render: () => (
    <div style={gap(8)}>
      {(['default', 'muted', 'subtle', 'accent', 'success', 'danger', 'warning'] as const).map(c => (
        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Typography.Text size="xs" color="subtle" mono style={{ width: '70px', flexShrink: 0 }}>
            {c}
          </Typography.Text>
          <Typography.Text color={c}>The quick brown fox jumps over the lazy dog.</Typography.Text>
        </div>
      ))}
    </div>
  ),
};

// ── Mono ──────────────────────────────────────────────────────────────────────

export const MonoText: Story = {
  name: 'Mono',
  render: () => (
    <div style={gap(12)}>
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <div key={size} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
          <Typography.Text size="xs" color="subtle" mono style={{ width: '32px', flexShrink: 0 }}>
            {size}
          </Typography.Text>
          <Typography.Mono size={size}>npm install kova-ui --save-dev</Typography.Mono>
        </div>
      ))}
    </div>
  ),
};

// ── Link ──────────────────────────────────────────────────────────────────────

export const Links: Story = {
  render: () => (
    <div style={gap(16)}>
      <div style={row()}>
        <Typography.Link href="#">Default link</Typography.Link>
        <Typography.Link href="#" variant="muted">
          Muted link
        </Typography.Link>
        <Typography.Link href="#" variant="danger">
          Danger link
        </Typography.Link>
      </div>
      <div style={row()}>
        <Typography.Link href="https://npmjs.com" external>
          External link
        </Typography.Link>
        <Typography.Text size="sm" color="muted">
          ← has ↗ indicator + opens in new tab
        </Typography.Text>
      </div>
      <div style={row()}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
          <Typography.Link key={size} href="#" size={size}>
            {size}
          </Typography.Link>
        ))}
      </div>
      <Typography.Text size="md" as="p">
        Visit the{' '}
        <Typography.Link href="https://npmjs.com/package/kova-ui" external>
          kova-ui npm page
        </Typography.Link>{' '}
        or read the <Typography.Link href="#">documentation</Typography.Link> to get started.
      </Typography.Text>
    </div>
  ),
};

// ── Label ─────────────────────────────────────────────────────────────────────

export const Label: Story = {
  name: 'Text — Label Style',
  render: () => (
    <div style={gap(24)}>
      <div>
        <Typography.Text label style={{ marginBottom: '8px' }}>
          Section heading
        </Typography.Text>
        <Typography.Text size="sm" color="muted">
          Content below a label-style heading.
        </Typography.Text>
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {['Components', 'Hooks', 'Utilities', 'Theme'].map(t => (
          <Typography.Text key={t} label>
            {t}
          </Typography.Text>
        ))}
      </div>
    </div>
  ),
};

// ── Blockquote ────────────────────────────────────────────────────────────────

export const BlockquoteStory: Story = {
  name: 'Blockquote',
  render: () => (
    <div style={gap(16)}>
      <Typography.Blockquote>
        Design is not just what it looks like and feels like. Design is how it works.
      </Typography.Blockquote>
      <Typography.Blockquote cite="Steve Jobs">
        Design is not just what it looks like and feels like. Design is how it works.
      </Typography.Blockquote>
    </div>
  ),
};

// ── Banners ───────────────────────────────────────────────────────────────────

export const Banners: Story = {
  render: () => {
    function Demo() {
      const [dismissed, setDismissed] = useState<string[]>([]);
      return (
        <div style={gap(10)}>
          {(['info', 'success', 'warning', 'danger', 'neutral'] as const)
            .filter(v => !dismissed.includes(v))
            .map(variant => (
              <Typography.Banner
                key={variant}
                variant={variant}
                title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} banner`}
                dismissible
                onDismiss={() => setDismissed(d => [...d, variant])}
              >
                This is a {variant} banner. It supports a title, body text, and optional dismiss button.
              </Typography.Banner>
            ))}
          {dismissed.length > 0 && (
            <button
              style={{
                fontFamily: 'var(--k-font-mono)',
                fontSize: '12px',
                color: 'var(--k-text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setDismissed([])}
            >
              ↺ Reset
            </button>
          )}
        </div>
      );
    }
    return <Demo />;
  },
};

export const BannersNoTitle: Story = {
  name: 'Banners — Body Only',
  render: () => (
    <div style={gap(10)}>
      <Typography.Banner variant="info">Your trial ends in 3 days. Upgrade to keep access.</Typography.Banner>
      <Typography.Banner variant="warning">You are running low on API credits.</Typography.Banner>
      <Typography.Banner variant="success">Deployment successful. Your app is live.</Typography.Banner>
    </div>
  ),
};

// ── DividerLabel ──────────────────────────────────────────────────────────────

export const DividerLabelStory: Story = {
  name: 'DividerLabel',
  render: () => (
    <div style={gap(16)}>
      <Typography.DividerLabel>or continue with</Typography.DividerLabel>
      <Typography.DividerLabel>Today</Typography.DividerLabel>
      <Typography.DividerLabel>Advanced settings</Typography.DividerLabel>
    </div>
  ),
};

// ── Full page composition ─────────────────────────────────────────────────────

export const Composition: Story = {
  name: 'Real-world Composition',
  render: () => (
    <div style={{ maxWidth: '600px', ...gap(24) }}>
      <Typography.Banner variant="info" title="New in v0.2.0">
        Typography and DatePicker components are now available.
      </Typography.Banner>

      <div style={gap(8)}>
        <Typography.Text label>Getting started</Typography.Text>
        <Typography.H2>Build your design system</Typography.H2>
        <Typography.Text size="lg" color="muted">
          kova-ui gives you a complete set of dark-first components. Install once, theme freely.
        </Typography.Text>
      </div>

      <Typography.Blockquote cite="kova-ui docs">
        Every token is a CSS custom property. Override one variable, the whole system follows.
      </Typography.Blockquote>

      <Typography.Mono size="sm">npm install kova-ui</Typography.Mono>

      <Typography.Text as="p">
        Read the full <Typography.Link href="#">installation guide</Typography.Link> or explore the{' '}
        <Typography.Link href="#" external>
          npm registry
        </Typography.Link>
        .
      </Typography.Text>

      <Typography.DividerLabel>Components</Typography.DividerLabel>

      <div style={gap(4)}>
        {['Button', 'Badge', 'Card', 'Input', 'Modal', 'Toast', 'Typography'].map(name => (
          <Typography.Text key={name} size="sm">
            <Typography.Link href="#">{name}</Typography.Link>{' '}
            <Typography.Text as="span" size="xs" color="subtle" mono>
              kova-ui/components/{name}
            </Typography.Text>
          </Typography.Text>
        ))}
      </div>
    </div>
  ),
};

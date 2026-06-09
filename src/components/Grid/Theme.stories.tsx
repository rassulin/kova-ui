import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { KovaProvider, KovaTheme, ThemeToggle, useTheme } from '../../theme/index';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { Input } from '../Input/Input';
import { Switch } from '../Switch/Switch';
import { useState } from 'preact/hooks';

const meta = {
  title: 'Components/Theme',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**KovaTheme** (alias: \`KovaProvider\`) wraps your app and exposes theme, radius, density, accent and scrollbar controls via CSS custom properties.
**ThemeToggle** is a drop-in button that calls \`useTheme().toggle()\`.

\`\`\`tsx
import { KovaTheme, ThemeToggle, useTheme } from 'kova-ui'

function App() {
  return (
    <KovaTheme theme="dark" radius="default" density="default" scrollbar="styled">
      <ThemeToggle />
      {/* rest of your app */}
    </KovaTheme>
  )
}
\`\`\`

### Manual control

\`\`\`tsx
const { theme, setTheme, toggle } = useTheme()

<button onClick={() => setTheme('light')}>Go light</button>
<button onClick={toggle}>Toggle</button>
\`\`\`

### How it works

All surface/border/text colors are CSS custom properties that flip when \`data-theme="light"\` is set on \`<html>\`:

\`\`\`scss
:root, [data-theme="dark"]  { --k-surface-1: #111114; --k-text: #f5f5f7; }
[data-theme="light"]         { --k-surface-1: #ffffff; --k-text: #0f0f14; }
\`\`\`

Accent colors (violet, cyan, green…) stay the same in both themes.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Showcase() {
  const { theme } = useTheme();
  const [sw, setSw] = useState(true);

  return (
    <div
      style={{
        background: 'var(--k-bg)',
        padding: '2rem',
        borderRadius: 'var(--k-r-xl)',
        border: '0.5px solid var(--k-border)',
        minWidth: '360px',
        transition: 'background 300ms, border-color 300ms',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span
          style={{ fontFamily: 'var(--k-font-display)', fontWeight: 700, color: 'var(--k-text)', fontSize: '15px' }}
        >
          Theme: <Badge variant="accent">{theme}</Badge>
        </span>
        <ThemeToggle />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="solid" size="sm">
            Solid
          </Button>
          <Button variant="ghost" size="sm">
            Ghost
          </Button>
          <Button variant="outline" size="sm">
            Outline
          </Button>
          <Button variant="danger" size="sm">
            Danger
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success" dot>
            Active
          </Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="cyan">Beta</Badge>
        </div>

        <Input placeholder="Type something…" />
        <Switch checked={sw} onChange={setSw} label="Enable notifications" />

        <Card title="Card component" subtitle="Adapts to both themes">
          Surface colors, borders, and text all flip automatically.
        </Card>
      </div>
    </div>
  );
}

export const Default: Story = {
  name: 'Theme Toggle Demo',
  render: () => (
    <KovaProvider theme="dark" storageKey={false}>
      <Showcase />
    </KovaProvider>
  ),
};

// ─── Radius ───────────────────────────────────────────────────────────────────

export const RadiusScales: Story = {
  name: 'Radius Scales',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' as const }}>
      {(['sharp', 'default', 'rounded'] as const).map(radius => (
        <KovaTheme key={radius} theme="dark" storageKey={false} radius={radius} style={{ flex: 1, minWidth: '180px' }}>
          <div
            style={{
              padding: '20px',
              background: 'var(--k-surface-1)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-lg)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--k-font-display)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: 'var(--k-text-subtle)',
                marginBottom: '14px',
              }}
            >
              radius="{radius}"
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
              <Button variant="solid" size="sm">
                Button
              </Button>
              <Input placeholder="Input field" />
              <div style={{ display: 'flex', gap: '6px' }}>
                <Badge variant="accent">New</Badge>
                <Badge variant="success" dot>
                  Live
                </Badge>
              </div>
            </div>
          </div>
        </KovaTheme>
      ))}
    </div>
  ),
};

// ─── Density ──────────────────────────────────────────────────────────────────

export const DensityScales: Story = {
  name: 'Density Scales',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' as const }}>
      {(['compact', 'default', 'comfortable'] as const).map(density => (
        <KovaTheme
          key={density}
          theme="dark"
          storageKey={false}
          density={density}
          style={{ flex: 1, minWidth: '200px' }}
        >
          <div
            style={{
              padding: '20px',
              background: 'var(--k-surface-1)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-lg)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--k-font-display)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: 'var(--k-text-subtle)',
                marginBottom: '14px',
              }}
            >
              density="{density}"
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
              <Button variant="solid">Primary action</Button>
              <Button variant="ghost">Secondary</Button>
              <Input placeholder="Text input" />
            </div>
          </div>
        </KovaTheme>
      ))}
    </div>
  ),
};

// ─── Custom accent ─────────────────────────────────────────────────────────────

export const CustomAccent: Story = {
  name: 'Custom Accent Color',
  render: () => {
    function Demo() {
      const accents = [
        { label: 'Violet (default)', value: '#8b5cf6' },
        { label: 'Cyan', value: '#22d3ee' },
        { label: 'Emerald', value: '#10b981' },
        { label: 'Rose', value: '#f43f5e' },
        { label: 'Amber', value: '#f59e0b' },
        { label: 'Sky', value: '#0ea5e9' },
      ];
      const [accent, setAccent] = useState('#8b5cf6');

      return (
        <KovaTheme theme="dark" storageKey={false} accent={accent}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '20px',
              padding: '24px',
              background: 'var(--k-surface-1)',
              borderRadius: 'var(--k-r-xl)',
              border: '0.5px solid var(--k-border)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--k-font-display)',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--k-text-subtle)',
                  marginBottom: '10px',
                }}
              >
                Pick accent
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                {accents.map(a => (
                  <button
                    key={a.value}
                    type="button"
                    onClick={() => setAccent(a.value)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: a.value,
                      border: accent === a.value ? '2px solid white' : '2px solid transparent',
                      cursor: 'pointer',
                      outline: 'none',
                      flexShrink: 0,
                    }}
                    title={a.label}
                  />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
              <Button variant="solid" size="sm">
                Primary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Badge variant="accent">Accent</Badge>
            </div>
            <Input placeholder="Focus me to see accent border…" />
            <Switch checked label="Accent switch" />
          </div>
        </KovaTheme>
      );
    }
    return <Demo />;
  },
};

// ─── Scrollbar ────────────────────────────────────────────────────────────────

export const ScrollbarStyles: Story = {
  name: 'Scrollbar Styles',
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      {(['styled', 'hidden', 'auto'] as const).map(scrollbar => (
        <KovaTheme key={scrollbar} theme="dark" storageKey={false} scrollbar={scrollbar} style={{ flex: 1 }}>
          <div style={{ border: '0.5px solid var(--k-border)', borderRadius: 'var(--k-r-lg)', overflow: 'hidden' }}>
            <div
              style={{
                padding: '10px 14px',
                background: 'var(--k-surface-2)',
                borderBottom: '0.5px solid var(--k-border)',
                fontFamily: 'var(--k-font-display)',
                fontWeight: 700,
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: 'var(--k-text-subtle)',
              }}
            >
              scrollbar="{scrollbar}"
            </div>
            <div
              style={{
                height: '160px',
                overflowY: 'auto',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column' as const,
                gap: '8px',
              }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '28px',
                    background: 'var(--k-surface-2)',
                    borderRadius: 'var(--k-r-sm)',
                    border: '0.5px solid var(--k-border)',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </KovaTheme>
      ))}
    </div>
  ),
};

// ─── Token overrides ──────────────────────────────────────────────────────────

export const TokenOverrides: Story = {
  name: 'Raw Token Overrides',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' as const }}>
      <KovaTheme
        theme="dark"
        storageKey={false}
        tokens={{ '--k-surface-1': '#0a0a12', '--k-surface-2': '#0f0f1c', '--k-border': 'rgba(100,80,200,0.2)' }}
        style={{ flex: 1, minWidth: '200px' }}
      >
        <Card title="Deep indigo" subtitle="tokens={{ '--k-surface-1': '#0a0a12', ... }}">
          Surfaces shifted toward deep indigo via raw token override.
        </Card>
      </KovaTheme>
      <KovaTheme
        theme="dark"
        storageKey={false}
        tokens={{ '--k-font-display': "'JetBrains Mono', monospace", '--k-font-mono': "'JetBrains Mono', monospace" }}
        style={{ flex: 1, minWidth: '200px' }}
      >
        <Card title="Custom font" subtitle="tokens={{ '--k-font-display': '...' }}">
          Override any design token — fonts, shadows, spacing — without forking.
        </Card>
      </KovaTheme>
    </div>
  ),
};

export const SideBySide: Story = {
  name: 'Dark & Light Side-by-Side',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Dark panel */}
      <div
        data-theme="dark"
        style={{ flex: 1, background: 'var(--k-bg)', padding: '2rem', transition: 'background 300ms' }}
      >
        <div
          style={{
            marginBottom: '1rem',
            fontFamily: 'var(--k-font-display)',
            fontWeight: 700,
            color: 'var(--k-text-muted)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Dark
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="solid" size="sm">
              Solid
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Badge variant="accent">New</Badge>
            <Badge variant="success" dot>
              Live
            </Badge>
          </div>
          <Input placeholder="Dark input" />
          <Card title="Dark card" subtitle="Surface 1">
            Deep dark surfaces.
          </Card>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '1px', background: 'rgba(128,128,128,0.2)' }} />

      {/* Light panel */}
      <div
        data-theme="light"
        style={{ flex: 1, background: 'var(--k-bg)', padding: '2rem', transition: 'background 300ms' }}
      >
        <div
          style={{
            marginBottom: '1rem',
            fontFamily: 'var(--k-font-display)',
            fontWeight: 700,
            color: 'var(--k-text-muted)',
            fontSize: '11px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Light
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="solid" size="sm">
              Solid
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Badge variant="accent">New</Badge>
            <Badge variant="success" dot>
              Live
            </Badge>
          </div>
          <Input placeholder="Light input" />
          <Card title="Light card" subtitle="Surface 1">
            Clean light surfaces.
          </Card>
        </div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { KovaTheme, ThemeToggle, useTheme } from '../../theme/index';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { Input } from '../Input/Input';
import { Switch } from '../Switch/Switch';
import { SpriteSheet } from '../Icon/Icon';

const meta = {
  title: 'Components/KovaTheme',
  tags: ['autodocs'],
  decorators: [
    (Story: () => h.JSX.Element) => (
      <>
        <SpriteSheet />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**KovaTheme** is the design system root. Wrap your app once.

\`\`\`tsx
import { KovaTheme, ThemeToggle } from 'kova-ui'

<KovaTheme theme="system" radius="default" scrollbar="styled">
  <ThemeToggle />
  <App />
</KovaTheme>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Showcase({ label }: { label?: string }) {
  const { theme } = useTheme();
  const [sw, setSw] = useState(true);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        padding: '1.5rem',
        background: 'var(--k-bg)',
        borderRadius: 'var(--k-r-xl)',
        border: '0.5px solid var(--k-border)',
        transition: 'all 200ms',
      }}
    >
      {label && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: 'var(--k-font-mono)',
              fontSize: '11px',
              color: 'var(--k-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            {label}
          </span>
          <Badge variant="default">{theme}</Badge>
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Button variant="solid" size="sm" icon="zap">
          Deploy
        </Button>
        <Button variant="ghost" size="sm" icon="settings">
          Settings
        </Button>
        <Button variant="danger" size="sm" icon="trash" iconOnly label="Delete" />
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <Badge variant="accent">New</Badge>
        <Badge variant="success" dot>
          Live
        </Badge>
        <Badge variant="warning">Pending</Badge>
      </div>
      <Input placeholder="Type something…" />
      <Switch checked={sw} onChange={setSw} label="Enable notifications" />
      <Card title="Card component" subtitle="Theme-aware surfaces">
        All tokens resolve from the nearest KovaTheme boundary.
      </Card>
    </div>
  );
}

export const SystemTheme: Story = {
  name: 'System (follows OS)',
  render: () => (
    <KovaTheme theme="system" storageKey={false}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <ThemeToggle showLabel />
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-text-muted)' }}>
            Follows OS — click to override
          </span>
        </div>
        <Showcase />
      </div>
    </KovaTheme>
  ),
};

export const DarkAndLight: Story = {
  name: 'Dark & Light Side-by-Side',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      <KovaTheme theme="dark" storageKey={false} style={{ padding: '2rem' } as Record<string, string>}>
        <Showcase label="Dark" />
      </KovaTheme>
      <KovaTheme theme="light" storageKey={false} style={{ padding: '2rem' } as Record<string, string>}>
        <Showcase label="Light" />
      </KovaTheme>
    </div>
  ),
};

export const RadiusScales: Story = {
  name: 'Radius — Sharp / Default / Rounded',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['sharp', 'default', 'rounded'] as const).map(r => (
        <KovaTheme key={r} theme="dark" radius={r} storageKey={false}>
          <div
            style={{
              padding: '1.5rem',
              background: 'var(--k-bg)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-xl)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--k-font-mono)',
                fontSize: '11px',
                color: 'var(--k-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              radius="{r}"
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="solid">Button</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline" icon="search" iconOnly label="search" />
              <Input placeholder="Input field" style={{ maxWidth: '200px' } as Record<string, string>} />
              <Badge variant="accent">Badge</Badge>
              <Badge variant="success" dot>
                Live
              </Badge>
            </div>
          </div>
        </KovaTheme>
      ))}
    </div>
  ),
};

export const AccentColours: Story = {
  name: 'Custom Accent Colours',
  render: () => {
    const accents = [
      { colour: '#8b5cf6', label: 'Violet (default)' },
      { colour: '#06b6d4', label: 'Cyan' },
      { colour: '#e11d48', label: 'Rose' },
      { colour: '#f97316', label: 'Orange' },
      { colour: '#10b981', label: 'Emerald' },
      { colour: '#f59e0b', label: 'Amber' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '16px' }}>
        {accents.map(({ colour, label }) => (
          <KovaTheme key={colour} theme="dark" accent={colour} storageKey={false}>
            <div
              style={{
                padding: '1.25rem',
                background: 'var(--k-bg)',
                border: '0.5px solid var(--k-border)',
                borderRadius: 'var(--k-r-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: colour,
                    flexShrink: '0' as unknown as number,
                  }}
                />
                <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '11px', color: 'var(--k-text-muted)' }}>
                  {label}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <Button variant="solid" size="sm">
                  Primary
                </Button>
                <Button variant="outline" size="sm">
                  Outline
                </Button>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success" dot>
                  Status
                </Badge>
              </div>
              <Input placeholder="Focused input…" />
            </div>
          </KovaTheme>
        ))}
      </div>
    );
  },
};

export const LivePlayground: Story = {
  name: 'Live Playground',
  render: () => {
    function Demo() {
      const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
      const [radius, setRadius] = useState<'sharp' | 'default' | 'rounded'>('default');
      const [density, setDensity] = useState<'compact' | 'default' | 'comfortable'>('default');
      const [accent, setAccent] = useState('#8b5cf6');

      const sel = (fn: (v: string) => void) => (e: Event) => fn((e.target as HTMLSelectElement).value);

      const ctrlStyle: Record<string, string> = {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
        padding: '1rem',
        background: '#18181c',
        borderRadius: '10px',
        border: '0.5px solid rgba(255,255,255,0.07)',
      };

      const labelStyle: Record<string, string> = {
        fontFamily: 'var(--k-font-display)',
        fontSize: '10px',
        fontWeight: '700',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#8b8b99',
        marginBottom: '5px',
      };

      const selectStyle: Record<string, string> = {
        height: '34px',
        padding: '0 12px',
        background: '#222228',
        border: '0.5px solid rgba(255,255,255,0.07)',
        borderRadius: '6px',
        color: '#f5f5f7',
        fontFamily: 'monospace',
        fontSize: '12px',
        cursor: 'pointer',
      };

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Controls */}
          <div style={ctrlStyle}>
            {(
              [
                ['Theme', theme, setTheme, ['dark', 'light', 'system']],
                ['Radius', radius, setRadius, ['sharp', 'default', 'rounded']],
                ['Density', density, setDensity, ['compact', 'default', 'comfortable']],
              ] as const
            ).map(([lbl, val, fn, opts]) => (
              <div key={lbl}>
                <div style={labelStyle}>{lbl}</div>
                <select value={val as string} onChange={sel(fn as (v: string) => void)} style={selectStyle}>
                  {opts.map(o => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <div style={labelStyle}>Accent</div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={accent}
                  onInput={e => setAccent((e.target as HTMLInputElement).value)}
                  style={{
                    width: '34px',
                    height: '34px',
                    padding: '2px',
                    background: '#222228',
                    border: '0.5px solid rgba(255,255,255,0.07)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                />
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#8b8b99' }}>{accent}</span>
              </div>
            </div>
          </div>

          {/* Live preview */}
          <KovaTheme theme={theme} radius={radius} density={density} accent={accent} storageKey={false}>
            <Showcase />
          </KovaTheme>
        </div>
      );
    }
    return <Demo />;
  },
};

export const ScrollbarStyles: Story = {
  name: 'Scrollbar Styles',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
      {(['styled', 'hidden', 'auto'] as const).map(s => (
        <KovaTheme key={s} theme="dark" scrollbar={s} storageKey={false}>
          <div
            style={{
              height: '180px',
              overflow: 'auto',
              background: 'var(--k-surface-1)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-lg)',
              padding: '1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--k-font-mono)',
                fontSize: '10px',
                color: 'var(--k-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '8px',
              }}
            >
              scrollbar="{s}"
            </div>
            {Array.from({ length: 14 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: '6px 0',
                  borderBottom: '0.5px solid var(--k-border)',
                  fontFamily: 'var(--k-font-mono)',
                  fontSize: '12px',
                  color: 'var(--k-text-muted)',
                }}
              >
                Row {i + 1}
              </div>
            ))}
          </div>
        </KovaTheme>
      ))}
    </div>
  ),
};

export const NestedThemes: Story = {
  name: 'Nested Boundaries',
  render: () => (
    <KovaTheme theme="light" storageKey={false}>
      <div
        style={{
          padding: '1.5rem',
          background: 'var(--k-bg)',
          borderRadius: 'var(--k-r-xl)',
          border: '0.5px solid var(--k-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--k-font-mono)',
              fontSize: '11px',
              color: 'var(--k-text-muted)',
              textTransform: 'uppercase',
            }}
          >
            Light shell
          </span>
          <ThemeToggle showLabel />
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="solid" size="sm">
            Action
          </Button>
          <Input placeholder="Search…" style={{ maxWidth: '200px' } as Record<string, string>} />
        </div>
        <KovaTheme theme="dark" radius="sharp" storageKey={false}>
          <div
            style={{
              padding: '1.25rem',
              background: 'var(--k-bg)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--k-font-mono)',
                fontSize: '10px',
                color: 'var(--k-text-subtle)',
                textTransform: 'uppercase',
              }}
            >
              Dark nested · radius="sharp"
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <Button variant="ghost" size="sm" icon="home">
                Dashboard
              </Button>
              <Button variant="solid" size="sm" icon="settings">
                Settings
              </Button>
            </div>
          </div>
        </KovaTheme>
      </div>
    </KovaTheme>
  ),
};

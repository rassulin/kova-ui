import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Button } from '../components/Button/Button';
import { Badge } from '../components/Badge/Badge';
import { Card } from '../components/Card/Card';
import { Avatar, AvatarGroup } from '../components/Avatar/Avatar';
import { Spinner } from '../components/Spinner/Spinner';

const meta: Meta = {
  title: 'kova-ui/Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# kova-ui

A dark-first Preact component library with surgical precision.

**17 components · TypeScript · 5.6 kB gzipped · zero dependencies beyond Preact**

---

## Quick start

\`\`\`bash
npm install kova-ui
\`\`\`

\`\`\`ts
// Import styles once at your app root
import 'kova-ui/styles'

// Then use components
import { Button, Card, Badge } from 'kova-ui'
\`\`\`

---

## Design tokens

All visual tokens are CSS custom properties — override any of them:

\`\`\`css
:root {
  --k-accent:       #8b5cf6;  /* violet */
  --k-cyan:         #22d3ee;  /* cyan */
  --k-font-display: 'Syne', sans-serif;
  --k-font-mono:    'DM Mono', monospace;
}
\`\`\`

---

## Tree-shaking

Import individual components to minimize bundle size:

\`\`\`ts
import { Button } from 'kova-ui/components/Button'
import { Modal }  from 'kova-ui/components/Modal'
\`\`\`

---

## React compatibility

Add one alias to your bundler:

\`\`\`ts
// vite.config.ts
resolve: {
  alias: {
    'react':     'preact/compat',
    'react-dom': 'preact/compat',
  }
}
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--k-void)',
        padding: '4rem 3rem',
        fontFamily: 'var(--k-font-display)',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--k-white)' }}>
            kova<span style={{ color: 'var(--k-accent)' }}>.</span>ui
          </div>
          <Badge variant="accent">v0.1.0</Badge>
          <Badge variant="cyan">Preact</Badge>
          <Badge variant="default">TypeScript</Badge>
        </div>
        <p
          style={{
            fontFamily: 'var(--k-font-mono)',
            fontSize: '15px',
            color: 'var(--k-muted)',
            maxWidth: '520px',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
          }}
        >
          A dark-first component library with surgical precision. 17 components, zero dependencies beyond Preact.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="solid" size="lg">
            Get started
          </Button>
          <Button variant="ghost" size="lg">
            View on npm ↗
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          gap: '0',
          marginBottom: '4rem',
          borderRadius: 'var(--k-r-lg)',
          overflow: 'hidden',
          border: '0.5px solid var(--k-border)',
          width: 'fit-content',
        }}
      >
        {[
          { val: '17', label: 'Components' },
          { val: '5.6kb', label: 'Gzipped' },
          { val: '0', label: 'Dependencies' },
          { val: '100%', label: 'TypeScript' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: '1.25rem 2rem',
              background: 'var(--k-surface-1)',
              borderRight: i < 3 ? '0.5px solid var(--k-border)' : 'none',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--k-white)' }}>
              {s.val}
            </div>
            <div
              style={{
                fontFamily: 'var(--k-font-mono)',
                fontSize: '11px',
                color: 'var(--k-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: '4px',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Component sampler grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'var(--k-border)',
          borderRadius: 'var(--k-r-xl)',
          overflow: 'hidden',
          border: '0.5px solid var(--k-border)',
          marginBottom: '4rem',
        }}
      >
        {/* Buttons */}
        <div style={{ background: 'var(--k-surface-1)', padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--k-subtle)',
              fontFamily: 'var(--k-font-mono)',
              marginBottom: '1rem',
            }}
          >
            Button
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Button variant="solid" size="sm">
              Solid
            </Button>
            <Button variant="solid-cyan" size="sm">
              Cyan
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Button variant="danger" size="sm">
              Danger
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div style={{ background: 'var(--k-surface-1)', padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--k-subtle)',
              fontFamily: 'var(--k-font-mono)',
              marginBottom: '1rem',
            }}
          >
            Badge
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <Badge variant="accent">New</Badge>
            <Badge variant="cyan" dot>
              Active
            </Badge>
            <Badge variant="success">Live</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="danger">Critical</Badge>
            <Badge variant="pink">Beta</Badge>
          </div>
        </div>

        {/* Avatar */}
        <div style={{ background: 'var(--k-surface-1)', padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--k-subtle)',
              fontFamily: 'var(--k-font-mono)',
              marginBottom: '1rem',
            }}
          >
            Avatar
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            {['Alice Chen', 'Bob Kim', 'Carol M', 'Dave P'].map(n => (
              <Avatar key={n} name={n} size="md" />
            ))}
          </div>
          <AvatarGroup
            size="sm"
            max={3}
            avatars={[
              { name: 'Alice Chen' },
              { name: 'Bob Kim' },
              { name: 'Carol M' },
              { name: 'Dave P' },
              { name: 'Eva R' },
            ]}
          />
        </div>

        {/* Progress */}
        <div style={{ background: 'var(--k-surface-1)', padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--k-subtle)',
              fontFamily: 'var(--k-font-mono)',
              marginBottom: '1rem',
            }}
          >
            Progress
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { v: 72, c: 'var(--k-accent)', glow: true },
              { v: 45, c: 'var(--k-cyan)' },
              { v: 91, c: 'var(--k-red)' },
            ].map(({ v, c, glow }) => (
              <div
                key={v}
                style={{ height: '4px', background: 'var(--k-surface-3)', borderRadius: '9999px', overflow: 'hidden' }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${v}%`,
                    background: c,
                    borderRadius: '9999px',
                    boxShadow: glow ? `0 0 8px ${c}50` : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Spinner */}
        <div style={{ background: 'var(--k-surface-1)', padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--k-subtle)',
              fontFamily: 'var(--k-font-mono)',
              marginBottom: '1rem',
            }}
          >
            Spinner
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: 'var(--k-accent)' }}>
              <Spinner size="lg" />
            </span>
            <span style={{ color: 'var(--k-cyan)' }}>
              <Spinner size="md" />
            </span>
            <span style={{ color: 'var(--k-green)' }}>
              <Spinner size="sm" />
            </span>
            <span style={{ color: 'var(--k-pink)' }}>
              <Spinner size="xs" />
            </span>
          </div>
        </div>

        {/* Card preview */}
        <div style={{ background: 'var(--k-surface-1)', padding: '1.5rem' }}>
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--k-subtle)',
              fontFamily: 'var(--k-font-mono)',
              marginBottom: '1rem',
            }}
          >
            Card
          </div>
          <Card title="Deployment #427" subtitle="Pushed 2 min ago">
            <Badge variant="success" dot>
              Live
            </Badge>
          </Card>
        </div>
      </div>

      {/* Quick install */}
      <div
        style={{
          background: 'var(--k-surface-1)',
          border: '0.5px solid var(--k-border)',
          borderRadius: 'var(--k-r-xl)',
          padding: '2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(139,92,246,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--k-font-mono)',
            fontSize: '13px',
            color: 'var(--k-muted)',
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          Get started in one command
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--k-surface-2)',
            border: '0.5px solid var(--k-border)',
            borderRadius: 'var(--k-r-lg)',
            padding: '0.875rem 1.5rem',
            fontFamily: 'var(--k-font-mono)',
            fontSize: '15px',
            color: 'var(--k-white)',
            marginBottom: '1.5rem',
            position: 'relative',
          }}
        >
          <span style={{ color: 'var(--k-accent-light)' }}>$</span> npm install kova-ui
        </div>
        <div
          style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-subtle)', position: 'relative' }}
        >
          Then: <span style={{ color: 'var(--k-cyan)' }}>import 'kova-ui/styles'</span> once at your app root.
        </div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Grid, Stack, Progress, Skeleton, Divider, Kbd, Code } from './Grid';
import { Card } from '../Card/Card';

const meta: Meta = {
  title: 'Components/Layout & Utilities',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Layout primitives and utility components: **Grid**, **Stack**, **Progress**, **Skeleton**, **Divider**, **Kbd**, **Code**.

\`\`\`ts
import { Grid, Stack, Progress, Skeleton, Divider, Kbd, Code } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GridLayout: Story = {
  name: 'Grid',
  render: () => (
    <Grid cols={3} gap={16}>
      {['Button', 'Badge', 'Card', 'Input', 'Modal', 'Toast'].map(name => (
        <Card key={name} title={name}>
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-subtle)' }}>
            Component
          </span>
        </Card>
      ))}
    </Grid>
  ),
};

export const GridAuto: Story = {
  name: 'Grid — Auto-fit',
  render: () => (
    <Grid cols="auto" gap={16}>
      {['A', 'B', 'C', 'D'].map(l => (
        <div
          key={l}
          style={{
            background: 'var(--k-surface-2)',
            border: '0.5px solid var(--k-border)',
            borderRadius: 'var(--k-r-lg)',
            padding: '1.5rem',
            textAlign: 'center',
            fontFamily: 'var(--k-font-display)',
            fontWeight: 700,
            color: 'var(--k-accent)',
            fontSize: '20px',
          }}
        >
          {l}
        </div>
      ))}
    </Grid>
  ),
};

export const StackLayout: Story = {
  name: 'Stack (Row & Column)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Stack direction="row" gap={12}>
        {['One', 'Two', 'Three'].map(l => (
          <div
            key={l}
            style={{
              background: 'var(--k-surface-2)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-md)',
              padding: '10px 20px',
              fontFamily: 'var(--k-font-display)',
              fontSize: '13px',
              color: 'var(--k-white)',
            }}
          >
            {l}
          </div>
        ))}
      </Stack>
      <Stack direction="column" gap={8}>
        {['Alpha', 'Beta', 'Gamma'].map(l => (
          <div
            key={l}
            style={{
              background: 'var(--k-surface-2)',
              border: '0.5px solid var(--k-border)',
              borderRadius: 'var(--k-r-md)',
              padding: '10px 20px',
              fontFamily: 'var(--k-font-display)',
              fontSize: '13px',
              color: 'var(--k-white)',
            }}
          >
            {l}
          </div>
        ))}
      </Stack>
    </div>
  ),
};

export const ProgressBars: Story = {
  name: 'Progress',
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {[
        { label: 'CPU', value: 72, glow: true, color: 'var(--k-accent)' },
        { label: 'Memory', value: 45, color: 'var(--k-cyan)' },
        { label: 'Storage', value: 91, color: 'var(--k-red)' },
        { label: 'Network', value: 28, color: 'var(--k-green)' },
      ].map(({ label, value, glow, color }) => (
        <div key={label}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '6px',
              fontFamily: 'var(--k-font-mono)',
              fontSize: '11px',
              color: 'var(--k-muted)',
            }}
          >
            <span>{label}</span>
            <span>{value}%</span>
          </div>
          <div class="k-progress" style={{ '--bar-color': color } as any}>
            <div
              class="k-progress-bar"
              style={{ width: `${value}%`, background: color, boxShadow: glow ? `0 0 8px ${color}40` : 'none' }}
            />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SkeletonLoader: Story = {
  name: 'Skeleton',
  render: () => (
    <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Skeleton width={48} height={48} circle />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton height={14} width="60%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>
      <Skeleton height={120} />
      <div style={{ display: 'flex', gap: '8px' }}>
        <Skeleton height={28} width={80} />
        <Skeleton height={28} width={60} />
      </div>
    </div>
  ),
};

export const Utilities: Story = {
  name: 'Kbd, Code, Divider',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: 'var(--k-font-display)',
        fontSize: '14px',
        color: 'var(--k-muted)',
        lineHeight: 2.2,
      }}
    >
      <div>
        Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open the command palette
      </div>
      <div>
        Press <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> to open settings
      </div>
      <Divider />
      <div>
        Run <Code>npm install kova-ui</Code> to get started
      </div>
      <div>
        Import with <Code>{'import { Button } from "kova-ui"'}</Code>
      </div>
      <Divider />
      <Code block>{`import { Button, Card } from 'kova-ui'
import 'kova-ui/styles'

function App() {
  return (
    <Card title="Hello kova-ui">
      <Button variant="solid">Click me</Button>
    </Card>
  )
}`}</Code>
    </div>
  ),
};

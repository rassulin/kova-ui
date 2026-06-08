import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Badge** is a compact label for status, categories, and counts.

\`\`\`ts
import { Badge } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'cyan', 'success', 'warning', 'danger', 'pink'],
    },
    dot: { control: 'boolean' },
  },
} as Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <Badge {...args}>Badge</Badge>,
  args: { variant: 'default', dot: false },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="pink">Pink</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  name: 'With Dot',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="danger" dot>
        Critical
      </Badge>
      <Badge variant="warning" dot>
        Degraded
      </Badge>
      <Badge variant="cyan" dot>
        Beta
      </Badge>
    </div>
  ),
};

export const InContext: Story = {
  name: 'In Context',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--k-font-display)' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--k-white)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        Deployment #427{' '}
        <Badge variant="success" dot>
          Live
        </Badge>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--k-white)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        Feature flags <Badge variant="cyan">Beta</Badge>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--k-white)',
          fontSize: '14px',
          fontWeight: 600,
        }}
      >
        Memory usage{' '}
        <Badge variant="danger" dot>
          91%
        </Badge>
      </div>
    </div>
  ),
};

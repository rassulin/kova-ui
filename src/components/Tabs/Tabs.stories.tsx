import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Tabs } from './Tabs';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Tabs** switches between panels. Two variants: \`pill\` (default) and \`line\` (underline).

\`\`\`ts
import { Tabs } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['pill', 'line'] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const demoTabs = [
  {
    key: 'overview',
    label: 'Overview',
    content: (
      <p style={{ color: 'var(--k-muted)', fontFamily: 'var(--k-font-mono)', fontSize: '13px' }}>
        Overview panel — metrics, summary, charts.
      </p>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    content: (
      <p style={{ color: 'var(--k-muted)', fontFamily: 'var(--k-font-mono)', fontSize: '13px' }}>
        Settings panel — configure your workspace.
      </p>
    ),
  },
  {
    key: 'logs',
    label: 'Logs',
    content: (
      <p style={{ color: 'var(--k-muted)', fontFamily: 'var(--k-font-mono)', fontSize: '13px' }}>
        Logs panel — real-time build output.
      </p>
    ),
  },
];

export const Pill: Story = {
  name: 'Pill (default)',
  render: () => (
    <div style={{ width: '480px' }}>
      <Tabs tabs={demoTabs} defaultKey="overview" />
    </div>
  ),
};

export const Line: Story = {
  name: 'Line Variant',
  render: () => (
    <div style={{ width: '480px' }}>
      <Tabs tabs={demoTabs} variant="line" defaultKey="overview" />
    </div>
  ),
};

export const WithBadgeLabels: Story = {
  name: 'With Badge Labels',
  render: () => (
    <div style={{ width: '480px' }}>
      <Tabs
        tabs={[
          {
            key: 'open',
            label: (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Open <Badge variant="accent">12</Badge>
              </span>
            ),
            content: (
              <p style={{ color: 'var(--k-muted)', fontFamily: 'var(--k-font-mono)', fontSize: '13px' }}>
                12 open issues.
              </p>
            ),
          },
          {
            key: 'closed',
            label: (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Closed <Badge variant="default">84</Badge>
              </span>
            ),
            content: (
              <p style={{ color: 'var(--k-muted)', fontFamily: 'var(--k-font-mono)', fontSize: '13px' }}>
                84 closed issues.
              </p>
            ),
          },
        ]}
        defaultKey="open"
      />
    </div>
  ),
};

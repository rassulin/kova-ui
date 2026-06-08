import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Card } from './Card';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Card** is a surface container with optional title, subtitle, footer, and a subtle spotlight hover effect.

\`\`\`ts
import { Card } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Card title="Deployment #427" subtitle="Pushed 2 minutes ago">
        Production build completed successfully in 43s. All 312 tests passed.
      </Card>
    </div>
  ),
};

export const WithFooter: Story = {
  name: 'With Footer',
  render: () => (
    <div style={{ width: '360px' }}>
      <Card
        title="kova-ui"
        subtitle="Component library"
        footer={
          <>
            <Badge variant="success" dot>
              v0.1.0
            </Badge>
            <Button size="sm" variant="ghost" style={{ marginLeft: 'auto' }}>
              View repo
            </Button>
          </>
        }
      >
        A dark-first Preact component library. 17 components, 5.6 kB gzipped.
      </Card>
    </div>
  ),
};

export const Glow: Story = {
  name: 'Glow Variant',
  render: () => (
    <div style={{ width: '360px' }}>
      <Card glow title="Pro plan" subtitle="Unlimited everything">
        Access all components, priority support, and early access to new releases.
      </Card>
    </div>
  ),
};

export const Grid: Story = {
  name: 'Card Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '760px' }}>
      {[
        { title: 'Total deploys', value: '1,284', badge: { variant: 'cyan' as const, label: 'This month' } },
        { title: 'Uptime', value: '99.98%', badge: { variant: 'success' as const, label: 'Last 90 days' } },
        { title: 'Error rate', value: '0.02%', badge: { variant: 'success' as const, label: 'p95' } },
      ].map(({ title, value, badge }) => (
        <Card key={title} title={title} subtitle={badge.label}>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--k-white)',
              marginTop: '8px',
            }}
          >
            {value}
          </div>
        </Card>
      ))}
    </div>
  ),
};

export const WithAvatar: Story = {
  name: 'Profile Card',
  render: () => (
    <div style={{ width: '300px' }}>
      <Card
        footer={
          <Button size="sm" variant="outline" style={{ width: '100%', justifyContent: 'center' }}>
            Follow
          </Button>
        }
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', textAlign: 'center' }}
        >
          <Avatar name="Rustam N" size="xl" />
          <div>
            <div
              style={{
                fontFamily: 'var(--k-font-display)',
                fontWeight: 700,
                color: 'var(--k-white)',
                fontSize: '16px',
              }}
            >
              Rustam N.
            </div>
            <div
              style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-muted)', marginTop: '4px' }}
            >
              Frontend Engineer
            </div>
          </div>
          <Badge variant="accent">kova-ui author</Badge>
        </div>
      </Card>
    </div>
  ),
};

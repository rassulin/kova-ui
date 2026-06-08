import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Tooltip** wraps any element and shows a label on hover or focus. Four placements, each with its own entrance animation.

\`\`\`ts
import { Tooltip } from 'kova-ui'

<Tooltip content="Copy to clipboard" placement="top">
  <Button>Hover me</Button>
</Tooltip>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Text shown inside the tooltip',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side the tooltip appears on',
    },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default — fully controlled by the args panel
export const Default: Story = {
  render: ({ content, placement }) => (
    <Tooltip content={content} placement={placement}>
      <Button variant="ghost">Hover me</Button>
    </Tooltip>
  ),
};

// All four placements side by side
export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', padding: '56px' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map(p => (
        <Tooltip key={p} content={`placement="${p}"`} placement={p}>
          <Button variant="ghost" size="sm" style={{ width: '100%' }}>
            {p}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const OnAnyElement: Story = {
  name: 'On Any Element',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="12 open issues" placement="top">
        <Badge variant="warning">Issues</Badge>
      </Tooltip>
      <Tooltip content="Click to deploy to production" placement="top">
        <Button variant="solid" size="sm">
          Deploy
        </Button>
      </Tooltip>
      <Tooltip content="Read-only access" placement="bottom">
        <Badge variant="default">Viewer</Badge>
      </Tooltip>
    </div>
  ),
};

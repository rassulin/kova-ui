import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Spinner** is a pure CSS loading indicator. Five sizes, inherits color from parent.

\`\`\`ts
import { Spinner } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} as Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <Spinner {...args} />,
  args: { size: 'md' },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Spinner size={size} />
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '10px', color: 'var(--k-muted)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const ColorInheritance: Story = {
  name: 'Color Inheritance',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <span style={{ color: 'var(--k-accent)' }}>
        <Spinner size="lg" />
      </span>
      <span style={{ color: 'var(--k-cyan)' }}>
        <Spinner size="lg" />
      </span>
      <span style={{ color: 'var(--k-green)' }}>
        <Spinner size="lg" />
      </span>
      <span style={{ color: 'var(--k-red)' }}>
        <Spinner size="lg" />
      </span>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Avatar, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Avatar** renders initials with a deterministic color from the name, or an image. **AvatarGroup** stacks them with overflow count.

\`\`\`ts
import { Avatar, AvatarGroup } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    name: { control: 'text' },
    src: { control: 'text' },
  },
} as Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => <Avatar {...args} />,
  args: { name: 'Rustam N', size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Avatar key={size} name="Rustam N" size={size} />
      ))}
    </div>
  ),
};

export const DifferentNames: Story = {
  name: 'Deterministic Colors',
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      {['Alice Chen', 'Bob Kim', 'Carol Muñoz', 'Dave Park', 'Eva Rossi', 'Frank Li'].map(name => (
        <Avatar key={name} name={name} size="md" />
      ))}
    </div>
  ),
};

export const Group: Story = {
  name: 'AvatarGroup',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <AvatarGroup
        size="md"
        max={4}
        avatars={[
          { name: 'Alice Chen' },
          { name: 'Bob Kim' },
          { name: 'Carol Muñoz' },
          { name: 'Dave Park' },
          { name: 'Eva Rossi' },
          { name: 'Frank Li' },
        ]}
      />
      <AvatarGroup
        size="sm"
        max={3}
        avatars={[
          { name: 'Alice Chen' },
          { name: 'Bob Kim' },
          { name: 'Carol Muñoz' },
          { name: 'Dave Park' },
          { name: 'Eva Rossi' },
        ]}
      />
    </div>
  ),
};

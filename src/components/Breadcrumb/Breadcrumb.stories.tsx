import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Breadcrumb** renders a navigational trail. The last item is always the current page (non-linked, bold).

\`\`\`ts
import { Breadcrumb } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    separator: { control: 'text', description: 'Character between items' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { separator: '/' },
  render: args => (
    <Breadcrumb
      separator={args.separator}
      items={[{ label: 'Home', href: '#' }, { label: 'Projects', href: '#' }, { label: 'kova-ui' }]}
    />
  ),
};

export const CustomSeparator: Story = {
  name: 'Custom Separator',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Breadcrumb
        separator="›"
        items={[{ label: 'Dashboard', href: '#' }, { label: 'Settings', href: '#' }, { label: 'Security' }]}
      />
      <Breadcrumb
        separator="·"
        items={[{ label: 'Docs', href: '#' }, { label: 'Components', href: '#' }, { label: 'Breadcrumb' }]}
      />
      <Breadcrumb
        separator="→"
        items={[{ label: 'Home', href: '#' }, { label: 'Blog', href: '#' }, { label: 'kova-ui launch' }]}
      />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Select** is a styled native \`<select>\` with a custom chevron indicator.

\`\`\`ts
import { Select } from 'kova-ui'
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
    <div style={{ width: '280px' }}>
      <Select
        label="Framework"
        placeholder="Choose one..."
        options={[
          { value: 'preact', label: 'Preact' },
          { value: 'react', label: 'React' },
          { value: 'solid', label: 'Solid.js' },
          { value: 'vue', label: 'Vue 3' },
          { value: 'svelte', label: 'Svelte' },
        ]}
      />
    </div>
  ),
};

export const WithError: Story = {
  name: 'With Error',
  render: () => (
    <div style={{ width: '280px' }}>
      <Select
        label="Region"
        error="Please select a region."
        options={[
          { value: 'us-east', label: 'US East' },
          { value: 'eu-west', label: 'EU West' },
          { value: 'ap-sea', label: 'AP Southeast' },
        ]}
      />
    </div>
  ),
};

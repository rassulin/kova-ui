import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Input, Textarea } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Input** and **Textarea** are the core form primitives. Supports labels, hints, errors, and prefix/suffix slots.

\`\`\`ts
import { Input, Textarea } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
} as Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <div style={{ width: '320px' }}>
      <Input {...args} />
    </div>
  ),
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email' },
};

export const WithHint: Story = {
  name: 'With Hint',
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Username" placeholder="rustam_n" hint="Letters, numbers and underscores only." />
    </div>
  ),
};

export const WithError: Story = {
  name: 'With Error',
  render: () => (
    <div style={{ width: '320px' }}>
      <Input label="Password" type="password" value="abc" error="Must be at least 8 characters." />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium (default)" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export const WithPrefixSuffix: Story = {
  name: 'Prefix & Suffix',
  render: () => (
    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Input label="Search" placeholder="Search components..." prefix={<SearchIcon />} />
      <Input
        label="Domain"
        placeholder="my-app"
        suffix={
          <span style={{ color: 'var(--k-muted)', fontFamily: 'var(--k-font-mono)', fontSize: '12px' }}>
            .vercel.app
          </span>
        }
      />
    </div>
  ),
};

export const TextareaStory: Story = {
  name: 'Textarea',
  render: () => (
    <div style={{ width: '360px' }}>
      <Textarea label="Bio" placeholder="Tell us about yourself..." hint="Max 500 characters." rows={5} />
    </div>
  ),
};

export const FullForm: Story = {
  name: 'Form Example',
  render: () => (
    <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input label="First name" placeholder="Rustam" />
        <Input label="Last name" placeholder="N." />
      </div>
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" hint="Min 8 characters." />
      <Textarea label="Notes" placeholder="Anything else?" rows={3} />
    </div>
  ),
};

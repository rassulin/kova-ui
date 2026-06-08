import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { SpriteSheet } from '../Icon/Icon';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story: () => h.JSX.Element) => <><SpriteSheet /><Story /></>,
  ],
  parameters: {
    docs: {
      description: {
        component: '**Button** — five variants, five sizes, leading/trailing icon support, loading state.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['solid', 'solid-cyan', 'ghost', 'outline', 'danger', 'success'] },
    size:    { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: '10px', alignItems: 'center' };

export const Default: Story = {
  render: args => <Button {...args}>Launch</Button>,
  args: { variant: 'solid', size: 'md' },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={row}>
      <Button variant="solid">Solid</Button>
      <Button variant="solid-cyan">Cyan</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={row}>
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  name: 'Leading Icon',
  render: () => (
    <div style={row}>
      <Button variant="solid"   icon="download">Download</Button>
      <Button variant="ghost"   icon="search">Search</Button>
      <Button variant="outline" icon="plus">New item</Button>
      <Button variant="danger"  icon="trash">Delete</Button>
      <Button variant="success" icon="check">Confirm</Button>
    </div>
  ),
};

export const WithTrailingIcon: Story = {
  name: 'Trailing Icon',
  render: () => (
    <div style={row}>
      <Button variant="solid"   iconRight="arrow-right">Continue</Button>
      <Button variant="ghost"   iconRight="external-link">Open docs</Button>
      <Button variant="outline" iconRight="chevron-down">Options</Button>
    </div>
  ),
};

export const BothIcons: Story = {
  name: 'Both Icons',
  render: () => (
    <div style={row}>
      <Button variant="solid" icon="git-branch" iconRight="chevron-down">main</Button>
      <Button variant="ghost" icon="filter" iconRight="chevron-down">Filter</Button>
    </div>
  ),
};

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => (
    <div style={row}>
      <Button variant="ghost"   icon="search"        iconOnly label="Search" size="sm" />
      <Button variant="ghost"   icon="settings"      iconOnly label="Settings" size="sm" />
      <Button variant="ghost"   icon="more-vertical" iconOnly label="More" size="sm" />
      <Button variant="outline" icon="edit"          iconOnly label="Edit" />
      <Button variant="danger"  icon="trash"         iconOnly label="Delete" />
      <Button variant="solid"   icon="plus"          iconOnly label="Add" size="lg" />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={row}>
      <Button variant="solid"   loading>Deploying...</Button>
      <Button variant="ghost"   loading icon="download">Downloading</Button>
      <Button variant="outline" loading>Processing</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={row}>
      <Button variant="solid"  disabled icon="check">Confirm</Button>
      <Button variant="ghost"  disabled>Cancel</Button>
      <Button variant="danger" disabled icon="trash" iconOnly label="Delete" />
    </div>
  ),
};

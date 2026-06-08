import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Menu } from './Menu';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Menu** is a dropdown triggered by any element. Closes on outside click or item selection.

\`\`\`ts
import { Menu } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  >
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const CopyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
  </svg>
);

const defaultItems = [
  { key: 'label', type: 'label' as const, label: 'Actions' },
  { key: 'edit', label: 'Edit', icon: <EditIcon /> },
  { key: 'copy', label: 'Duplicate', icon: <CopyIcon /> },
  { key: 'sep', type: 'separator' as const, label: '' },
  { key: 'del', label: 'Delete', icon: <TrashIcon />, danger: true },
];

export const Default: Story = {
  render: () => <Menu trigger={<Button variant="ghost">Options ▾</Button>} items={defaultItems} />,
};

export const AlignRight: Story = {
  name: 'Align Right',
  render: () => (
    <Menu
      trigger={
        <Button variant="solid" size="sm">
          Actions ▾
        </Button>
      }
      items={defaultItems}
      align="right"
    />
  ),
};

export const ThreeDot: Story = {
  name: 'Icon Trigger',
  render: () => (
    <Menu
      trigger={
        <Button variant="ghost" iconOnly>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </Button>
      }
      items={defaultItems}
      align="right"
    />
  ),
};

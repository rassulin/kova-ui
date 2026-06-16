import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Accordion** animates panel height. Supports single-open (default) or \`multiple\` mode.

\`\`\`ts
import { Accordion } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    multiple: { control: 'boolean', description: 'Allow multiple panels open at once' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const faqItems = [
  {
    key: 'q1',
    title: 'What is kova-ui?',
    content: 'A dark-first Preact component library. 17 components, zero dependencies beyond Preact, 5.6 kB gzipped.',
  },
  {
    key: 'q2',
    title: 'Is it tree-shakeable?',
    content: 'Yes. Import only what you use and only that module ends up in your bundle.',
  },
  {
    key: 'q3',
    title: 'Can I use it with React?',
    content: 'Yes — add alias: { react: "preact/compat" } to your bundler config.',
  },
  {
    key: 'q4',
    title: 'How do I customise the theme?',
    content: 'Override CSS custom properties on :root. Every visual token is a variable.',
  },
];

export const Default: Story = {
  args: { multiple: false },
  render: args => (
    <div style={{ width: '520px' }}>
      <Accordion items={faqItems} defaultOpen={['q1']} multiple={args.multiple} />
    </div>
  ),
};

export const Multiple: Story = {
  name: 'Multiple Open',
  render: () => (
    <div style={{ width: '520px' }}>
      <Accordion items={faqItems} multiple defaultOpen={['q1', 'q2']} />
    </div>
  ),
};

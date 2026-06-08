import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { Icon, SpriteSheet, type IconName } from './Icon';

const ALL_ICONS: IconName[] = [
  'arrow-left', 'arrow-right', 'arrow-up', 'arrow-down',
  'chevron-left', 'chevron-right', 'chevron-up', 'chevron-down',
  'external-link', 'home',
  'plus', 'minus', 'x', 'check', 'search', 'filter', 'sort',
  'refresh', 'download', 'upload', 'copy', 'edit', 'trash', 'save', 'share',
  'info', 'warning', 'check-circle', 'x-circle', 'loader',
  'menu', 'more-vertical', 'more-horizontal', 'settings', 'bell',
  'calendar', 'clock', 'eye', 'eye-off', 'lock', 'unlock',
  'file', 'folder', 'image', 'link', 'mail', 'user', 'users',
  'tag', 'star', 'heart',
  'code', 'terminal', 'git-branch', 'zap', 'shield', 'globe', 'database', 'server',
];

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Icon** renders SVG symbols from the kova-ui sprite sheet via \`<use href="#k-icon-name" />\`.

Mount \`<SpriteSheet />\` once at your app root, then use \`<Icon>\` anywhere:

\`\`\`tsx
import { SpriteSheet, Icon } from 'kova-ui'

// App root
function App() {
  return <><SpriteSheet /><YourApp /></>
}

// Anywhere in the tree
<Icon name="check" size="md" />                    // decorative (aria-hidden)
<Icon name="trash" size="sm" label="Delete item" /> // meaningful (aria-label)
<Icon name="loader" class="k-icon-spin" />          // spinning
\`\`\`
        `,
      },
    },
  },
  decorators: [
    (Story: () => h.JSX.Element) => <><SpriteSheet /><Story /></>,
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  name: 'All Icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {ALL_ICONS.map(name => (
        <div key={name} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          padding: '14px 10px', minWidth: '80px',
          borderRadius: 'var(--k-r-md)', border: '0.5px solid var(--k-border)',
          background: 'var(--k-surface-1)',
        }}>
          <Icon name={name} size="lg" />
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '10px', color: 'var(--k-text-subtle)', textAlign: 'center', lineHeight: 1.3 }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name="zap" size={size} />
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '11px', color: 'var(--k-text-muted)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Colours: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      {[
        ['default', 'star', ''],
        ['accent',  'zap',  'k-icon-accent'],
        ['muted',   'settings', 'k-icon-muted'],
        ['success', 'check-circle', 'k-icon-success'],
        ['warning', 'warning', 'k-icon-warning'],
        ['danger',  'x-circle', 'k-icon-danger'],
        ['cyan',    'globe', 'k-icon-cyan'],
      ].map(([label, icon, cls]) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name={icon as IconName} size="xl" class={cls} />
          <span style={{ fontFamily: 'var(--k-font-mono)', fontSize: '11px', color: 'var(--k-text-muted)' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const Spinning: Story = {
  name: 'Spinning Loader',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <Icon key={size} name="loader" size={size} class="k-icon-spin k-icon-accent" />
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Switch** is a toggle input that glows with the accent color when checked.

\`\`\`ts
import { Switch } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ checked, disabled, label = 'Enabled' }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Switch checked={checked} onChange={val => (checked = val)} disabled={disabled} label={label} />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <Switch checked={false} label="Off" />
      <Switch checked={true} label="On" />
      <Switch checked={false} label="Disabled off" disabled />
      <Switch checked={true} label="Disabled on" disabled />
    </div>
  ),
};

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => {
    function Demo() {
      const [state, setState] = useState({ notify: true, darkMode: true, analytics: false, beta: false });
      const toggle = (key: keyof typeof state) => setState(s => ({ ...s, [key]: !s[key] }));
      return (
        <div style={{ width: '320px' }}>
          {(['notify', 'darkMode', 'analytics', 'beta'] as const).map(key => (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 0',
                borderBottom: '0.5px solid var(--k-border)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--k-font-display)',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--k-white)',
                }}
              >
                {
                  {
                    notify: 'Email notifications',
                    darkMode: 'Dark mode',
                    analytics: 'Usage analytics',
                    beta: 'Beta features',
                  }[key]
                }
              </span>
              <Switch checked={state[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      );
    }
    return <Demo />;
  },
};

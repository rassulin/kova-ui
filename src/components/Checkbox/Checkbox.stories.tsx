import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Checkbox** with three states: unchecked, checked, and indeterminate.

\`\`\`tsx
import { Checkbox, CheckboxGroup } from 'kova-ui'

<Checkbox checked={val} onChange={setVal} label="Accept terms" />

// Indeterminate — select all pattern
<Checkbox
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={handleSelectAll}
  label="Select all"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const col = (gap = 12) => ({ display: 'flex', flexDirection: 'column' as const, gap: `${gap}px` });

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    size: 'md',
    disabled: false,
    indeterminate: false,
  },
  render: args => {
    function Demo() {
      const [checked, setChecked] = useState(args.checked ?? false);
      useEffect(() => {
        setChecked(args.checked ?? false);
      }, [args.checked]);
      return <Checkbox {...args} checked={checked} onChange={setChecked} />;
    }
    return <Demo />;
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={col()}>
      <Checkbox checked={false} label="Unchecked" />
      <Checkbox checked={true} label="Checked" />
      <Checkbox checked={false} indeterminate label="Indeterminate" />
      <Checkbox checked={false} label="Disabled unchecked" disabled />
      <Checkbox checked={true} label="Disabled checked" disabled />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={col(14)}>
      {(['sm', 'md', 'lg'] as const).map(size => (
        <Checkbox key={size} checked size={size} label={`Size: ${size}`} />
      ))}
    </div>
  ),
};

export const WithDescription: Story = {
  name: 'With Description',
  render: () => {
    function Demo() {
      const [vals, setVals] = useState({ email: true, sms: false, push: false });
      return (
        <div style={col(14)}>
          <Checkbox
            checked={vals.email}
            onChange={v => setVals(s => ({ ...s, email: v }))}
            label="Email notifications"
            description="Receive updates about your account and deployments."
          />
          <Checkbox
            checked={vals.sms}
            onChange={v => setVals(s => ({ ...s, sms: v }))}
            label="SMS alerts"
            description="Critical alerts only. Standard rates may apply."
          />
          <Checkbox
            checked={vals.push}
            onChange={v => setVals(s => ({ ...s, push: v }))}
            label="Push notifications"
            description="Requires the mobile app to be installed."
            disabled
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const IndeterminateSelectAll: Story = {
  name: 'Indeterminate — Select All',
  render: () => {
    function Demo() {
      const items = ['Dashboard', 'Analytics', 'Reports', 'Settings'];
      const [selected, setSelected] = useState<string[]>(['Dashboard']);

      const allSelected = selected.length === items.length;
      const someSelected = selected.length > 0 && !allSelected;

      function toggleAll() {
        setSelected(allSelected ? [] : [...items]);
      }
      function toggle(item: string) {
        setSelected(s => (s.includes(item) ? s.filter(i => i !== item) : [...s, item]));
      }

      return (
        <div
          style={{
            width: '280px',
            border: '0.5px solid var(--k-border)',
            borderRadius: 'var(--k-r-lg)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '10px 14px',
              background: 'var(--k-surface-2)',
              borderBottom: '0.5px solid var(--k-border)',
            }}
          >
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={toggleAll}
              label="Select all pages"
            />
          </div>
          {items.map(item => (
            <div key={item} style={{ padding: '10px 14px', borderBottom: '0.5px solid var(--k-border)' }}>
              <Checkbox checked={selected.includes(item)} onChange={() => toggle(item)} label={item} />
            </div>
          ))}
          <div
            style={{
              padding: '8px 14px',
              background: 'var(--k-surface-2)',
              fontFamily: 'var(--k-font-mono)',
              fontSize: '11px',
              color: 'var(--k-text-muted)',
            }}
          >
            {selected.length} of {items.length} selected
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const Group: Story = {
  name: 'CheckboxGroup',
  render: () => {
    function Demo() {
      const [vals, setVals] = useState<string[]>(['email']);
      return (
        <div style={col(16)}>
          <CheckboxGroup
            label="Notification channels"
            value={vals}
            onChange={setVals}
            options={[
              { value: 'email', label: 'Email', description: 'Account and deployment updates' },
              { value: 'sms', label: 'SMS', description: 'Critical alerts only' },
              { value: 'slack', label: 'Slack', description: 'Connect your workspace first' },
              { value: 'push', label: 'Push (mobile)', disabled: true },
            ]}
          />
          <div
            style={{
              fontFamily: 'var(--k-font-mono)',
              fontSize: '12px',
              color: 'var(--k-text-muted)',
              padding: '8px 12px',
              background: 'var(--k-surface-2)',
              borderRadius: 'var(--k-r-md)',
            }}
          >
            Selected: {vals.join(', ') || 'none'}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const GroupHorizontal: Story = {
  name: 'CheckboxGroup — Horizontal',
  render: () => {
    function Demo() {
      const [vals, setVals] = useState<string[]>(['read']);
      return (
        <CheckboxGroup
          label="Permissions"
          direction="horizontal"
          value={vals}
          onChange={setVals}
          options={[
            { value: 'read', label: 'Read' },
            { value: 'write', label: 'Write' },
            { value: 'delete', label: 'Delete' },
            { value: 'admin', label: 'Admin', disabled: true },
          ]}
        />
      );
    }
    return <Demo />;
  },
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**DatePicker** is a fully keyboard-accessible date picker with month navigation, min/max constraints, and Today/Clear shortcuts.

\`\`\`ts
import { DatePicker } from 'kova-ui'

const [date, setDate] = useState<Date | null>(null)

<DatePicker
  label="Due date"
  value={date}
  onChange={setDate}
  format="YYYY-MM-DD"
/>
\`\`\`

### Formats
Any combination of \`YYYY\`, \`MM\`, \`DD\` — e.g. \`DD/MM/YYYY\`, \`MM-DD-YYYY\`.
        `,
      },
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [date, setDate] = useState<Date | null>(null);
      return (
        <div style={{ width: '280px' }}>
          <DatePicker
            label="Select date"
            value={date}
            onChange={setDate}
            hint={date ? `Selected: ${date.toDateString()}` : 'Click to open calendar'}
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithInitialValue: Story = {
  name: 'With Initial Value',
  render: () => {
    function Demo() {
      const [date, setDate] = useState<Date | null>(new Date());
      return (
        <div style={{ width: '280px' }}>
          <DatePicker label="Start date" value={date} onChange={setDate} />
        </div>
      );
    }
    return <Demo />;
  },
};

export const CustomFormat: Story = {
  name: 'Custom Formats',
  render: () => {
    function Demo() {
      const [d1, setD1] = useState<Date | null>(null);
      const [d2, setD2] = useState<Date | null>(null);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '280px' }}>
          <DatePicker label="DD/MM/YYYY" format="DD/MM/YYYY" value={d1} onChange={setD1} placeholder="dd/mm/yyyy" />
          <DatePicker label="MM-DD-YYYY" format="MM-DD-YYYY" value={d2} onChange={setD2} placeholder="mm-dd-yyyy" />
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithConstraints: Story = {
  name: 'Min / Max Dates',
  render: () => {
    function Demo() {
      const [date, setDate] = useState<Date | null>(null);
      const today = new Date();
      const min = new Date(today.getFullYear(), today.getMonth(), 1);
      const max = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return (
        <div style={{ width: '280px' }}>
          <DatePicker
            label="This month only"
            value={date}
            onChange={setDate}
            minDate={min}
            maxDate={max}
            hint="Only dates in the current month are selectable"
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const WithError: Story = {
  name: 'Error State',
  render: () => (
    <div style={{ width: '280px' }}>
      <DatePicker label="Due date" error="Please select a date." />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: '280px' }}>
      <DatePicker label="Locked date" value={new Date()} disabled hint="This field is read-only" />
    </div>
  ),
};

export const DateRange: Story = {
  name: 'Date Range (two pickers)',
  render: () => {
    function Demo() {
      const [start, setStart] = useState<Date | null>(null);
      const [end, setEnd] = useState<Date | null>(null);
      return (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: '240px' }}>
            <DatePicker
              label="Start date"
              value={start}
              onChange={d => {
                setStart(d);
                if (end && d > end) setEnd(null);
              }}
              maxDate={end ?? undefined}
            />
          </div>
          <div style={{ width: '240px' }}>
            <DatePicker label="End date" value={end} onChange={setEnd} minDate={start ?? undefined} />
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

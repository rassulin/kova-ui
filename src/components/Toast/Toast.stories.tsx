import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useToast } from './Toast';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Toast** uses the \`useToast()\` hook. Mount \`<Container />\` once at your app root.

\`\`\`ts
import { useToast } from 'kova-ui'

function App() {
  const { success, error, warning, info, Container } = useToast({ position: 'tr' })
  return (
    <>
      <Container />
      <button onClick={() => success('Done!', 'Saved.')}>Save</button>
    </>
  )
}
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTypes: Story = {
  name: 'All Types',
  render: () => {
    function Demo() {
      const { success, error, warning, info, Container } = useToast({ position: 'tr' });
      return (
        <>
          <Container />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button variant="success" onClick={() => success('Deployed!', 'Your app is live.')}>
              Success
            </Button>
            <Button variant="danger" onClick={() => error('Build failed', 'Check your logs.')}>
              Error
            </Button>
            <Button variant="ghost" onClick={() => warning('Slow response', 'P95 latency exceeded 800ms.')}>
              Warning
            </Button>
            <Button variant="outline" onClick={() => info('Update available', 'kova-ui v0.2.0 is ready.')}>
              Info
            </Button>
          </div>
        </>
      );
    }
    return <Demo />;
  },
};

export const Positions: Story = {
  render: () => {
    function Demo() {
      const tr = useToast({ position: 'tr' });
      const bl = useToast({ position: 'bl' });
      const tc = useToast({ position: 'tc' });
      return (
        <>
          <tr.Container />
          <bl.Container />
          <tc.Container />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Button variant="ghost" size="sm" onClick={() => tr.info('Top right', 'position: "tr"')}>
              Top Right
            </Button>
            <Button variant="ghost" size="sm" onClick={() => bl.info('Bottom left', 'position: "bl"')}>
              Bottom Left
            </Button>
            <Button variant="ghost" size="sm" onClick={() => tc.info('Top center', 'position: "tc"')}>
              Top Center
            </Button>
          </div>
        </>
      );
    }
    return <Demo />;
  },
};

import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**Modal** renders via a portal into \`document.body\`, locks body scroll, and dismisses on \`Escape\` or overlay click.

\`\`\`ts
import { Modal } from 'kova-ui'
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="solid" onClick={() => setOpen(true)}>
            Open Modal
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Confirm action"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="solid" onClick={() => setOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p>This will permanently delete the resource. This action cannot be undone.</p>
          </Modal>
        </>
      );
    }
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg'] as const).map(size => {
        function Demo() {
          const [open, setOpen] = useState(false);
          return (
            <>
              <Button key={size} variant="ghost" onClick={() => setOpen(true)}>
                {size.toUpperCase()}
              </Button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                title={`${size.toUpperCase()} Modal`}
                size={size}
                footer={
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                }
              >
                <p>
                  A <strong style={{ color: 'var(--k-white)' }}>{size}</strong> modal.
                </p>
              </Modal>
            </>
          );
        }
        return <Demo key={size} />;
      })}
    </div>
  ),
};

export const FormModal: Story = {
  name: 'Form Inside Modal',
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="outline" onClick={() => setOpen(true)}>
            Invite team member
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Invite team member"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="solid" onClick={() => setOpen(false)}>
                  Send invite
                </Button>
              </>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Input label="Full name" placeholder="Alice Chen" />
              <Input label="Email address" type="email" placeholder="alice@company.com" />
            </div>
          </Modal>
        </>
      );
    }
    return <Demo />;
  },
};

export const Destructive: Story = {
  name: 'Destructive Action',
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="danger" onClick={() => setOpen(true)}>
            Delete project
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            title="Delete project"
            size="sm"
            footer={
              <>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Keep it
                </Button>
                <Button variant="danger" onClick={() => setOpen(false)}>
                  Yes, delete
                </Button>
              </>
            }
          >
            <p>
              This will permanently delete <strong style={{ color: 'var(--k-white)' }}>kova-ui</strong>. This action{' '}
              <strong style={{ color: 'var(--k-red)' }}>cannot be undone</strong>.
            </p>
          </Modal>
        </>
      );
    }
    return <Demo />;
  },
};

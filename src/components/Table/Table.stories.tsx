import type { Meta, StoryObj } from '@storybook/preact';
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Table } from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Table** — sortable columns, pagination, row selection, loading skeleton, striped rows.

\`\`\`ts
import { Table } from 'kova-ui'
\`\`\`

### Client-side pagination
\`\`\`tsx
<Table data={allRows} columns={columns} pagination />
\`\`\`

### Row selection
\`\`\`tsx
<Table
  data={rows}
  columns={columns}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
/>
\`\`\`

### Server-side pagination (controlled)
\`\`\`tsx
<Table
  data={pageRows}
  columns={columns}
  total={1284}
  page={page}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  pagination
/>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Data ─────────────────────────────────────────────────────────────────────

// biome-ignore lint/suspicious/noExplicitAny: story data typing
const STATUS: Record<string, any> = { Live: 'success', Beta: 'cyan', Failed: 'danger', RC: 'warning' };
const STATUSES = ['Live', 'Live', 'Live', 'Beta', 'Failed', 'RC'];
const AUTHORS  = ['Rustam N', 'Alice C', 'Bob K', 'Carol M', 'Dave P', 'Eva R'];
const PROJECTS = ['kova-ui', 'dashboard-v2', 'api-gateway', 'auth-service', 'billing-api', 'analytics'];

function makeRow(i: number) {
  return {
    id:      String(i + 1),
    name:    `${PROJECTS[i % PROJECTS.length]}${i >= PROJECTS.length ? `-${Math.floor(i / PROJECTS.length) + 1}` : ''}`,
    status:  STATUSES[i % STATUSES.length],
    build:   `${10 + (i * 7) % 80}s`,
    version: `v${1 + (i % 4)}.${i % 10}.${i % 5}`,
    author:  AUTHORS[i % AUTHORS.length],
  };
}

const SMALL  = Array.from({ length: 5  }, (_, i) => makeRow(i));
const MEDIUM = Array.from({ length: 47 }, (_, i) => makeRow(i));

const COLS = [
  { key: 'name',    title: 'Project',  sortable: true },
  {
    key: 'author', title: 'Author',
    // biome-ignore lint/suspicious/noExplicitAny: render helpers
    render: (_: any, row: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Avatar name={row.author} size="sm" />
        <span>{row.author}</span>
      </div>
    ),
  },
  {
    key: 'status', title: 'Status',
    // biome-ignore lint/suspicious/noExplicitAny: render helpers
    render: (v: any) => (
      <Badge variant={STATUS[v] ?? 'default'} dot>{v}</Badge>
    ),
  },
  { key: 'build',   title: 'Build',   sortable: true },
  { key: 'version', title: 'Version', sortable: true },
];

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => <Table columns={COLS} data={SMALL} rowKey="id" />,
};

export const Sortable: Story = {
  render: () => (
    <Table
      columns={COLS}
      data={SMALL}
      rowKey="id"
    />
  ),
};

export const Pagination: Story = {
  name: 'Client-side Pagination',
  render: () => (
    <Table
      columns={COLS}
      data={MEDIUM}
      rowKey="id"
      pagination
    />
  ),
};

export const CustomPageSizes: Story = {
  name: 'Custom Page Sizes',
  render: () => (
    <Table
      columns={COLS}
      data={MEDIUM}
      rowKey="id"
      pagination={{ defaultPageSize: 5, pageSizeOptions: [5, 10, 25, 50] }}
    />
  ),
};

export const ServerSide: Story = {
  name: 'Server-side Pagination',
  render: () => {
    function Demo() {
      const [page, setPage]         = useState(1);
      const [pageSize, setPageSize] = useState(5);
      const totalRows = 47;
      const rows = MEDIUM.slice((page - 1) * pageSize, page * pageSize);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-text-muted)', padding: '6px 12px', background: 'var(--k-surface-2)', borderRadius: 'var(--k-r-md)', display: 'inline-block' }}>
            GET /api/deployments?page={page}&pageSize={pageSize}
          </div>
          <Table
            columns={COLS}
            data={rows}
            rowKey="id"
            total={totalRows}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pagination={{ pageSizeOptions: [5, 10, 20] }}
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Selectable: Story = {
  name: 'Selectable Rows',
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState<string[]>([]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Table
            columns={COLS}
            data={SMALL}
            rowKey="id"
            selectable
            selectedKeys={selected}
            onSelectionChange={setSelected}
          />
          <div style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-text-muted)', padding: '8px 12px', background: 'var(--k-surface-2)', borderRadius: 'var(--k-r-md)' }}>
            Selected IDs: {selected.length > 0 ? selected.join(', ') : 'none'}
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const SelectableWithPagination: Story = {
  name: 'Selectable + Pagination',
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState<string[]>([]);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Table
            columns={COLS}
            data={MEDIUM}
            rowKey="id"
            selectable
            selectedKeys={selected}
            onSelectionChange={setSelected}
            pagination={{ defaultPageSize: 5, pageSizeOptions: [5, 10, 25] }}
          />
          <div style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-text-muted)', padding: '8px 12px', background: 'var(--k-surface-2)', borderRadius: 'var(--k-r-md)' }}>
            {selected.length} row{selected.length !== 1 ? 's' : ''} selected across all pages
          </div>
        </div>
      );
    }
    return <Demo />;
  },
};

export const SelectableWithRowClick: Story = {
  name: 'Selectable + Row Click (independent)',
  render: () => {
    function Demo() {
      const [selected, setSelected] = useState<string[]>([]);
      const [clicked,  setClicked]  = useState<string | null>(null);
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontFamily: 'var(--k-font-mono)', fontSize: '12px', color: 'var(--k-text-muted)', padding: '8px 12px', background: 'var(--k-surface-2)', borderRadius: 'var(--k-r-md)' }}>
            Checkbox = select row &nbsp;|&nbsp; Click data cell = {clicked ? <strong style={{ color: 'var(--k-accent-light)' }}>{clicked}</strong> : 'nothing yet'}
          </div>
          <Table
            columns={COLS}
            data={SMALL}
            rowKey="id"
            selectable
            selectedKeys={selected}
            onSelectionChange={setSelected}
            onRowClick={row => setClicked(String(row.name))}
          />
        </div>
      );
    }
    return <Demo />;
  },
};

export const Striped: Story = {
  render: () => (
    <Table columns={COLS} data={SMALL} rowKey="id" striped />
  ),
};

export const Loading: Story = {
  render: () => (
    <Table columns={COLS} data={[]} rowKey="id" loading pagination={{ defaultPageSize: 5 }} />
  ),
};

export const Empty: Story = {
  render: () => (
    <Table
      columns={COLS}
      data={[]}
      rowKey="id"
      emptyText="No deployments found. Push your first commit to get started."
    />
  ),
};

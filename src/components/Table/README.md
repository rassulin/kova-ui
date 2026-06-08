# Table

Data table with sortable columns, hover rows, and custom cell renderers.

## Import

```ts
import { Table } from 'kova-ui'
```

## Basic

```tsx
<Table
  columns={[
    { key: 'name',   title: 'Name',   sortable: true },
    { key: 'status', title: 'Status', render: (v) => <Badge>{v}</Badge> },
    { key: 'date',   title: 'Date',   sortable: true },
  ]}
  data={rows}
  rowKey="id"
/>
```

## Column options

| Prop | Type | Description |
|---|---|---|
| `key` | `string` | Data object field name |
| `title` | `string` | Column header label |
| `sortable` | `boolean` | Enable click-to-sort |
| `render` | `(value, row, index) => JSX` | Custom cell renderer |
| `width` | `string \| number` | Column width |

## Empty state

```tsx
<Table data={[]} emptyText="No results found." columns={...} />
```

## CSS file

`src/components/Table/table.css`

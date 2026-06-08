# Menu

Dropdown triggered by any element. Closes on outside click or item selection.

## Import

```ts
import { Menu } from 'kova-ui'
```

## Basic

```tsx
<Menu
  trigger={<Button variant="ghost">Options ▾</Button>}
  align="right"
  items={[
    { key: 'edit',  label: 'Edit',      icon: <EditIcon />, onClick: () => {} },
    { key: 'dup',   label: 'Duplicate', icon: <CopyIcon />, onClick: () => {} },
    { key: 'sep',   type: 'separator' },
    { key: 'del',   label: 'Delete',    icon: <TrashIcon />, danger: true, onClick: () => {} },
  ]}
/>
```

## Item types

| type | Description |
|---|---|
| `item` (default) | Clickable menu item |
| `separator` | Horizontal divider line |
| `label` | Non-interactive section heading |

## Alignment

`align="left"` (default) · `align="right"`

## CSS file

`src/components/Menu/menu.css`

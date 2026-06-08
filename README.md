# kova-ui

> A sharp, dark-first Preact component library with killer UX.  
> **5.6 kB gzipped** for the full JS bundle + 4.9 kB CSS.

```
npm install kova-ui
```

---

## Setup

Import the stylesheet once at your app root:

```ts
import 'kova-ui/styles'
```

That's it. No providers, no context, no configuration.

---

## Components

### Button

```tsx
import { Button } from 'kova-ui'

<Button variant="solid" size="md" onClick={() => {}}>
  Launch
</Button>

<Button variant="solid-cyan" size="lg">
  Get started
</Button>

<Button variant="ghost">Cancel</Button>
<Button variant="outline">Learn more</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>

// Loading state
<Button variant="solid" loading>Processing...</Button>

// As link
<Button href="/dashboard" variant="solid">Dashboard</Button>
```

**Props**: `variant` · `size` (`xs` `sm` `md` `lg` `xl`) · `loading` · `disabled` · `iconOnly` · `href` · `onClick`  
**Variants**: `solid` · `solid-cyan` · `ghost` · `outline` · `danger` · `success`

---

### Input / Textarea

```tsx
import { Input, Textarea } from 'kova-ui'

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  hint="We'll never share your email."
/>

<Input
  label="Password"
  type="password"
  error="Must be at least 8 characters"
/>

// With prefix/suffix icons
<Input
  label="Search"
  prefix={<SearchIcon />}
  suffix={<CloseIcon />}
  placeholder="Search anything..."
/>

<Textarea label="Bio" placeholder="Tell us about yourself..." rows={4} />
```

**Props**: `label` · `hint` · `error` · `prefix` · `suffix` · `size` (`sm` `md` `lg`)

---

### Select

```tsx
import { Select } from 'kova-ui'

<Select
  label="Framework"
  placeholder="Choose one"
  options={[
    { value: 'preact', label: 'Preact' },
    { value: 'react',  label: 'React' },
    { value: 'solid',  label: 'Solid.js' },
  ]}
  onChange={(e) => console.log(e.currentTarget.value)}
/>
```

---

### Switch

```tsx
import { Switch } from 'kova-ui'

const [enabled, setEnabled] = useState(false)

<Switch
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>
```

---

### Badge

```tsx
import { Badge } from 'kova-ui'

<Badge variant="accent">New</Badge>
<Badge variant="success" dot>Active</Badge>
<Badge variant="danger">Critical</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="cyan">Beta</Badge>
```

**Variants**: `default` · `accent` · `cyan` · `success` · `warning` · `danger` · `pink`

---

### Card

```tsx
import { Card } from 'kova-ui'

<Card
  title="Deployment #427"
  subtitle="Pushed 2 minutes ago"
  footer={<Button size="sm" variant="ghost">View logs</Button>}
>
  Production build completed successfully in 43s.
</Card>

// Glowing accent card
<Card glow title="Pro plan">...</Card>
```

---

### Avatar / AvatarGroup

```tsx
import { Avatar, AvatarGroup } from 'kova-ui'

<Avatar name="Rustam Nazarov" size="md" />
<Avatar src="/avatar.jpg" name="Rustam" size="lg" />

<AvatarGroup
  size="sm"
  max={3}
  avatars={[
    { name: 'Alice Chen' },
    { name: 'Bob Kim' },
    { name: 'Carol Muñoz' },
    { name: 'Dave Park' },
  ]}
/>
```

---

### Tabs

```tsx
import { Tabs } from 'kova-ui'

<Tabs
  tabs={[
    { key: 'overview', label: 'Overview', content: <Overview /> },
    { key: 'settings', label: 'Settings', content: <Settings /> },
    { key: 'logs',     label: 'Logs',     content: <Logs /> },
  ]}
  defaultKey="overview"
  onChange={(key) => console.log(key)}
/>

// Line style
<Tabs variant="line" tabs={...} />
```

---

### Breadcrumb

```tsx
import { Breadcrumb } from 'kova-ui'

<Breadcrumb
  items={[
    { label: 'Home',     href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'kova-ui' },
  ]}
/>
```

---

### Menu

```tsx
import { Menu } from 'kova-ui'

<Menu
  trigger={<Button variant="ghost">Options ▾</Button>}
  align="right"
  items={[
    { key: 'edit',   label: 'Edit',   onClick: () => {} },
    { key: 'dup',    label: 'Duplicate', onClick: () => {} },
    { key: 'sep',    type: 'separator' },
    { key: 'delete', label: 'Delete', danger: true, onClick: () => {} },
  ]}
/>
```

---

### Table

```tsx
import { Table } from 'kova-ui'

<Table
  columns={[
    { key: 'name',   title: 'Name',   sortable: true },
    { key: 'status', title: 'Status', render: (v) => <Badge variant="success">{v}</Badge> },
    { key: 'date',   title: 'Date',   sortable: true },
  ]}
  data={rows}
  rowKey="id"
/>
```

---

### Modal

```tsx
import { Modal } from 'kova-ui'

const [open, setOpen] = useState(false)

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  This action cannot be undone.
</Modal>
```

**Props**: `open` · `onClose` · `title` · `size` (`sm` `md` `lg` `xl`) · `footer` · `closeOnOverlay`  
Presses `Escape` to close. Focus-traps and locks body scroll automatically.

---

### Toast (useToast hook)

```tsx
import { useToast } from 'kova-ui'

function App() {
  const { success, error, warning, info, Container } = useToast({ position: 'tr' })

  return (
    <div>
      <Container />  {/* Mount once at app root */}

      <Button onClick={() => success('Deployed!', 'Your app is live.')}>
        Deploy
      </Button>
      <Button onClick={() => error('Build failed', 'Check your logs.')}>
        Break
      </Button>
    </div>
  )
}
```

**Positions**: `tr` · `tl` · `br` · `bl` · `tc`  
Auto-dismisses with configurable duration. Progress bar shows remaining time.

---

### Tooltip

```tsx
import { Tooltip } from 'kova-ui'

<Tooltip content="Copy to clipboard" placement="top">
  <Button variant="ghost" iconOnly>
    <CopyIcon />
  </Button>
</Tooltip>
```

**Placements**: `top` · `bottom` · `left` · `right`

---

### Accordion

```tsx
import { Accordion } from 'kova-ui'

<Accordion
  items={[
    { key: 'q1', title: 'What is kova-ui?',    content: 'A Preact component library.' },
    { key: 'q2', title: 'Is it tree-shakeable?', content: 'Yes, every component is individually importable.' },
  ]}
  multiple  // allow multiple open at once
  defaultOpen={['q1']}
/>
```

---

### Progress

```tsx
import { Progress } from 'kova-ui'

<Progress value={72} glow />
```

---

### Skeleton

```tsx
import { Skeleton } from 'kova-ui'

<Skeleton height={20} width="60%" />
<Skeleton height={40} width={40} circle />
```

---

### Grid / Stack / Divider / Kbd / Code

```tsx
import { Grid, Stack, Divider, Kbd, Code } from 'kova-ui'

<Grid cols={3} gap={24}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Grid>

<Stack direction="row" gap={12} align="center">
  <Avatar name="A" />
  <span>Alice</span>
</Stack>

<Divider />

Press <Kbd>⌘K</Kbd> to open.

<Code>npm install kova-ui</Code>
<Code block>{longCodeSnippet}</Code>
```

---

## Design tokens

All tokens are CSS custom properties, override freely:

```css
:root {
  --k-accent:       #8b5cf6;   /* primary accent (violet) */
  --k-cyan:         #22d3ee;   /* secondary accent */
  --k-surface-1:    #111114;   /* base card bg */
  --k-surface-2:    #18181c;   /* elevated surface */
  --k-surface-3:    #222228;   /* highest surface */
  --k-font-display: 'Syne', sans-serif;
  --k-font-mono:    'DM Mono', monospace;
}
```

---

## Publishing to npm

```bash
# 1. Login
npm login

# 2. Bump version
npm version patch  # or minor / major

# 3. Build & publish
npm run build
npm publish --access public
```

---

## License

MIT

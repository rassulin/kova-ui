# Tabs

Switches between panels. Two variants: `pill` (segmented control) and `line` (underline).

## Import

```ts
import { Tabs } from 'kova-ui'
```

## Basic

```tsx
<Tabs
  tabs={[
    { key: 'overview', label: 'Overview', content: <Overview /> },
    { key: 'settings', label: 'Settings', content: <Settings /> },
    { key: 'logs',     label: 'Logs',     content: <Logs /> },
  ]}
  defaultKey="overview"
  onChange={(key) => console.log(key)}
/>
```

## Line variant

```tsx
<Tabs variant="line" tabs={...} />
```

## Controlled

```tsx
<Tabs activeKey={activeTab} onChange={setActiveTab} tabs={...} />
```

## Rich labels

```tsx
<Tabs
  tabs={[
    { key: 'open', label: <span>Open <Badge variant="accent">12</Badge></span>, content: ... },
  ]}
/>
```

## CSS file

`src/components/Tabs/tabs.css`

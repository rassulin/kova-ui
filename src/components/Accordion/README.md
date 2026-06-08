# Accordion

Animated collapsible panels. Supports single-open or multiple-open mode.

## Import

```ts
import { Accordion } from 'kova-ui'
```

## Basic

```tsx
<Accordion
  items={[
    { key: 'q1', title: 'What is kova-ui?', content: 'A Preact component library.' },
    { key: 'q2', title: 'Is it tree-shakeable?', content: 'Yes.' },
  ]}
  defaultOpen={['q1']}
/>
```

## Multiple open

```tsx
<Accordion multiple items={...} defaultOpen={['q1', 'q2']} />
```

## CSS file

`src/components/Accordion/accordion.css`

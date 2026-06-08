# Card

Surface container with optional title, subtitle, footer, and a spotlight hover effect.

## Import

```ts
import { Card } from 'kova-ui'
```

## Basic

```tsx
<Card title="Deployment #427" subtitle="2 minutes ago">
  Build completed in 43s. All tests passed.
</Card>
```

## With footer

```tsx
<Card
  title="kova-ui"
  footer={<Button size="sm" variant="ghost">View repo</Button>}
>
  A Preact component library.
</Card>
```

## Glow variant

Adds a violet border glow — ideal for featured/highlighted cards.

```tsx
<Card glow title="Pro plan">Unlimited everything.</Card>
```

## Clickable

```tsx
<Card onClick={() => navigate('/detail')}>Click me</Card>
```

## CSS file

`src/components/Card/card.css`

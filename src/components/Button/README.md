# Button

Primary action element. Five variants, five sizes, loading state, and icon-only mode.

## Import

```ts
import { Button } from 'kova-ui'
// or tree-shake to just the component:
import { Button } from 'kova-ui/components/Button'
```

## Variants

| Variant | Use case |
|---|---|
| `solid` | Primary CTA |
| `solid-cyan` | Accent/highlight CTA |
| `ghost` | Secondary / low-emphasis |
| `outline` | Accent-bordered secondary |
| `danger` | Destructive actions |
| `success` | Confirmations |

```tsx
<Button variant="solid">Deploy</Button>
<Button variant="solid-cyan">Get started</Button>
<Button variant="ghost">Cancel</Button>
<Button variant="outline">Learn more</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
```

## Sizes

```tsx
<Button size="xs">XSmall</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>   {/* default */}
<Button size="lg">Large</Button>
<Button size="xl">XLarge</Button>
```

## Loading

Pass `loading` to show a spinner and block interaction.

```tsx
<Button variant="solid" loading>Deploying...</Button>
```

## As a link

Pass `href` to render an `<a>` tag instead of `<button>`.

```tsx
<Button href="/dashboard" variant="solid">Dashboard</Button>
```

## Icon only

```tsx
<Button variant="ghost" iconOnly>
  <PlusIcon />
</Button>
```

## CSS file

`src/components/Button/button.css`

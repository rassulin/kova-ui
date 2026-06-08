# Toast (useToast)

Notification toasts via a Preact hook. Mount `<Container />` once at the app root.

## Import

```ts
import { useToast } from 'kova-ui'
```

## Setup

```tsx
function App() {
  const { success, error, warning, info, Container } = useToast({ position: 'tr' })

  return (
    <>
      <Container />
      <Button onClick={() => success('Deployed!', 'Your app is live.')}>
        Deploy
      </Button>
    </>
  )
}
```

## Methods

```ts
toast('Title', { variant: 'info', message: 'Body', duration: 3000 })
success('Title', 'Optional message')
error('Title', 'Optional message')
warning('Title', 'Optional message')
info('Title', 'Optional message')
```

## Positions

`'tr'` (top-right, default) · `'tl'` · `'br'` · `'bl'` · `'tc'`

## Duration

Default durations: success 3s, info 3.5s, warning 4s, error 5s.
Pass `duration: 0` for a persistent toast.

## CSS file

`src/components/Toast/toast.css`

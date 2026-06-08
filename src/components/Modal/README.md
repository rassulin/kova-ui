# Modal

Portal-rendered dialog. Locks body scroll, traps focus, dismisses on `Escape` or overlay click.

## Import

```ts
import { Modal } from 'kova-ui'
```

## Basic

```tsx
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

## Sizes

```tsx
<Modal size="sm" ...>  // max-width: 380px
<Modal size="md" ...>  // max-width: 520px (default)
<Modal size="lg" ...>  // max-width: 720px
<Modal size="xl" ...>  // max-width: 960px
```

## Disable overlay close

```tsx
<Modal closeOnOverlay={false} ...>
```

## CSS file

`src/components/Modal/modal.css`

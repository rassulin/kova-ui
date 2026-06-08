# Avatar / AvatarGroup

Renders initials with a deterministic color from the name, or an image.

## Import

```ts
import { Avatar, AvatarGroup } from 'kova-ui'
```

## Basic

```tsx
<Avatar name="Rustam N" size="md" />
<Avatar src="/photo.jpg" name="Rustam N" size="lg" />
```

## Sizes

`xs` · `sm` · `md` · `lg` · `xl`

## AvatarGroup

```tsx
<AvatarGroup
  max={4}
  size="sm"
  avatars={[
    { name: 'Alice Chen' },
    { name: 'Bob Kim' },
    { name: 'Carol M' },
    { name: 'Dave P' },
    { name: 'Eva R' },
  ]}
/>
```

Excess avatars show as `+N`.

## CSS file

`src/components/Avatar/avatar.css`

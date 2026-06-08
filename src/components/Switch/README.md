# Switch

Toggle input that glows with the accent color when checked.

## Import

```ts
import { Switch } from 'kova-ui'
```

## Controlled

```tsx
const [on, setOn] = useState(false)

<Switch checked={on} onChange={setOn} label="Enable notifications" />
```

## Disabled

```tsx
<Switch checked={true} disabled label="Read-only" />
```

## CSS file

`src/components/Switch/switch.css`

# Input / Textarea

Core form primitives with label, hint, error, and prefix/suffix slots.

## Import

```ts
import { Input, Textarea } from 'kova-ui'
```

## Basic

```tsx
<Input label="Email" type="email" placeholder="you@example.com" />
```

## With hint / error

```tsx
<Input label="Username" hint="Letters and numbers only." />
<Input label="Password" error="Must be at least 8 characters." />
```

## Sizes

```tsx
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
```

## Prefix / Suffix

```tsx
<Input label="Search" prefix={<SearchIcon />} />
<Input label="Domain" suffix={<span>.vercel.app</span>} />
```

## Textarea

```tsx
<Textarea label="Bio" placeholder="Tell us about yourself..." rows={4} />
```

## CSS file

`src/components/Input/input.css`

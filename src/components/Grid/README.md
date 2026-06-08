# Layout & Utilities

Grid, Stack, Progress, Skeleton, Divider, Kbd, Code.

## Import

```ts
import { Grid, Stack, Progress, Skeleton, Divider, Kbd, Code } from 'kova-ui'
```

## Grid

```tsx
<Grid cols={3} gap={24}>
  <Card>A</Card>
  <Card>B</Card>
  <Card>C</Card>
</Grid>

<Grid cols="auto" gap={16}>  {/* responsive auto-fit */}
```

## Stack

```tsx
<Stack direction="row" gap={12} align="center">
  <Avatar name="A" />
  <span>Alice</span>
</Stack>

<Stack direction="column" gap={8}>
  <Input ... />
  <Button>Submit</Button>
</Stack>
```

## Progress

```tsx
<Progress value={72} glow />
<Progress value={45} />  {/* overrides background color via CSS var */}
```

## Skeleton

```tsx
<Skeleton height={14} width="60%" />
<Skeleton height={48} width={48} circle />
```

## Kbd / Code / Divider

```tsx
<Kbd>⌘K</Kbd>
<Code>npm install kova-ui</Code>
<Code block>{longSnippet}</Code>
<Divider />
```

## CSS file

`src/components/Grid/grid.css`

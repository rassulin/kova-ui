# Publishing kova-ui to npm

## Prerequisites

1. **Create an npm account** at https://www.npmjs.com/signup if you haven't already
2. **Login locally**:
   ```bash
   npm login
   ```

## Steps to publish

### 1. Update package.json

Edit `package.json` and update these fields:
```json
{
  "name": "kova-ui",
  "repository": {
    "url": "https://github.com/YOUR_USERNAME/kova-ui"
  }
}
```

> The name `kova-ui` may already be taken on npm. If so, pick an alternative:
> - `@yourusername/kova-ui` (scoped, always available)
> - `kova-components`
> - `kova-preact`

### 2. Build the library

```bash
npm run build
```

This outputs:
- `dist/index.esm.js` — ES module (for bundlers)
- `dist/index.cjs.js` — CommonJS (for Node/legacy)
- `dist/index.d.ts` — TypeScript declarations
- `dist/kova-ui.css` — Compiled stylesheet

### 3. (Optional) Test locally before publishing

```bash
# In kova-ui/
npm link

# In your test project
npm link kova-ui
```

### 4. Publish

```bash
# First publish (public)
npm publish --access public

# Subsequent releases — bump version first
npm version patch   # 0.1.0 → 0.1.1
npm version minor   # 0.1.0 → 0.2.0
npm version major   # 0.1.0 → 1.0.0

# Then publish
npm run build && npm publish
```

### 5. Verify

```bash
npm info kova-ui
# or visit: https://www.npmjs.com/package/kova-ui
```

---

## Scoped packages (recommended)

Using a scoped name `@yourusername/kova-ui` guarantees no naming conflicts:

```json
{
  "name": "@yourusername/kova-ui"
}
```

```bash
npm publish --access public
```

Users install with:
```bash
npm install @yourusername/kova-ui
```

---

## Automating releases with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your npm token as `NPM_TOKEN` secret in your GitHub repo settings.
Then releasing is as simple as:

```bash
npm version minor
git push origin main --tags
```

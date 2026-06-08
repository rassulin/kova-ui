# Biome Setup for IntelliJ IDEA / WebStorm

## Option 1 — Biome Plugin (recommended)

The official Biome plugin gives you format + lint + import sorting on every save,
inline error highlighting, and quick-fix actions — exactly like ESLint + Prettier
but a single tool.

### Install

1. Open **Settings** (`⌘,` / `Ctrl+Alt+S`)
2. **Plugins** → search **"Biome"** → **Install**
   - Direct link: https://plugins.jetbrains.com/plugin/22761-biome
3. Restart the IDE

### Configure

1. **Settings → Languages & Frameworks → Biome**
2. Check **"Enable Biome"**
3. Set **"Run biome on"** → **"File Save"**
4. Leave **"Configuration file"** blank — it auto-detects `biome.json` in root

That's it. On every `⌘S` / `Ctrl+S`:
- File is **formatted** (indentation, quotes, line width)
- **Lint errors** are auto-fixed where possible
- **Imports are sorted** automatically

### Optional: Set Biome as the TypeScript formatter

**Settings → Editor → Code Style → TypeScript**
→ set **"Formatter"** to **"Biome"**

This makes **⌘⌥L** / `Ctrl+Alt+L` (Reformat Code) use Biome instead of the
built-in formatter.

---

## Option 2 — File Watcher (no plugin needed)

Uses IntelliJ's built-in File Watchers to run Biome on save.

1. **Settings → Tools → File Watchers → Import**
2. Select `.idea/watcherTasks.xml` from this project
3. Enable the **"Biome"** watcher

---

## Option 3 — Run Configuration

Bind a keyboard shortcut to run Biome manually:

1. **Run → Edit Configurations → + → npm**
2. Set:
   - **Command**: `run`
   - **Scripts**: `lint:fix`
3. Assign a keyboard shortcut in **Settings → Keymap**

---

## npm Scripts

```bash
npm run lint        # report all violations
npm run lint:fix    # auto-fix everything fixable
npm run format      # format only
npm run check       # alias for lint
npm run storybook   # dev server → localhost:6006
npm run build       # build the library
```

---

## What Biome enforces

| Rule | Setting |
|------|---------|
| Semicolons | Always required |
| Trailing commas | All positions (params, interfaces, generics) |
| Quotes | Single quotes |
| Line width | 120 characters |
| Indent | 2 spaces |
| Import order | Auto-sorted (stdlib → packages → relative) |
| Unused imports/vars | Error |
| `noExplicitAny` | Warning |
| Accessibility (a11y) | Enabled |

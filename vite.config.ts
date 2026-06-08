import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { readdirSync, statSync } from 'fs'

function buildEntries() {
  const components = readdirSync(resolve(__dirname, 'src/components')).filter(name =>
    statSync(resolve(__dirname, 'src/components', name)).isDirectory()
  )
  const entries: Record<string, string> = {
    index: resolve(__dirname, 'src/index.ts'),
  }
  for (const name of components) {
    entries[`components/${name}/index`] = resolve(__dirname, `src/components/${name}/${name}.tsx`)
  }
  return entries
}

export default defineConfig({
  plugins: [
    preact(),
    dts({ include: ['src'], rollupTypes: false, entryRoot: 'src' })
  ],
  build: {
    lib: { entry: buildEntries(), formats: ['es', 'cjs'] },
    rollupOptions: {
      external: ['preact', 'preact/hooks', 'preact/compat'],
      output: [
        {
          format: 'es',
          entryFileNames: 'esm/[name].js',
          chunkFileNames: 'esm/chunks/[name]-[hash].js',
          assetFileNames: 'styles/[name][extname]',
          globals: { preact: 'preact', 'preact/hooks': 'preactHooks' },
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          entryFileNames: 'cjs/[name].js',
          chunkFileNames: 'cjs/chunks/[name]-[hash].js',
          assetFileNames: 'styles/[name][extname]',
          globals: { preact: 'preact', 'preact/hooks': 'preactHooks' },
          preserveModules: true,
          preserveModulesRoot: 'src',
        }
      ]
    },
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: { 'react': 'preact/compat', 'react-dom': 'preact/compat' }
  }
})

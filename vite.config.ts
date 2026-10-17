import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execFileSync } from 'node:child_process'

// Keep the generated book index current even when Vercel runs Vite directly.
execFileSync(process.execPath, ['scripts/generate-content-index.mjs'], { stdio: 'inherit' })

export default defineConfig({
  plugins: [vue()],
})

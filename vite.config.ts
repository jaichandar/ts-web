import { defineConfig as viteConfig, mergeConfig } from 'vite'
import { defineConfig as vitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const _viteConfig = viteConfig({
  plugins: [react()],
})

const _vitestConfig = vitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup'
  }
})

export default mergeConfig(_viteConfig, _vitestConfig);


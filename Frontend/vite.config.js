import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/pages/home/books/_tests_/setupTests.js',
    coverage: {
      provider: 'v8', // or 'c8' if needed
      reporter: ['text', 'html'],
    },
  },
})

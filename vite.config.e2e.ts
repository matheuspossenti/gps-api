import { defineConfig } from 'vitest/config'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['./src/**/*.e2e-spec.ts'],
    setupFiles: './tests/vitest.setup.ts',
    globals: true,
  },
  plugins: [viteTsconfigPaths()],
})

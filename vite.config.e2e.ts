import { defineConfig } from 'vitest/config'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    setupFiles: ['./tests/setup.e2e.ts'],
  },
  plugins: [viteTsconfigPaths()],
})

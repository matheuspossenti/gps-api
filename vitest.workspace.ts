import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: './vite.config.ts',
    test: {
      name: 'unit',
      include: ['./src/use-cases/**/*.spec.ts'],
      exclude: ['**/*.e2e-spec.ts'],
    },
  },
  {
    extends: './vite.config.ts',
    test: {
      name: 'e2e',
      include: ['**/*.e2e.spec.ts'],
      setupFiles: ['./tests/setup.e2e.ts'],
    },
  },
])

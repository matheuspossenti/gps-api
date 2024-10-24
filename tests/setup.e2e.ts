import { execSync } from 'child_process'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  execSync('npm run knex -- migrate:latest')
})

afterAll(async () => {
  execSync('npm run knex -- migrate:rollback')
})

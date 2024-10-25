import { knex } from '@/database'
import { execSync } from 'child_process'
import { afterAll, beforeAll } from 'vitest'

beforeAll(async () => {
  execSync('npm run knex -- migrate:latest')
})

afterAll(async () => {
  knex.schema.dropTable('access')
  knex.schema.dropTable('coordinates')
  knex.schema.dropTable('drivers')
  knex.schema.dropTable('passengers')
  knex.schema.dropTable('vehicles')
})

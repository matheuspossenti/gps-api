import { exec } from 'child_process'
import { promisify } from 'util'
import { afterAll, beforeAll } from 'vitest'

const execAsync = promisify(exec)

beforeAll(async () => {
  await execAsync('npm run knex migrate:latest')
})

afterAll(async () => {
  try {
    await execAsync('npm run knex migrate:unlock')
  } catch (error) {
    console.error('Error unlocking migrations:', error.message)
  }

  try {
    await execAsync('npm run knex migrate:rollback --all')
  } catch (error) {
    console.error('Error rolling back migrations:', error.message)
  }
})

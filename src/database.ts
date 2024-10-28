import setupKnex, { Knex } from 'knex'
import { env } from './env'
import { Database } from 'sqlite3'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
    loadExtensions: ['.ts'],
  },
  pool: {
    afterCreate: (conn: Database, done: (err: Error | null) => void) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  },
}

export const knex = setupKnex(config)

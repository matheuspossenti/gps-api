import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('drivers', (table) => {
    table.uuid('uuid').primary()
    table.string('name').notNullable()
    table.string('tagAccess').notNullable()
    table.timestamps(false, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('drivers')
}

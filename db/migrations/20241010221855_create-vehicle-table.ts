import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vehicles', (table) => {
    table.uuid('uuid').primary()
    table.string('name').notNullable()
    table.string('model').notNullable()
    table.string('brand').notNullable()
    table.timestamps(false, true, true)
    table.dateTime('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('vehicles')
}

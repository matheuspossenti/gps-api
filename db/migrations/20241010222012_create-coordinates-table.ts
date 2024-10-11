import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('coordinates', (table) => {
    table.uuid('uuid').primary()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    table.string('pontoCardeal').notNullable()
    table.uuid('driverId').notNullable()
    table.uuid('vehicleId').notNullable()
    table.foreign('driverId').references('uuid').inTable('drivers')
    table.foreign('vehicleId').references('uuid').inTable('vehicles')
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('coordinates')
}

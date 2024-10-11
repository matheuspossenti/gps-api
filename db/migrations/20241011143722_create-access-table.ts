import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('access', (table) => {
    table.uuid('uuid').primary()
    table.uuid('driverId').notNullable()
    table.uuid('vehicleId').notNullable()
    table.uuid('passengerId').notNullable()
    table.foreign('driverId').references('uuid').inTable('drivers')
    table.foreign('vehicleId').references('uuid').inTable('vehicles')
    table.foreign('passengerId').references('uuid').inTable('passengers')
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('access')
}

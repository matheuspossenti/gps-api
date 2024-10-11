import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('coordinates', (table) => {
    table.uuid('uuid').primary()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    table.string('pontoCardeal').notNullable()
    table
      .uuid('vehicleId')
      .references('uuid')
      .inTable('vehicles')
      .onDelete('RESTRICT')
    table
      .uuid('driverId')
      .references('uuid')
      .inTable('drivers')
      .onDelete('RESTRICT')

    table.timestamps(true, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('coordinates')
}

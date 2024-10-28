import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('coordinates', (table) => {
    table.uuid('uuid').primary()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    table.string('pontoCardeal').notNullable()
    table
      .uuid('vehicleUuid')
      .references('uuid')
      .inTable('vehicles')
      .onDelete('CASCADE')
    table
      .uuid('driverUuid')
      .references('uuid')
      .inTable('drivers')
      .onDelete('CASCADE')

    table.timestamps(false, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('coordinates')
}

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('access', (table) => {
    table.uuid('uuid').primary()
    table
      .uuid('driverUuid')
      .references('uuid')
      .inTable('drivers')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('vehicleUuid')
      .references('uuid')
      .inTable('vehicles')
      .onDelete('CASCADE')
      .notNullable()
    table
      .uuid('passengerUuid')
      .references('uuid')
      .inTable('passengers')
      .onDelete('CASCADE')
      .notNullable()
    table.string('methodUsed').notNullable()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    table.timestamps(false, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('access')
}

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('access', (table) => {
    table.uuid('uuid').primary()
    table
      .uuid('driverId')
      .references('uuid')
      .inTable('drivers')
      .onDelete('RESTRICT')
      .notNullable()
    table
      .uuid('vehicleId')
      .references('uuid')
      .inTable('vehicles')
      .onDelete('RESTRICT')
      .notNullable()
    table
      .uuid('passengerId')
      .references('uuid')
      .inTable('passengers')
      .onDelete('RESTRICT')
      .notNullable()
    table.string('methodUsed').notNullable()
    table.float('latitude').notNullable()
    table.float('longitude').notNullable()
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('access')
}

import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('passengers', (table) => {
    table.uuid('uuid').primary()
    table.string('name').notNullable()
    table.string('tagAccess').notNullable()
    table.string('biometryTemplate1').notNullable()
    table.string('biometryTemplate2').notNullable()
    table.string('biometryTemplate3').notNullable()
    table.uuid('uuidVehicleAuthorized').notNullable()
    table.timestamps(true, true, true)
    table.timestamp('deletedAt').defaultTo(null).nullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('passengers')
}

import { knex } from '../../database'
import { Driver } from '../../entities/driver'
import { IDriverRepository } from '../driver-repository'

export class KnexDriverRepository implements IDriverRepository {
  async getAll(): Promise<Driver[]> {
    const drivers = await knex('drivers').whereNull('deletedAt').select('*')

    return drivers
  }

  async getDriverByUuid(uuid: string): Promise<Driver> {
    const driver = await knex('drivers').where({ uuid }).first()

    return driver
  }

  async save(driver: Driver): Promise<Driver> {
    const [createdDriver] = await knex('drivers')
      .insert({
        uuid: driver.uuid,
        name: driver.name,
        tagAccess: driver.tagAccess,
        createdAt: driver.createdAt,
        updatedAt: driver.updatedAt,
        deletedAt: driver.deletedAt,
      })
      .onConflict('uuid')
      .merge()
      .returning('*')

    return createdDriver
  }
}

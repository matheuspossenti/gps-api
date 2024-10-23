import { knex } from '../../database'
import { Access } from '../../entities/access'
import { IAccessRepository } from '../access-repository'

export class KnexAccessRepository implements IAccessRepository {
  async getAll(): Promise<Access[]> {
    const access = await knex('access').whereNull('deletedAt').select('*')

    return access
  }

  async getAccessByUuid(uuid: string): Promise<Access> {
    const access = await knex('access').where({ uuid }).first()

    return access
  }

  async save(access: Access): Promise<Access> {
    const [createdAccess] = await knex('access')
      .insert({
        uuid: access.uuid,
        driverUuid: access.driverUuid,
        vehicleUuid: access.vehicleUuid,
        passengerUuid: access.passengerUuid,
        methodUsed: access.methodUsed,
        latitude: access.latitude,
        longitude: access.longitude,
        createdAt: access.createdAt,
        updatedAt: access.updatedAt,
        deletedAt: access.deletedAt,
      })
      .returning('*')

    return createdAccess
  }
}

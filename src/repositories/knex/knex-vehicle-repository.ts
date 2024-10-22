import { knex } from '../../database'
import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../vehicle-repository'

export class KnexVehicleRepository implements IVehicleRepository {
  async getAll(): Promise<Vehicle[]> {
    const vehicles = await knex('vehicles').whereNull('deletedAt').select('*')

    return vehicles
  }

  async getVehicleByUuid(uuid: string): Promise<Vehicle> {
    const vehicle = await knex('vehicles').where({ uuid }).first()

    return vehicle
  }

  async save(vehicle: Vehicle): Promise<Vehicle> {
    const [createdVehicle] = await knex('vehicles')
      .insert({
        uuid: vehicle.uuid,
        name: vehicle.name,
        model: vehicle.model,
        brand: vehicle.brand,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
        deletedAt: vehicle.deletedAt,
      })
      .onConflict('uuid')
      .merge()
      .returning('*')

    return createdVehicle
  }
}

import { knex } from '../../database'
import type { Passenger } from '../../entities/passenger'
import type { IPassengerRepository } from '../passenger-repository'

export class KnexPassengerRepository implements IPassengerRepository {
  async getAll(): Promise<Passenger[]> {
    const passengers = await knex('passengers')
      .whereNull('deletedAt')
      .select('*')

    return passengers
  }

  async getPassengerByUuid(uuid: string): Promise<Passenger> {
    const passenger = await knex('passengers').where({ uuid }).first()

    return passenger
  }

  async save(passenger: Passenger): Promise<Passenger> {
    const [createdPassenger] = await knex('passengers')
      .insert({
        uuid: passenger.uuid,
        name: passenger.name,
        tagAccess: passenger.tagAccess,
        biometryTemplate1: passenger.biometryTemplate1,
        biometryTemplate2: passenger.biometryTemplate2,
        biometryTemplate3: passenger.biometryTemplate3,
        uuidVehicleAuthorized: passenger.uuidVehicleAuthorized,
        createdAt: passenger.createdAt,
        updatedAt: passenger.updatedAt,
        deletedAt: passenger.deletedAt,
      })
      .onConflict('uuid')
      .merge()
      .returning('*')

    return createdPassenger
  }
}

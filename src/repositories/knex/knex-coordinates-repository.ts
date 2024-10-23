import { knex } from '../../database'
import { Coordinate } from '../../entities/coordinate'
import { ICoordinateRepository } from '../coordinate-repository'

export class KnexCoordinatesRepository implements ICoordinateRepository {
  async getAll(): Promise<Coordinate[]> {
    const coordinates = await knex('coordinates')
      .whereNull('deletedAt')
      .select('*')

    return coordinates
  }

  async getCoordinateByUuid(uuid: string): Promise<Coordinate> {
    const coordinate = await knex('coordinates').where({ uuid }).first()

    return coordinate
  }

  async save(coordinate: Coordinate): Promise<Coordinate> {
    const [createdCoordinate] = await knex('coordinates')
      .insert({
        uuid: coordinate.uuid,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        pontoCardeal: coordinate.pontoCardeal,
        driverUuid: coordinate.driverUuid,
        vehicleUuid: coordinate.vehicleUuid,
        createdAt: coordinate.createdAt,
        updatedAt: coordinate.updatedAt,
        deletedAt: coordinate.deletedAt,
      })
      .returning('*')

    return createdCoordinate
  }
}

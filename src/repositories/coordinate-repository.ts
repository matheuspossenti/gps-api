import type { Coordinate } from '../entities/coordinate'

export interface ICoordinateRepository {
  getAll(): Promise<Coordinate[]>
  getCoordinateByUuid(uuid: string): Promise<Coordinate | null>
  save(coordinate: Coordinate): Promise<Coordinate>
}

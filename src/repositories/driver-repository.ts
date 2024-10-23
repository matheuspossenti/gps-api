import type { Driver } from '../entities/driver'

export interface IDriverRepository {
  getAll(): Promise<Driver[]>
  getDriverByUuid(uuid: string): Promise<Driver>
  save(driver: Driver): Promise<Driver>
}

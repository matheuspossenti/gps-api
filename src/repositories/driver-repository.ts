import type { Driver } from '../entities/driver'

export interface IDriverRepository {
  getAll(): Promise<Driver[]>
  getDriverByUuid(uuid: string): Promise<Driver | null>
  save(driver: Driver): Promise<Driver>
}

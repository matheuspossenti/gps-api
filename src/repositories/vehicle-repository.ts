import type { Vehicle } from '../entities/vehicle'

export interface IVehicleRepository {
  getAll(): Promise<Vehicle[]>
  getVehicleByUuid(uuid: string): Promise<Vehicle | null>
  save(vehicle: Vehicle): Promise<Vehicle>
}

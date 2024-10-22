import type { Vehicle } from '../entities/vehicle'

export interface IVehicleRepository {
  getAll(): Promise<Vehicle[]>
  getVehicleByUuid(uuid: string): Promise<Vehicle>
  save(vehicle: Vehicle): Promise<Vehicle>
}

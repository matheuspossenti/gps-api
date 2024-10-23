import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../vehicle-repository'

export class InMemoryVehiclesRepository implements IVehicleRepository {
  private items: Vehicle[] = []

  async getAll() {
    return this.items
  }

  async getVehicleByUuid(uuid: string) {
    const vehicle = this.items.find((item) => item.uuid === uuid)

    if (!vehicle) {
      return null
    }

    return vehicle
  }

  async save(vehicle: Vehicle) {
    const vehicleIndex = this.items.findIndex(
      (vehicleItem) => vehicleItem.uuid === vehicle.uuid,
    )

    if (vehicleIndex === -1) {
      this.items.push(vehicle)
    } else {
      this.items[vehicleIndex] = vehicle
    }

    return vehicle
  }
}

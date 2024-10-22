import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../../repositories/vehicle-repository'

interface IGetVehiclesResponse {
  vehicles: Vehicle[]
}

export class GetVehiclesUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(): Promise<IGetVehiclesResponse> {
    const vehicles = await this.vehicleRepository.getAll()

    return { vehicles }
  }
}

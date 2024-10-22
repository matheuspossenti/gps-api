import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../../repositories/vehicle-repository'

interface IUpdateVehicleRequest {
  uuid: string
  data: {
    name?: string
    model?: string
    brand?: string
  }
}

interface IUpdateVehicleResponse {
  vehicle: Vehicle
}

export class UpdateVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute({
    uuid,
    data,
  }: IUpdateVehicleRequest): Promise<IUpdateVehicleResponse> {
    const vehicleBeforeUpdate =
      await this.vehicleRepository.getVehicleByUuid(uuid)

    vehicleBeforeUpdate.name = data.name || vehicleBeforeUpdate.name
    vehicleBeforeUpdate.model = data.model || vehicleBeforeUpdate.model
    vehicleBeforeUpdate.brand = data.brand || vehicleBeforeUpdate.brand

    const vehicle = await this.vehicleRepository.save(vehicleBeforeUpdate)

    return { vehicle }
  }
}

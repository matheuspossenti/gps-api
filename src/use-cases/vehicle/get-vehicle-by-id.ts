import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../../repositories/vehicle-repository'

interface IGetVehicleByIdRequest {
  uuid: string
}

interface IGetVehicleByIdResponse {
  vehicle: Vehicle
}

export class GetVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute({
    uuid,
  }: IGetVehicleByIdRequest): Promise<IGetVehicleByIdResponse> {
    const vehicle = await this.vehicleRepository.getVehicleByUuid(uuid)

    return { vehicle }
  }
}

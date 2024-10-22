import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../../repositories/vehicle-repository'

interface IDeleteVehicleRequest {
  uuid: string
}

interface IDeleteVehicleResponse {
  vehicle: Vehicle
}

export class DeleteVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute({
    uuid,
  }: IDeleteVehicleRequest): Promise<IDeleteVehicleResponse> {
    const vehicleBeforeUpdate =
      await this.vehicleRepository.getVehicleByUuid(uuid)

    vehicleBeforeUpdate.deletedAt = new Date()

    const vehicle = await this.vehicleRepository.save(vehicleBeforeUpdate)

    return { vehicle }
  }
}

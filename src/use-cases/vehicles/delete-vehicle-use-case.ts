import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../../repositories/vehicle-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

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

    if (!vehicleBeforeUpdate) {
      throw new ResourceNotFoundError()
    }

    vehicleBeforeUpdate.deletedAt = new Date()

    const vehicle = await this.vehicleRepository.save(vehicleBeforeUpdate)

    return { vehicle }
  }
}

import { randomUUID } from 'crypto'
import type { Vehicle } from '../../entities/vehicle'
import type { IVehicleRepository } from '../../repositories/vehicle-repository'

interface ICreateVehicleRequest {
  name: string
  model: string
  brand: string
}

interface ICreateVehicleResponse {
  vehicle: Vehicle
}

export class CreateVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute({
    name,
    model,
    brand,
  }: ICreateVehicleRequest): Promise<ICreateVehicleResponse> {
    const vehicle = await this.vehicleRepository.save({
      uuid: randomUUID(),
      name,
      model,
      brand,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    return { vehicle }
  }
}

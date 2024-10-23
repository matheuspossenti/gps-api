import { randomUUID } from 'crypto'
import type { Access } from '../../entities/access'
import type { IAccessRepository } from '../../repositories/access-repository'

interface ICreateAccessRequest {
  driverUuid: string
  vehicleUuid: string
  passengerUuid: string
  methodUsed: string
  latitude: number
  longitude: number
}

interface ICreateAccessResponse {
  access: Access
}

export class CreateAccessUseCase {
  constructor(private readonly accessRepository: IAccessRepository) {}

  public async execute({
    driverUuid,
    vehicleUuid,
    passengerUuid,
    methodUsed,
    latitude,
    longitude,
  }: ICreateAccessRequest): Promise<ICreateAccessResponse> {
    const access = await this.accessRepository.save({
      uuid: randomUUID(),
      driverUuid,
      vehicleUuid,
      passengerUuid,
      methodUsed,
      latitude,
      longitude,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    return { access }
  }
}

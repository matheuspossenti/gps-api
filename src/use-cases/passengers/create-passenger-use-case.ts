import { randomUUID } from 'crypto'
import type { Passenger } from '../../entities/passenger'
import type { IPassengerRepository } from '../../repositories/passenger-repository'

interface ICreatePassengerRequest {
  name: string
  tagAccess: string
  biometryTemplate1: string
  biometryTemplate2: string
  biometryTemplate3: string
  uuidVehicleAuthorized: string
}

interface ICreatePassengerResponse {
  passenger: Passenger
}

export class CreatePassengerUseCase {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  public async execute({
    name,
    tagAccess,
    biometryTemplate1,
    biometryTemplate2,
    biometryTemplate3,
  }: ICreatePassengerRequest): Promise<ICreatePassengerResponse> {
    const passenger = await this.passengerRepository.save({
      uuid: randomUUID(),
      name,
      tagAccess,
      biometryTemplate1,
      biometryTemplate2,
      biometryTemplate3,
      uuidVehicleAuthorized: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    return { passenger }
  }
}

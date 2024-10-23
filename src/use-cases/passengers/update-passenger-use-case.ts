import type { Passenger } from '../../entities/passenger'
import type { IPassengerRepository } from '../../repositories/passenger-repository'

interface IUpdatePassengerRequest {
  uuid: string
  data: {
    name?: string
    tagAccess?: string
    biometryTemplate1?: string
    biometryTemplate2?: string
    biometryTemplate3?: string
  }
}

interface IUpdatePassengerResponse {
  passenger: Passenger
}

export class UpdatePassengerUseCase {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  public async execute({
    uuid,
    data,
  }: IUpdatePassengerRequest): Promise<IUpdatePassengerResponse> {
    const passengerBeforeUpdate =
      await this.passengerRepository.getPassengerByUuid(uuid)

    passengerBeforeUpdate.name = data.name || passengerBeforeUpdate.name
    passengerBeforeUpdate.tagAccess =
      data.tagAccess || passengerBeforeUpdate.tagAccess
    passengerBeforeUpdate.biometryTemplate1 =
      data.biometryTemplate1 || passengerBeforeUpdate.biometryTemplate1
    passengerBeforeUpdate.biometryTemplate2 =
      data.biometryTemplate2 || passengerBeforeUpdate.biometryTemplate2
    passengerBeforeUpdate.biometryTemplate3 =
      data.biometryTemplate3 || passengerBeforeUpdate.biometryTemplate3
    passengerBeforeUpdate.updatedAt = new Date()

    const passenger = await this.passengerRepository.save(passengerBeforeUpdate)

    return { passenger }
  }
}

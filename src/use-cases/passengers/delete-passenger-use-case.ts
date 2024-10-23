import type { Passenger } from '../../entities/passenger'
import type { IPassengerRepository } from '../../repositories/passenger-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface IDeletePassengerRequest {
  uuid: string
}

interface IDeletePassengerResponse {
  passenger: Passenger
}

export class DeletePassengerUseCase {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  public async execute({
    uuid,
  }: IDeletePassengerRequest): Promise<IDeletePassengerResponse> {
    const passengerBeforeUpdate =
      await this.passengerRepository.getPassengerByUuid(uuid)

    if (!passengerBeforeUpdate) {
      throw new ResourceNotFoundError()
    }

    passengerBeforeUpdate.deletedAt = new Date()

    const passenger = await this.passengerRepository.save(passengerBeforeUpdate)

    return { passenger }
  }
}

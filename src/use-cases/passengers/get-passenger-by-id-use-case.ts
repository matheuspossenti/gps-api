import type { Passenger } from '../../entities/passenger'
import type { IPassengerRepository } from '../../repositories/passenger-repository'

interface IGetPassengerByIdRequest {
  uuid: string
}

interface IGetPassengerByIdResponse {
  passenger: Passenger
}

export class GetPassengerByIdUseCase {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  public async execute({
    uuid,
  }: IGetPassengerByIdRequest): Promise<IGetPassengerByIdResponse> {
    const passenger = await this.passengerRepository.getPassengerByUuid(uuid)

    return { passenger }
  }
}

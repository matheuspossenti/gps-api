import type { Passenger } from '../../entities/passenger'
import type { IPassengerRepository } from '../../repositories/passenger-repository'

interface IGetPassengersResponse {
  passengers: Passenger[]
}

export class GetPassengersUseCase {
  constructor(private readonly passengerRepository: IPassengerRepository) {}

  public async execute(): Promise<IGetPassengersResponse> {
    const passengers = await this.passengerRepository.getAll()

    return { passengers }
  }
}

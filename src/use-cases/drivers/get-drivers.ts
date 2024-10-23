import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'

interface IGetDriversResponse {
  drivers: Driver[]
}

export class GetDriversUseCase {
  constructor(private readonly driverRepository: IDriverRepository) {}

  public async execute(): Promise<IGetDriversResponse> {
    const drivers = await this.driverRepository.getAll()

    return { drivers }
  }
}

import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface IGetDriverByIdRequest {
  uuid: string
}

interface IGetDriverByIdResponse {
  driver: Driver
}

export class GetDriverByIdUseCase {
  constructor(private readonly driverRepository: IDriverRepository) {}

  public async execute({
    uuid,
  }: IGetDriverByIdRequest): Promise<IGetDriverByIdResponse> {
    const driver = await this.driverRepository.getDriverByUuid(uuid)

    if (!driver) {
      throw new ResourceNotFoundError()
    }

    return { driver }
  }
}

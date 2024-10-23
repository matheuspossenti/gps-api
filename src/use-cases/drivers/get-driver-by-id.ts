import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'

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
    return { driver }
  }
}

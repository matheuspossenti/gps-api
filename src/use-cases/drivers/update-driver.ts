import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'

interface IUpdateDriverRequest {
  uuid: string
  data: {
    name?: string
    tagAccess?: string
  }
}

interface IUpdateDriverResponse {
  driver: Driver
}

export class UpdateDriverUseCase {
  constructor(private readonly driverRepository: IDriverRepository) {}

  public async execute({
    uuid,
    data,
  }: IUpdateDriverRequest): Promise<IUpdateDriverResponse> {
    const DriverBeforeUpdate = await this.driverRepository.getDriverByUuid(uuid)

    DriverBeforeUpdate.name = data.name || DriverBeforeUpdate.name
    DriverBeforeUpdate.tagAccess =
      data.tagAccess || DriverBeforeUpdate.tagAccess

    const driver = await this.driverRepository.save(DriverBeforeUpdate)

    return { driver }
  }
}

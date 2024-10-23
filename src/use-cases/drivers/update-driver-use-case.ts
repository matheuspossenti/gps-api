import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

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
    const driverBeforeUpdate = await this.driverRepository.getDriverByUuid(uuid)

    if (!driverBeforeUpdate) {
      throw new ResourceNotFoundError()
    }

    driverBeforeUpdate.name = data.name || driverBeforeUpdate.name
    driverBeforeUpdate.tagAccess =
      data.tagAccess || driverBeforeUpdate.tagAccess
    driverBeforeUpdate.updatedAt = new Date()

    const driver = await this.driverRepository.save(driverBeforeUpdate)

    return { driver }
  }
}

import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface IDeleteDriverRequest {
  uuid: string
}

interface IDeleteDriverResponse {
  driver: Driver
}

export class DeleteDriverUseCase {
  constructor(private readonly driverRepository: IDriverRepository) {}

  public async execute({
    uuid,
  }: IDeleteDriverRequest): Promise<IDeleteDriverResponse> {
    const driverBeforeUpdate = await this.driverRepository.getDriverByUuid(uuid)

    if (!driverBeforeUpdate) {
      throw new ResourceNotFoundError()
    }

    driverBeforeUpdate.deletedAt = new Date()

    const driver = await this.driverRepository.save(driverBeforeUpdate)

    return { driver }
  }
}

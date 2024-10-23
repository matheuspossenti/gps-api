import { randomUUID } from 'crypto'
import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../../repositories/driver-repository'

interface ICreateDriverRequest {
  name: string
  tagAccess: string
}

interface ICreateDriverResponse {
  driver: Driver
}

export class CreateDriverUseCase {
  constructor(private readonly driverRepository: IDriverRepository) {}

  public async execute({
    name,
    tagAccess,
  }: ICreateDriverRequest): Promise<ICreateDriverResponse> {
    const driver = await this.driverRepository.save({
      uuid: randomUUID(),
      name,
      tagAccess,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    return { driver }
  }
}

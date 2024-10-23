import type { Access } from '../../entities/access'
import type { IAccessRepository } from '../../repositories/access-repository'

interface IGetAccessResponse {
  access: Access[]
}

export class GetAccessUseCase {
  constructor(private readonly accessRepository: IAccessRepository) {}

  public async execute(): Promise<IGetAccessResponse> {
    const access = await this.accessRepository.getAll()

    return { access }
  }
}

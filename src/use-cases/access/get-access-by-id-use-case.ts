import type { Access } from '../../entities/access'
import type { IAccessRepository } from '../../repositories/access-repository'

interface IGetAccessByIdRequest {
  uuid: string
}

interface IGetAccessByIdResponse {
  access: Access
}

export class GetAccessByIdUseCase {
  constructor(private readonly accessRepository: IAccessRepository) {}

  public async execute({
    uuid,
  }: IGetAccessByIdRequest): Promise<IGetAccessByIdResponse> {
    const access = await this.accessRepository.getAccessByUuid(uuid)

    return { access }
  }
}

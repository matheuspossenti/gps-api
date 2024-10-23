import type { Coordinate } from '../../entities/coordinate'
import type { ICoordinateRepository } from '../../repositories/coordinate-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

interface IGetCoordinateByIdRequest {
  uuid: string
}

interface IGetCoordinateByIdResponse {
  coordinate: Coordinate
}

export class GetCoordinateByIdUseCase {
  constructor(private readonly coordinateRepository: ICoordinateRepository) {}

  public async execute({
    uuid,
  }: IGetCoordinateByIdRequest): Promise<IGetCoordinateByIdResponse> {
    const coordinate = await this.coordinateRepository.getCoordinateByUuid(uuid)

    if (!coordinate) {
      throw new ResourceNotFoundError()
    }

    return { coordinate }
  }
}

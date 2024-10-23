import type { Coordinate } from '../../entities/coordinate'
import type { ICoordinateRepository } from '../../repositories/coordinate-repository'

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

    return { coordinate }
  }
}

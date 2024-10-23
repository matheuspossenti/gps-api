import type { Coordinate } from '../../entities/coordinate'
import type { ICoordinateRepository } from '../../repositories/coordinate-repository'

interface IGetCoordinatesResponse {
  coordinates: Coordinate[]
}

export class GetCoordinatesUseCase {
  constructor(private readonly coordinateRepository: ICoordinateRepository) {}

  public async execute(): Promise<IGetCoordinatesResponse> {
    const coordinates = await this.coordinateRepository.getAll()

    return { coordinates }
  }
}

import { randomUUID } from 'crypto'
import type { Coordinate } from '../../entities/coordinate'
import type { ICoordinateRepository } from '../../repositories/coordinate-repository'

interface ICreateCoordinateRequest {
  latitude: number
  longitude: number
  pontoCardeal: string
  driverUuid: string
  vehicleUuid: string
}

interface ICreateCoordinateResponse {
  coordinate: Coordinate
}

export class CreateCoordinateUseCase {
  constructor(private readonly coordinateRepository: ICoordinateRepository) {}

  public async execute({
    latitude,
    longitude,
    pontoCardeal,
    driverUuid,
    vehicleUuid,
  }: ICreateCoordinateRequest): Promise<ICreateCoordinateResponse> {
    const coordinate = await this.coordinateRepository.save({
      uuid: randomUUID(),
      latitude,
      longitude,
      pontoCardeal,
      driverUuid,
      vehicleUuid,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    return { coordinate }
  }
}

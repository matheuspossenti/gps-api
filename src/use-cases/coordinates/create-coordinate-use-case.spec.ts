import { InMemoryCoordinatesRepository } from '@/repositories/in-memory/in-memory-coordinate-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateCoordinateUseCase } from './create-coordinate-use-case'

let coordinateRepository: InMemoryCoordinatesRepository
let sut: CreateCoordinateUseCase

describe('Create Coordinate Use Case', () => {
  beforeEach(() => {
    coordinateRepository = new InMemoryCoordinatesRepository()
    sut = new CreateCoordinateUseCase(coordinateRepository)
  })

  it('should be able to create a coordinate', async () => {
    const { coordinate } = await sut.execute({
      latitude: 0,
      longitude: 0,
      pontoCardeal: 'N',
      driverUuid: '1',
      vehicleUuid: '1',
    })

    expect(coordinate.uuid).toEqual(expect.any(String))
  })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { GetCoordinatesUseCase } from './get-coordinates-use-case'
import { InMemoryCoordinatesRepository } from '@/repositories/in-memory/in-memory-coordinate-repository'

let coordinateRepository: InMemoryCoordinatesRepository
let sut: GetCoordinatesUseCase

describe('Get Coordinates Use Case', () => {
  beforeEach(() => {
    coordinateRepository = new InMemoryCoordinatesRepository()
    sut = new GetCoordinatesUseCase(coordinateRepository)
  })

  it('should be able to get all coordinates', async () => {
    await coordinateRepository.save({
      uuid: '1',
      latitude: 0,
      longitude: 0,
      pontoCardeal: 'N',
      driverUuid: '1',
      vehicleUuid: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await coordinateRepository.save({
      uuid: '2',
      latitude: 0,
      longitude: 0,
      pontoCardeal: 'N',
      driverUuid: '1',
      vehicleUuid: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { coordinates } = await sut.execute()

    expect(coordinates).toHaveLength(2)
    expect(coordinates[0].uuid).toBe('1')
  })
})

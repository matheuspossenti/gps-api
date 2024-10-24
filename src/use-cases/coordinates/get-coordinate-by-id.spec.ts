import { InMemoryCoordinatesRepository } from '@/repositories/in-memory/in-memory-coordinate-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetCoordinateByIdUseCase } from './get-coordinate-by-id'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let coordinateRepository: InMemoryCoordinatesRepository
let sut: GetCoordinateByIdUseCase

describe('Get Coordinate By Id', () => {
  beforeEach(() => {
    coordinateRepository = new InMemoryCoordinatesRepository()
    sut = new GetCoordinateByIdUseCase(coordinateRepository)
  })

  it('should be able to get a coordinate by id', async () => {
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

    const { coordinate } = await sut.execute({
      uuid: '1',
    })

    expect(coordinate.uuid).toBe('1')
  })

  it('should not be able to get a coordinate by id if it does not exist', async () => {
    expect(
      sut.execute({
        uuid: '1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

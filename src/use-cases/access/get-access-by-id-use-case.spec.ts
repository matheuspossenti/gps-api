import { beforeEach, describe, expect, it } from 'vitest'
import { GetAccessByIdUseCase } from './get-access-by-id-use-case'
import { InMemoryAccessRepository } from '@/repositories/in-memory/in-memory-access-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let accessRepository: InMemoryAccessRepository
let sut: GetAccessByIdUseCase

describe('Get Access By Id Use Case', () => {
  beforeEach(() => {
    accessRepository = new InMemoryAccessRepository()
    sut = new GetAccessByIdUseCase(accessRepository)
  })

  it('should get an access by id', async () => {
    await accessRepository.save({
      uuid: '1',
      driverUuid: '1',
      vehicleUuid: '2',
      passengerUuid: '3',
      methodUsed: 'biometry',
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await accessRepository.save({
      uuid: '2',
      driverUuid: '1',
      vehicleUuid: '2',
      passengerUuid: '3',
      methodUsed: 'biometry',
      latitude: 0,
      longitude: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { access } = await sut.execute({ uuid: '1' })

    expect(access.uuid).toBe('1')
  })

  it('should not be able to get an access by id if it does not exist', async () => {
    expect(async () => {
      await sut.execute({ uuid: '1' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

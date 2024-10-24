import { InMemoryAccessRepository } from '@/repositories/in-memory/in-memory-access-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAccessUseCase } from './get-access-use-case'

let accessRepository: InMemoryAccessRepository
let sut: GetAccessUseCase

describe('Get Access Use Case', () => {
  beforeEach(() => {
    accessRepository = new InMemoryAccessRepository()
    sut = new GetAccessUseCase(accessRepository)
  })

  it('should be able to get all access', async () => {
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

    const { access } = await sut.execute()

    expect(access).toHaveLength(2)
    expect(access[0].uuid).toBe('1')
  })
})

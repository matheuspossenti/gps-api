import { InMemoryAccessRepository } from '@/repositories/in-memory/in-memory-access-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAccessUseCase } from './create-access-use-case'

let accessRepository: InMemoryAccessRepository
let sut: CreateAccessUseCase

describe('Create Access Use Case', () => {
  beforeEach(() => {
    accessRepository = new InMemoryAccessRepository()
    sut = new CreateAccessUseCase(accessRepository)
  })

  it('should create an access', async () => {
    const { access } = await sut.execute({
      driverUuid: '1',
      vehicleUuid: '2',
      passengerUuid: '3',
      methodUsed: 'biometry',
      latitude: 0,
      longitude: 0,
    })

    expect(access.uuid).toEqual(expect.any(String))
  })
})

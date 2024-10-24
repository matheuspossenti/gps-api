import { InMemoryDriversRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetDriversUseCase } from './get-drivers-use-case'

let driverRepository: InMemoryDriversRepository
let sut: GetDriversUseCase

describe('Driver Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriversRepository()
    sut = new GetDriversUseCase(driverRepository)
  })

  it('should be able to get all drivers', async () => {
    await driverRepository.save({
      uuid: '1',
      name: 'John Doe',
      tagAccess: 'A1B2C3',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await driverRepository.save({
      uuid: '2',
      name: 'Tui',
      tagAccess: 'A1B2C3',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { drivers } = await sut.execute()

    expect(drivers).toHaveLength(2)
    expect(drivers[0].name).toBe('John Doe')
  })
})

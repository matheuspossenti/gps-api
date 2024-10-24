import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDriversRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { UpdateDriverUseCase } from './update-driver-use-case'

let driverRepository: InMemoryDriversRepository
let sut: UpdateDriverUseCase

describe('Update Driver Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriversRepository()
    sut = new UpdateDriverUseCase(driverRepository)
  })

  it('should be able to update a driver', async () => {
    await driverRepository.save({
      uuid: '1',
      name: 'John Doe',
      tagAccess: 'A1B2C3',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { driver } = await sut.execute({
      uuid: '1',
      data: {
        name: 'John Doe Updated',
        tagAccess: 'A1B2C3',
      },
    })

    expect(driver?.name).toBe('John Doe Updated')
  })
})

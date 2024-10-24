import { InMemoryDriversRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetDriverByIdUseCase } from './get-driver-by-id-use-case'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let driverRepository: InMemoryDriversRepository
let sut: GetDriverByIdUseCase

describe('Get Driver By Id Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriversRepository()
    sut = new GetDriverByIdUseCase(driverRepository)
  })

  it('should be able to get a driver by id', async () => {
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

    const { driver } = await sut.execute({
      uuid: '1',
    })

    expect(driver.name).toBe('John Doe')
  })

  it('should not be able to get a driver by id if it does not exist', async () => {
    expect(() =>
      sut.execute({
        uuid: '1',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

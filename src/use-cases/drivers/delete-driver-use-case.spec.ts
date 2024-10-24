import { InMemoryDriversRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteDriverUseCase } from './delete-driver-use-case'

let driverRepository: InMemoryDriversRepository
let sut: DeleteDriverUseCase

describe('Delete Driver Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriversRepository()
    sut = new DeleteDriverUseCase(driverRepository)
  })

  it('should be able to delete a driver', async () => {
    await driverRepository.save({
      uuid: '1',
      name: 'John Doe',
      tagAccess: 'A1B2C3',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await sut.execute({
      uuid: '1',
    })

    const driver = await driverRepository.getDriverByUuid('1')

    expect(driver?.deletedAt).toEqual(expect.any(Date))
  })
})

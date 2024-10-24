import { beforeEach, describe, expect, it } from 'vitest'
import { CreateDriverUseCase } from './create-driver-use-case'
import { InMemoryDriversRepository } from '@/repositories/in-memory/in-memory-driver-repository'

let driverRepository: InMemoryDriversRepository
let sut: CreateDriverUseCase

describe('Create Driver Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriversRepository()
    sut = new CreateDriverUseCase(driverRepository)
  })

  it('should be able to create a driver', async () => {
    const { driver } = await sut.execute({
      name: 'John Doe',
      tagAccess: 'A1B2C3',
    })

    expect(driver.uuid).toEqual(expect.any(String))
  })
})

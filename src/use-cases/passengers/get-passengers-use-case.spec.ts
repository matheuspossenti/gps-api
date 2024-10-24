import { InMemoryPassengersRepository } from '@/repositories/in-memory/in-memory-passenger-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPassengersUseCase } from './get-passengers-use-case'

let passengerRepository: InMemoryPassengersRepository
let sut: GetPassengersUseCase

describe('Get Passengers Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengersRepository()
    sut = new GetPassengersUseCase(passengerRepository)
  })

  it('should be able to get all passengers', async () => {
    await passengerRepository.save({
      uuid: '1',
      name: 'John Doe',
      tagAccess: '123456',
      biometryTemplate1: '123456',
      biometryTemplate2: '123456',
      biometryTemplate3: '123456',
      uuidVehicleAuthorized: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await passengerRepository.save({
      uuid: '2',
      name: 'Jane Doe',
      tagAccess: '123456',
      biometryTemplate1: '123456',
      biometryTemplate2: '123456',
      biometryTemplate3: '123456',
      uuidVehicleAuthorized: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { passengers } = await sut.execute()

    expect(passengers).toHaveLength(2)
    expect(passengers[0].name).toBe('John Doe')
  })
})

import { InMemoryPassengersRepository } from '@/repositories/in-memory/in-memory-passenger-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UpdatePassengerUseCase } from './update-passenger-use-case'

let passengerRepository: InMemoryPassengersRepository
let sut: UpdatePassengerUseCase

describe('Update Passenger Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengersRepository()
    sut = new UpdatePassengerUseCase(passengerRepository)
  })

  it('should be able to update a passenger', async () => {
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

    const { passenger } = await sut.execute({
      uuid: '1',
      data: {
        name: 'John Doe Updated',
      },
    })

    expect(passenger.name).toBe('John Doe Updated')
  })
})

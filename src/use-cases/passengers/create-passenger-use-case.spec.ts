import { InMemoryPassengersRepository } from '@/repositories/in-memory/in-memory-passenger-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePassengerUseCase } from './create-passenger-use-case'

let passengerRepository: InMemoryPassengersRepository
let sut: CreatePassengerUseCase

describe('Create Passenger Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengersRepository()
    sut = new CreatePassengerUseCase(passengerRepository)
  })

  it('should be able to create a passenger', async () => {
    const { passenger } = await sut.execute({
      name: 'John Doe',
      tagAccess: '123456',
      biometryTemplate1: '123456',
      biometryTemplate2: '123456',
      biometryTemplate3: '123456',
    })

    expect(passenger.uuid).toEqual(expect.any(String))
  })
})

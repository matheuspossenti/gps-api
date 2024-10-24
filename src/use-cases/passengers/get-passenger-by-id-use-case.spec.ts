import { beforeEach, describe, expect, it } from 'vitest'
import { GetPassengerByIdUseCase } from './get-passenger-by-id-use-case'
import { InMemoryPassengersRepository } from '@/repositories/in-memory/in-memory-passenger-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let passengerRepository: InMemoryPassengersRepository
let sut: GetPassengerByIdUseCase

describe('Get Passenger By Id Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengersRepository()
    sut = new GetPassengerByIdUseCase(passengerRepository)
  })

  it('should be able to get a passenger by id', async () => {
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

    const { passenger } = await sut.execute({ uuid: '1' })

    expect(passenger.name).toBe('John Doe')
  })

  it('should not be able to get a passenger by id if it does not exist', async () => {
    expect(sut.execute({ uuid: '1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

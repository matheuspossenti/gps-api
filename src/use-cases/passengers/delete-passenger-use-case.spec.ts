import { InMemoryPassengersRepository } from '@/repositories/in-memory/in-memory-passenger-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeletePassengerUseCase } from './delete-passenger-use-case'
import { randomUUID } from 'crypto'

let passengerRepository: InMemoryPassengersRepository
let sut: DeletePassengerUseCase

describe('Delete Passenger Use Case', () => {
  beforeEach(() => {
    passengerRepository = new InMemoryPassengersRepository()
    sut = new DeletePassengerUseCase(passengerRepository)
  })

  it('should be able to delete a passenger', async () => {
    await passengerRepository.save({
      uuid: '1',
      name: 'John Doe',
      tagAccess: '123456',
      biometryTemplate1: '123456',
      biometryTemplate2: '123456',
      biometryTemplate3: '123456',
      uuidVehicleAuthorized: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await sut.execute({ uuid: '1' })

    const passenger = await passengerRepository.getPassengerByUuid('1')

    expect(passenger?.deletedAt).toEqual(expect.any(Date))
  })
})

import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { UpdateVehicleUseCase } from './update-vehicle-use-case'
import { beforeEach, describe, expect, it } from 'vitest'

let vehicleRepository: InMemoryVehiclesRepository
let sut: UpdateVehicleUseCase

describe('Update Vehicle Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehiclesRepository()
    sut = new UpdateVehicleUseCase(vehicleRepository)
  })

  it('should be able to update a vehicle', async () => {
    await vehicleRepository.save({
      uuid: '1',
      name: 'Car',
      brand: 'Fiat',
      model: 'Uno',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { vehicle } = await sut.execute({
      uuid: '1',
      data: {
        name: 'Car Updated',
        brand: 'Fiat',
        model: 'Uno',
      },
    })

    expect(vehicle.name).toBe('Car Updated')
  })
})

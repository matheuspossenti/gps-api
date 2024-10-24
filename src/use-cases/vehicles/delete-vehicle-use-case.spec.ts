import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteVehicleUseCase } from './delete-vehicle-use-case'

let vehicleRepository: InMemoryVehiclesRepository
let sut: DeleteVehicleUseCase

describe('Delete Vehicle Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehiclesRepository()
    sut = new DeleteVehicleUseCase(vehicleRepository)
  })

  it('should be able to delete a vehicle', async () => {
    await vehicleRepository.save({
      uuid: '1',
      name: 'Car',
      brand: 'Fiat',
      model: 'Uno',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { vehicle } = await sut.execute({ uuid: '1' })

    expect(vehicle.deletedAt).toEqual(expect.any(Date))
  })
})

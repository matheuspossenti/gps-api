import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetVehiclesUseCase } from './get-vehicles-use-case'

let vehicleRepository: InMemoryVehiclesRepository
let sut: GetVehiclesUseCase

describe('Get Vehicles Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehiclesRepository()
    sut = new GetVehiclesUseCase(vehicleRepository)
  })

  it('should be able to get all vehicles', async () => {
    await vehicleRepository.save({
      uuid: '1',
      name: 'Car',
      brand: 'Fiat',
      model: 'Uno',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    await vehicleRepository.save({
      uuid: '2',
      name: 'Caminhao',
      brand: 'Volks',
      model: 'A1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const { vehicles } = await sut.execute()

    expect(vehicles).toHaveLength(2)
    expect(vehicles[0].name).toBe('Car')
  })
})

import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateVehicleUseCase } from './create-vehicle-use-case'

let vehicleRepository: InMemoryVehiclesRepository
let sut: CreateVehicleUseCase

describe('Create Vehicle Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehiclesRepository()
    sut = new CreateVehicleUseCase(vehicleRepository)
  })

  it('should be able to create a vehicle', async () => {
    const { vehicle } = await sut.execute({
      name: 'Carro',
      model: 'Fusca',
      brand: 'Volkswagen',
    })

    expect(vehicle.uuid).toEqual(expect.any(String))
  })
})

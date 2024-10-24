import { InMemoryVehiclesRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetVehicleByIdUseCase } from './get-vehicle-by-id-use-case'
import { ResourceNotFoundError } from '../errors/resource-not-found'

let vehicleRepository: InMemoryVehiclesRepository
let sut: GetVehicleByIdUseCase

describe('Get Vehicle By Id Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehiclesRepository()
    sut = new GetVehicleByIdUseCase(vehicleRepository)
  })

  it('should be able to get a vehicle by id', async () => {
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

    const { vehicle } = await sut.execute({ uuid: '1' })

    expect(vehicle.name).toBe('Car')
  })

  it('should not be able to get a vehicle by id if it does not exist', async () => {
    expect(sut.execute({ uuid: '1' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

import type { FastifyReply, FastifyRequest } from 'fastify'
import { KnexVehicleRepository } from '../../../repositories/knex/knex-vehicle-repository'
import { GetVehiclesUseCase } from '../../../use-cases/vehicles/get-vehicles-use-case'

export async function showAll(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const vehicleRepository = new KnexVehicleRepository()
  const getVehiclesUseCase = new GetVehiclesUseCase(vehicleRepository)

  const { vehicles } = await getVehiclesUseCase.execute()

  return reply.status(200).send(vehicles)
}

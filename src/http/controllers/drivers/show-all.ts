import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetDriversUseCase } from '../../../use-cases/drivers/get-drivers'
import { KnexDriverRepository } from '../../../repositories/knex/knex-driver-repository'

export async function showAll(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const driverRepository = new KnexDriverRepository()
  const getDriversUseCase = new GetDriversUseCase(driverRepository)

  const { drivers } = await getDriversUseCase.execute()

  return reply.status(200).send(drivers)
}

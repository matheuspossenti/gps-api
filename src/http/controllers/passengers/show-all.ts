import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetPassengersUseCase } from '../../../use-cases/passengers/get-passengers-use-case'
import { KnexPassengerRepository } from '../../../repositories/knex/knex-passenger-repository'

export async function showAll(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const passengerRepository = new KnexPassengerRepository()
  const getPassengersUseCase = new GetPassengersUseCase(passengerRepository)

  const { passengers } = await getPassengersUseCase.execute()

  return reply.status(200).send(passengers)
}

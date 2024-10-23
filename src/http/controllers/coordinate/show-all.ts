import type { FastifyReply, FastifyRequest } from 'fastify'
import { GetCoordinatesUseCase } from '../../../use-cases/coordinates/get-coordinates-use-case'
import { KnexCoordinatesRepository } from '../../../repositories/knex/knex-coordinates-repository'

export async function showAll(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const coordinateRepository = new KnexCoordinatesRepository()
  const getCoordinateUseCase = new GetCoordinatesUseCase(coordinateRepository)

  const { coordinates } = await getCoordinateUseCase.execute()

  return reply.status(200).send(coordinates)
}

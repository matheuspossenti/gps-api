import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexCoordinatesRepository } from '../../../repositories/knex/knex-coordinates-repository'
import { GetCoordinateByIdUseCase } from '../../../use-cases/coordinates/get-coordinate-by-id'

export async function showByUuid(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const getByUuidCoordinateBodySchema = yup.object({
    uuid: yup.string().required().uuid('Invalid UUID'),
  })

  const { uuid } = await getByUuidCoordinateBodySchema.validate(request.params)

  const coordinateRepository = new KnexCoordinatesRepository()
  const getCoordinateUseCase = new GetCoordinateByIdUseCase(
    coordinateRepository,
  )

  const { coordinate } = await getCoordinateUseCase.execute({ uuid })

  return reply.status(200).send(coordinate)
}

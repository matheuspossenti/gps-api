import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexPassengerRepository } from '../../../repositories/knex/knex-passenger-repository'
import { GetPassengerByIdUseCase } from '../../../use-cases/passengers/get-passenger-by-id-use-case'

export async function showByUuid(request: FastifyRequest, reply: FastifyReply) {
  const getPassengerByUuidParamsSchema = yup.object({
    uuid: yup.string().required().uuid('Invalid UUID'),
  })

  const { uuid } = await getPassengerByUuidParamsSchema.validate(request.params)

  const passengerRepository = new KnexPassengerRepository()
  const getPassengersUseCase = new GetPassengerByIdUseCase(passengerRepository)

  const { passenger } = await getPassengersUseCase.execute({ uuid })

  return reply.status(200).send(passenger)
}

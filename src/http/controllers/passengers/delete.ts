import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexPassengerRepository } from '../../../repositories/knex/knex-passenger-repository'
import { DeletePassengerUseCase } from '../../../use-cases/passengers/delete-passenger-use-case'

export async function deletePassenger(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deletePassengerParamsSchema = yup.object({
    uuid: yup.string().required('UUID is a required field'),
  })

  const { uuid } = await deletePassengerParamsSchema.validate(request.params)

  const passengerRepository = new KnexPassengerRepository()
  const deletePassengerUseCase = new DeletePassengerUseCase(passengerRepository)

  const { passenger } = await deletePassengerUseCase.execute({
    uuid,
  })

  return reply.status(201).send({
    passenger,
  })
}

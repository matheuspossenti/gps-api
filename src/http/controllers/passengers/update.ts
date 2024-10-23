import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexPassengerRepository } from '../../../repositories/knex/knex-passenger-repository'
import { UpdatePassengerUseCase } from '../../../use-cases/passengers/update-passenger-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePassengerParamsSchema = yup.object({
    uuid: yup.string().required(),
  })

  const updatePassengerBodySchema = yup.object({
    name: yup.string().optional(),
    tagAccess: yup.string().optional(),
    biometryTemplate1: yup.string().optional(),
    biometryTemplate2: yup.string().optional(),
    biometryTemplate3: yup.string().optional(),
  })

  const { uuid } = await updatePassengerParamsSchema.validate(request.params)
  const {
    name,
    tagAccess,
    biometryTemplate1,
    biometryTemplate2,
    biometryTemplate3,
  } = await updatePassengerBodySchema.validate(request.body)

  const passengerRepository = new KnexPassengerRepository()
  const updatePassengerUseCase = new UpdatePassengerUseCase(passengerRepository)

  const { passenger } = await updatePassengerUseCase.execute({
    uuid,
    data: {
      name,
      tagAccess,
      biometryTemplate1,
      biometryTemplate2,
      biometryTemplate3,
    },
  })

  return reply.status(201).send({
    passenger,
  })
}

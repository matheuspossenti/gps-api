import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexPassengerRepository } from '../../../repositories/knex/knex-passenger-repository'
import { CreatePassengerUseCase } from '../../../use-cases/passengers/create-passenger-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPassengerBodySchema = yup.object({
    name: yup.string().required('Name is a required field'),
    tagAccess: yup.string().required('Tag access is a required field'),
    biometryTemplate1: yup
      .string()
      .required('Biometry template 1 is a required field'),
    biometryTemplate2: yup
      .string()
      .required('Biometry template 2 is a required field'),
    biometryTemplate3: yup
      .string()
      .required('Biometry template 3 is a required field'),
  })

  const {
    name,
    tagAccess,
    biometryTemplate1,
    biometryTemplate2,
    biometryTemplate3,
  } = await createPassengerBodySchema.validate(request.body)

  const passengerRepository = new KnexPassengerRepository()
  const createPassengerUseCase = new CreatePassengerUseCase(passengerRepository)

  const { passenger } = await createPassengerUseCase.execute({
    name,
    tagAccess,
    biometryTemplate1,
    biometryTemplate2,
    biometryTemplate3,
  })

  return reply.status(201).send(passenger)
}

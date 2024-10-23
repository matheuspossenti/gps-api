import { FastifyRequest, FastifyReply } from 'fastify'
import * as yup from 'yup'
import { KnexAccessRepository } from '../../../repositories/knex/knex-access-repository'
import { CreateAccessUseCase } from '../../../use-cases/access/create-access-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createAccessParamsSchema = yup.object({
    driverUuid: yup.string().required().uuid('Invalid UUID'),
    passengerUuid: yup.string().required().uuid('Invalid UUID'),
    vehicleUuid: yup.string().required().uuid('Invalid UUID'),
    methodUsed: yup.string().required(),
    latitude: yup
      .number()
      .required()
      .test(
        'is-valid-latitude',
        'Latitude must be between -90 and 90',
        (value) => value !== undefined && Math.abs(value) <= 90,
      ),
    longitude: yup
      .number()
      .required()
      .test(
        'is-valid-longitude',
        'Longitude must be between -180 and 180',
        (value) => value !== undefined && Math.abs(value) <= 180,
      ),
  })

  const {
    driverUuid,
    passengerUuid,
    vehicleUuid,
    methodUsed,
    latitude,
    longitude,
  } = await createAccessParamsSchema.validate(request.body)

  const accessRepository = new KnexAccessRepository()
  const createAccessUseCase = new CreateAccessUseCase(accessRepository)

  const { access } = await createAccessUseCase.execute({
    driverUuid,
    passengerUuid,
    vehicleUuid,
    methodUsed,
    latitude,
    longitude,
  })

  return reply.status(201).send(access)
}

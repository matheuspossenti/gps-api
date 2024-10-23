import { FastifyRequest, FastifyReply } from 'fastify'
import * as yup from 'yup'
import { KnexCoordinatesRepository } from '../../../repositories/knex/knex-coordinates-repository'
import { CreateCoordinateUseCase } from '../../../use-cases/coordinates/create-coordinate-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCoordinateParamsSchema = yup.object({
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
    pontoCardeal: yup.string().required().oneOf(['N', 'S', 'E', 'W']),
    driverUuid: yup.string().required().uuid('Invalid driver UUID'),
    vehicleUuid: yup.string().required().uuid('Invalid passenger UUID'),
  })

  const { latitude, longitude, pontoCardeal, driverUuid, vehicleUuid } =
    await createCoordinateParamsSchema.validate(request.body)

  const coordinateRepository = new KnexCoordinatesRepository()
  const createCoordinateUseCase = new CreateCoordinateUseCase(
    coordinateRepository,
  )

  const { coordinate } = await createCoordinateUseCase.execute({
    latitude,
    longitude,
    pontoCardeal,
    driverUuid,
    vehicleUuid,
  })

  return reply.status(201).send(coordinate)
}

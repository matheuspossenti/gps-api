import type { FastifyInstance } from 'fastify'
import * as yup from 'yup'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function coordinateRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const coordinates = await knex('coordinates').select('*')
    return coordinates
  })

  app.post('/', async (request, reply) => {
    const createCoordinatesBodySchema = yup.object({
      latitude: yup.number().required(),
      longitude: yup.number().required(),
      pontoCardeal: yup.string().required(),
      driverId: yup.string().required(),
      vehicleId: yup.string().required(),
    })

    const { latitude, longitude, pontoCardeal, driverId, vehicleId } =
      await createCoordinatesBodySchema.validate(request.body)

    const [coordinate] = await knex('coordinates')
      .insert({
        uuid: randomUUID(),
        latitude,
        longitude,
        pontoCardeal,
        driverId,
        vehicleId,
      })
      .returning('*')
    return reply.status(201).send(coordinate)
  })
}

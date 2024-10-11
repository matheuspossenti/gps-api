import type { FastifyInstance } from 'fastify'
import { knex } from '../database'
import * as yup from 'yup'
import { randomUUID } from 'crypto'

export async function accessRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const access = await knex('access').select('*')
    return access
  })

  app.post('/', async (request, reply) => {
    const createAccessBodySchema = yup.object({
      driverId: yup.string().required(),
      vehicleId: yup.string().required(),
      passengerId: yup.string().required(),
      methodUsed: yup.string().required(),
      latitude: yup.number().required(),
      longitude: yup.number().required(),
    })

    const {
      driverId,
      vehicleId,
      passengerId,
      methodUsed,
      latitude,
      longitude,
    } = await createAccessBodySchema.validate(request.body)

    const [access] = await knex('access')
      .insert({
        uuid: randomUUID(),
        driverId,
        vehicleId,
        passengerId,
        methodUsed,
        latitude,
        longitude,
      })
      .returning('*')

    return reply.status(201).send(access)
  })
}

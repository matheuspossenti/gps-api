import type { FastifyInstance } from 'fastify'
import * as yup from 'yup'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function passengerRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const passenger = await knex('passengers').select('*')
    return passenger
  })

  app.post('/', async (request, reply) => {
    const createPassengerBodySchema = yup.object({
      name: yup.string().required(),
      tagAccess: yup.string().required(),
      biometryTemplate1: yup.string().required(),
      biometryTemplate2: yup.string().required(),
      biometryTemplate3: yup.string().required(),
    })

    const {
      name,
      tagAccess,
      biometryTemplate1,
      biometryTemplate2,
      biometryTemplate3,
    } = await createPassengerBodySchema.validate(request.body)

    const [passenger] = await knex('passengers')
      .insert({
        uuid: randomUUID(),
        name,
        tagAccess,
        biometryTemplate1,
        biometryTemplate2,
        biometryTemplate3,
        uuidVehicleAuthorized: randomUUID(),
      })
      .returning('*')

    return reply.status(201).send(passenger)
  })
}

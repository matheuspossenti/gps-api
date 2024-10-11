import type { FastifyInstance, FastifyRequest } from 'fastify'
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

  app.put(
    '/:uuid',
    async (
      request: FastifyRequest<{
        Params: { uuid: string }
        Body: {
          name: string
          tagAccess: string
          biometryTemplate1: string
          biometryTemplate2: string
          biometryTemplate3: string
        }
      }>,
      reply,
    ) => {
      const updatePassengerBodySchema = yup.object({
        uuid: yup.string().uuid().required(),
        name: yup.string().optional(),
        tagAccess: yup.string().optional(),
        biometryTemplate1: yup.string().optional(),
        biometryTemplate2: yup.string().optional(),
        biometryTemplate3: yup.string().optional(),
      })

      const {
        uuid,
        name,
        tagAccess,
        biometryTemplate1,
        biometryTemplate2,
        biometryTemplate3,
      } = await updatePassengerBodySchema.validate({
        uuid: request.params.uuid,
        ...request.body,
      })

      const [passenger] = await knex('passengers')
        .where({ uuid })
        .update({
          name,
          tagAccess,
          biometryTemplate1,
          biometryTemplate2,
          biometryTemplate3,
        })
        .returning('*')

      return reply.status(200).send(passenger)
    },
  )

  app.delete('/:uuid', async (request, reply) => {
    const deletePassengerBodySchema = yup.object({
      uuid: yup.string().uuid().required(),
    })

    const { uuid } = await deletePassengerBodySchema.validate(request.params)

    await knex('passengers').where({ uuid }).update({
      deletedAt: knex.fn.now(),
    })

    return reply.status(204).send()
  })
}

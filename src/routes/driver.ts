import { randomUUID } from 'crypto'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { knex } from '../database'

export async function driverRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const drivers = await knex('drivers').whereNull('deletedAt').select('*')
    return drivers
  })

  app.post('/', async (request, reply) => {
    const createDriverBodySchema = yup.object({
      name: yup.string().required(),
      tagAccess: yup.string().required(),
    })

    const { name, tagAccess } = await createDriverBodySchema.validate(
      request.body,
    )

    const [driver] = await knex('drivers')
      .insert({
        uuid: randomUUID(),
        name,
        tagAccess,
      })
      .returning('*')

    return reply.status(201).send(driver)
  })

  app.put(
    '/:uuid',
    async (
      request: FastifyRequest<{
        Params: { uuid: string }
        Body: { name: string; tagAccess: string }
      }>,
      reply,
    ) => {
      try {
        const updateDriverBodySchema = yup.object({
          uuid: yup.string().uuid().required(),
          name: yup.string().optional(),
          tagAccess: yup.string().optional(),
        })

        const { uuid } = request.params
        const { name, tagAccess } = request.body

        await updateDriverBodySchema.validate({
          uuid,
          name,
          tagAccess,
        })

        const [driver] = await knex('drivers')
          .where({ uuid })
          .update({
            name,
            tagAccess,
            updatedAt: knex.fn.now(),
          })
          .returning('*')

        return reply.status(200).send(driver)
      } catch (error) {
        console.error(error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )

  app.delete('/:uuid', async (request, reply) => {
    const deleteDriverBodySchema = yup.object({
      uuid: yup.string().uuid().required(),
    })

    const { uuid } = await deleteDriverBodySchema.validate(request.params)

    await knex('drivers').where({ uuid }).update({ deletedAt: knex.fn.now() })

    return reply.status(204).send()
  })
}

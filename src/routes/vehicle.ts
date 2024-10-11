import type { FastifyInstance, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { knex } from '../database'
import { randomUUID } from 'crypto'

export async function vehicleRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const vehicles = await knex('vehicles').whereNull('deletedAt').select('*')
    return vehicles
  })

  app.post('/', async (request, reply) => {
    const createVehicleBodySchema = yup.object({
      name: yup.string().required(),
      model: yup.string().required(),
      brand: yup.string().required(),
    })

    const { name, model, brand } = await createVehicleBodySchema.validate(
      request.body,
    )

    const [vehicle] = await knex('vehicles')
      .insert({
        uuid: randomUUID(),
        name,
        model,
        brand,
      })
      .returning('*')

    return reply.status(201).send(vehicle)
  })

  app.put(
    '/:uuid',
    async (
      request: FastifyRequest<{
        Params: { uuid: string }
        Body: { name: string; model: string; brand: string }
      }>,
      reply,
    ) => {
      const updateVehicleBodySchema = yup.object({
        uuid: yup.string().uuid().required(),
        name: yup.string().optional(),
        model: yup.string().optional(),
        brand: yup.string().optional(),
      })

      const { uuid } = request.params
      const { name, model, brand } = request.body

      await updateVehicleBodySchema.validate({
        uuid,
        name,
        model,
        brand,
      })

      const [vehicle] = await knex('vehicles')
        .where({ uuid })
        .update({
          name,
          model,
          brand,
          updatedAt: knex.fn.now(),
        })
        .returning('*')

      return reply.send(vehicle)
    },
  )

  app.delete('/:uuid', async (request, reply) => {
    const deleteVehicleBodySchema = yup.object({
      uuid: yup.string().uuid().required(),
    })

    const { uuid } = await deleteVehicleBodySchema.validate(request.params)

    await knex('vehicles').where({ uuid }).update({ deletedAt: knex.fn.now() })

    return reply.status(204).send()
  })
}

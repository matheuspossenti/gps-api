import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexVehicleRepository } from '../../../repositories/knex/knex-vehicle-repository'
import { UpdateVehicleUseCase } from '../../../use-cases/vehicles/update-vehicle-use-case'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateVehicleParamsSchema = yup.object({
    uuid: yup.string().required(),
  })

  const updateVehicleBodySchema = yup.object({
    name: yup.string().optional(),
    brand: yup.string().optional(),
    model: yup.string().optional(),
  })

  const { uuid } = await updateVehicleParamsSchema.validate(request.params)
  const { name, brand, model } = await updateVehicleBodySchema.validate(
    request.body,
  )

  const vehicleRepository = new KnexVehicleRepository()
  const updateVehicleUseCase = new UpdateVehicleUseCase(vehicleRepository)

  const { vehicle } = await updateVehicleUseCase.execute({
    uuid,
    data: {
      name,
      brand,
      model,
    },
  })

  return reply.status(201).send({
    vehicle,
  })
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexVehicleRepository } from '../../../repositories/knex/knex-vehicle-repository'
import { DeleteVehicleUseCase } from '../../../use-cases/vehicles/delete-vehicle-use-case'

export async function deleteVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteVehicleParamsSchema = yup.object({
    uuid: yup.string().required(),
  })

  const { uuid } = await deleteVehicleParamsSchema.validate(request.params)

  const vehicleRepository = new KnexVehicleRepository()
  const deleteVehicleUseCase = new DeleteVehicleUseCase(vehicleRepository)

  const { vehicle } = await deleteVehicleUseCase.execute({
    uuid,
  })

  return reply.status(201).send({
    vehicle,
  })
}

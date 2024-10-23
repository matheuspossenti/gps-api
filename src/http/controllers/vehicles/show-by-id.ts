import type { FastifyReply, FastifyRequest } from 'fastify'
import { KnexVehicleRepository } from '../../../repositories/knex/knex-vehicle-repository'
import { GetVehicleByIdUseCase } from '../../../use-cases/vehicles/get-vehicle-by-id-use-case'
import * as yup from 'yup'

export async function showByUuid(request: FastifyRequest, reply: FastifyReply) {
  const getVehicleByUuidParamsSchema = yup.object({
    uuid: yup.string().required().uuid('Invalid UUID.'),
  })

  const { uuid } = await getVehicleByUuidParamsSchema.validate(request.params)

  const vehicleRepository = new KnexVehicleRepository()
  const getVehiclesUseCase = new GetVehicleByIdUseCase(vehicleRepository)

  const { vehicle } = await getVehiclesUseCase.execute({ uuid })

  return reply.status(200).send(vehicle)
}

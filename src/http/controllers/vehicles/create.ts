import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexVehicleRepository } from '../../../repositories/knex/knex-vehicle-repository'
import { CreateVehicleUseCase } from '../../../use-cases/vehicle/create-vehicle'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createVehicleBodySchema = yup.object({
    name: yup.string().required('Nome é um campo obrigátorio'),
    brand: yup.string().required(''),
    model: yup.string().required(''),
  })

  const { name, brand, model } = await createVehicleBodySchema.validate(
    request.body,
  )

  const vehicleRepository = new KnexVehicleRepository()
  const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository)

  const { vehicle } = await createVehicleUseCase.execute({ name, brand, model })

  return reply.status(201).send(vehicle)
}

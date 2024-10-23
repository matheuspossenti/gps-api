import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexVehicleRepository } from '../../../repositories/knex/knex-vehicle-repository'
import { CreateVehicleUseCase } from '../../../use-cases/vehicles/create-vehicle'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createVehicleBodySchema = yup.object({
    name: yup.string().required('Name is a required field'),
    brand: yup.string().required('Brand is a required field'),
    model: yup.string().required('Model is a required field'),
  })

  const { name, brand, model } = await createVehicleBodySchema.validate(
    request.body,
  )

  const vehicleRepository = new KnexVehicleRepository()
  const createVehicleUseCase = new CreateVehicleUseCase(vehicleRepository)

  const { vehicle } = await createVehicleUseCase.execute({ name, brand, model })

  return reply.status(201).send(vehicle)
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexDriverRepository } from '../../../repositories/knex/knex-driver-repository'
import { CreateDriverUseCase } from '../../../use-cases/drivers/create-driver'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createDriverBodySchema = yup.object({
    name: yup.string().required('Name is a required field'),
    tagAccess: yup.string().required('Tag access is a required field'),
  })

  const { name, tagAccess } = await createDriverBodySchema.validate(
    request.body,
  )

  const driverRepository = new KnexDriverRepository()
  const createDriverUseCase = new CreateDriverUseCase(driverRepository)

  const { driver } = await createDriverUseCase.execute({ name, tagAccess })

  return reply.status(201).send(driver)
}

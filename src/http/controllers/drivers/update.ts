import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexDriverRepository } from '../../../repositories/knex/knex-driver-repository'
import { UpdateDriverUseCase } from '../../../use-cases/drivers/update-driver'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateDriverParamsSchema = yup.object({
    uuid: yup.string().required(),
  })

  const updateDriverBodySchema = yup.object({
    name: yup.string().optional(),
    tagAccess: yup.string().optional(),
  })

  const { uuid } = await updateDriverParamsSchema.validate(request.params)
  const { name, tagAccess } = await updateDriverBodySchema.validate(
    request.body,
  )

  const driverRepository = new KnexDriverRepository()
  const updateDriverUseCase = new UpdateDriverUseCase(driverRepository)

  const { driver } = await updateDriverUseCase.execute({
    uuid,
    data: {
      name,
      tagAccess,
    },
  })

  return reply.status(201).send({
    driver,
  })
}

import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexDriverRepository } from '../../../repositories/knex/knex-driver-repository'
import { DeleteDriverUseCase } from '../../../use-cases/drivers/delete-driver-use-case'

export async function deleteDriver(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteDriverParamsSchema = yup.object({
    uuid: yup.string().required('UUID is a required field'),
  })

  const { uuid } = await deleteDriverParamsSchema.validate(request.params)

  const driverRepository = new KnexDriverRepository()
  const deleteDriverUseCase = new DeleteDriverUseCase(driverRepository)

  const { driver } = await deleteDriverUseCase.execute({
    uuid,
  })

  return reply.status(201).send({
    driver,
  })
}

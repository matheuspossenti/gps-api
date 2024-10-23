import type { FastifyReply, FastifyRequest } from 'fastify'
import * as yup from 'yup'
import { KnexDriverRepository } from '../../../repositories/knex/knex-driver-repository'
import { GetDriverByIdUseCase } from '../../../use-cases/drivers/get-driver-by-id-use-case'

export async function showByUuid(request: FastifyRequest, reply: FastifyReply) {
  const getDriverByUuidParamsSchema = yup.object({
    uuid: yup.string().required().uuid('Não é um ID válido'),
  })

  const { uuid } = await getDriverByUuidParamsSchema.validate(request.params)

  const driverRepository = new KnexDriverRepository()
  const getDriversUseCase = new GetDriverByIdUseCase(driverRepository)

  const { driver } = await getDriversUseCase.execute({ uuid })

  return reply.status(200).send(driver)
}

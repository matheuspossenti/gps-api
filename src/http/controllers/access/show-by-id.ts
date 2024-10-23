import type { FastifyReply, FastifyRequest } from 'fastify'
import { KnexAccessRepository } from '../../../repositories/knex/knex-access-repository'
import * as yup from 'yup'
import { GetAccessByIdUseCase } from '../../../use-cases/access/get-access-by-id-use-case'

export async function showByUuid(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const getByUuidAccessBodySchema = yup.object({
    uuid: yup.string().required().uuid('Invalid UUID'),
  })

  const { uuid } = await getByUuidAccessBodySchema.validate(request.params)

  const accessRepository = new KnexAccessRepository()
  const getAccessUseCase = new GetAccessByIdUseCase(accessRepository)

  const { access } = await getAccessUseCase.execute({ uuid })

  return reply.status(200).send(access)
}

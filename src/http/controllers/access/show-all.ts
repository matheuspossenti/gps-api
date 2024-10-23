import type { FastifyReply, FastifyRequest } from 'fastify'
import { KnexAccessRepository } from '../../../repositories/knex/knex-access-repository'
import { GetAccessUseCase } from '../../../use-cases/access/get-access-use-case'

export async function showAll(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const accessRepository = new KnexAccessRepository()
  const getAccessUseCase = new GetAccessUseCase(accessRepository)

  const { access } = await getAccessUseCase.execute()

  return reply.status(200).send(access)
}

import { env } from '@/env'
import { ForbiddenError } from '@/errors/ForbiddenError'
import { UnauthorizedError } from '@/errors/UnauthorizedError'
import type { FastifyRequest } from 'fastify'

export async function verifyToken(
  request: FastifyRequest,
  // reply: FastifyReply,
) {
  const token = request.headers?.authorization?.split(' ')[1]

  if (!token) {
    throw new UnauthorizedError('Unauthorized.')
  }

  if (token !== env.TOKEN) {
    throw new ForbiddenError('Forbidden.')
  }
}

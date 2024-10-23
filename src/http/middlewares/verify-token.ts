import { env } from '@/env'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const token = request.headers?.authorization?.split(' ')[1]

    if (token !== env.TOKEN) {
      throw new Error('Unauthorized.')
    }
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}

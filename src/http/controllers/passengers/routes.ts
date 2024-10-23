import type { FastifyInstance } from 'fastify'
import { showAll } from './show-all'
import { create } from './create'

export async function passengerRoutes(app: FastifyInstance) {
  app.get('/', showAll)
  app.post('/', create)
}

import type { FastifyInstance } from 'fastify'
import { showAll } from './show-all'
import { showByUuid } from './show-by-id'
import { create } from './create'

export async function driverRoutes(app: FastifyInstance) {
  app.get('/', showAll)
  app.get('/:uuid', showByUuid)
  app.post('/', create)
}

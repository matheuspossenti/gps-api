import type { FastifyInstance } from 'fastify'
import { create } from './create'
import { showAll } from './show-all'
import { showByUuid } from './show-by-id'

export async function accessRoutes(app: FastifyInstance) {
  app.get('/', showAll)
  app.get('/:uuid', showByUuid)
  app.post('/', create)
}

import type { FastifyInstance } from 'fastify'
import { showAll } from './show-all'
import { create } from './create'
import { update } from './update'
import { deleteDriver } from './delete'
import { showByUuid } from './show-by-id'

export async function driverRoutes(app: FastifyInstance) {
  app.get('/', showAll)
  app.get('/:uuid', showByUuid)
  app.post('/', create)
  app.put('/:uuid', update)
  app.delete('/:uuid', deleteDriver)
}

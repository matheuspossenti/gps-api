import type { FastifyInstance } from 'fastify'
import { showAll } from './show-all'
import { create } from './create'
import { update } from './update'
import { deletePassenger } from './delete'
import { showByUuid } from './show-by-id'

export async function passengerRoutes(app: FastifyInstance) {
  app.get('/', showAll)
  app.get('/:uuid', showByUuid)
  app.post('/', create)
  app.put('/:uuid', update)
  app.delete('/:uuid', deletePassenger)
}

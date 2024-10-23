import type { FastifyInstance } from 'fastify'

export async function passengerRoutes(app: FastifyInstance) {
  app.get('/', showAl)
}

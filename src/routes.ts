import type { FastifyInstance } from 'fastify'
import { vehicleRoutes } from './http/controllers/vehicles/routes'

interface IRoute {
  path: string
  route: (app: FastifyInstance) => Promise<void>
}

const v1Routes: IRoute[] = [
  { path: '/v1/vehicles', route: vehicleRoutes },
  { path: '/v1/drivers', route: vehicleRoutes },
]

export default v1Routes

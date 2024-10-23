import type { FastifyInstance } from 'fastify'
import { vehicleRoutes } from './http/controllers/vehicles/routes'
import { driverRoutes } from './http/controllers/drivers/routes'
import { passengerRoutes } from './http/controllers/passengers/routes'

interface IRoute {
  path: string
  route: (app: FastifyInstance) => Promise<void>
}

const v1Routes: IRoute[] = [
  { path: '/v1/vehicles', route: vehicleRoutes },
  { path: '/v1/drivers', route: driverRoutes },
  { path: '/v1/passengers', route: passengerRoutes },
]

export default v1Routes

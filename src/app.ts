import fastify from 'fastify'
import { driverRoutes } from './routes/driver'
import { coordinateRoutes } from './routes/coordinate'
import { vehicleRoutes } from './routes/vehicle'

export const app = fastify()

app.register(driverRoutes, {
  prefix: 'driver',
})

app.register(vehicleRoutes, {
  prefix: 'vehicle',
})

app.register(coordinateRoutes, {
  prefix: 'coordinate',
})

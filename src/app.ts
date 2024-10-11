import fastify from 'fastify'
import { driverRoutes } from './routes/driver'
import { coordinateRoutes } from './routes/coordinate'
import { vehicleRoutes } from './routes/vehicle'
import { accessRoutes } from './routes/access'
import { passengerRoutes } from './routes/passenger'

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

app.register(accessRoutes, {
  prefix: 'access',
})

app.register(passengerRoutes, {
  prefix: 'passenger',
})

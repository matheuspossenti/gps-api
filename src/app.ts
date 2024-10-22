import fastify from 'fastify'
import v1Routes from './routes'

export const app = fastify()

v1Routes.forEach((route) => {
  app.register(route.route, { prefix: route.path })
})

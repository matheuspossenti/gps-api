import fastify from 'fastify'
import v1Routes from './routes'
import * as yup from 'yup'
import { verifyToken } from './http/middlewares/verify-token'
import { ForbiddenError } from './errors/ForbiddenError'
import { UnauthorizedError } from './errors/UnauthorizedError'
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found'

export const app = fastify()

app.addHook('preHandler', verifyToken)

v1Routes.forEach((route) => {
  app.register(route.route, { prefix: route.path })

  app.setErrorHandler((error, _, reply) => {
    if (error instanceof yup.ValidationError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', errors: error.errors })
    }

    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({ message: 'UnauthorizedError.' })
    }

    if (error instanceof ForbiddenError) {
      return reply.status(403).send({ message: 'Forbidden.' })
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource not found.' })
    }

    console.error(error)

    // if (env.NODE_ENV !== 'production') {
    //   console.error(error)
    // } else {
    //   // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    // }

    return reply.status(500).send({ message: 'Internal server error.' })
  })
})

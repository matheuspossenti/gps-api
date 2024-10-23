import fastify from 'fastify'
import v1Routes from './routes'
import * as yup from 'yup'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

v1Routes.forEach((route) => {
  app.register(route.route, { prefix: route.path })

  app.setErrorHandler((error, _, reply) => {
    if (error instanceof yup.ValidationError) {
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.errors })
    }

    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  })
})

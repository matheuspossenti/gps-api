import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'
import type { Passenger } from '@/entities/passenger'

describe('Show Passenger By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should show a passenger by id', async () => {
    const createPassengerResponse = await request(app.server)
      .post('/v1/passengers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Passageiro 1',
        tagAccess: '123456',
        biometryTemplate1: '123456',
        biometryTemplate2: '123456',
        biometryTemplate3: '123456',
      })

    const passenger = createPassengerResponse.body as Passenger

    await request(app.server)
      .post('/v1/passengers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Passageiro 2',
        tagAccess: '123456',
        biometryTemplate1: '123456',
        biometryTemplate2: '123456',
        biometryTemplate3: '123456',
      })

    const response = await request(app.server)
      .get(`/v1/passengers/${passenger.uuid}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.statusCode).toEqual(200)
  })
})

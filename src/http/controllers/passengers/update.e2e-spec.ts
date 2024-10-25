import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'
import { app } from '@/app'

describe('Update passenger (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update a passenger', async () => {
    const createPassengerResponse = await request(app.server)
      .post('/v1/passengers')
      .send({
        name: 'Passageiro 1',
        tagAccess: '123456',
        biometryTemplate1: '123456',
        biometryTemplate2: '123456',
        biometryTemplate3: '123456',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    const passengerId = createPassengerResponse.body.uuid

    const updatePassengerResponse = await request(app.server)
      .put(`/v1/passengers/${passengerId}`)
      .send({
        name: 'Passageiro 2',
        tagAccess: '654321',
        biometryTemplate1: '654321',
        biometryTemplate2: '654321',
        biometryTemplate3: '654321',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(updatePassengerResponse.statusCode).toEqual(200)
  })
})

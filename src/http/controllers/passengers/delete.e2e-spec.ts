import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'

describe('Delete Passenger (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a passenger', async () => {
    const response = await request(app.server)
      .post('/v1/passengers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Passageiro 1',
        tagAccess: '123456',
        biometryTemplate1: '123456',
        biometryTemplate2: '123456',
        biometryTemplate3: '123456',
      })

    const passengerId = response.body.uuid

    const getResponse = await request(app.server)
      .delete(`/v1/passengers/${passengerId}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(getResponse.statusCode).toEqual(200)
    expect(getResponse.body.passenger.deletedAt).toEqual(expect.any(Number))
  })
})

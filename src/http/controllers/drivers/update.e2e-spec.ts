import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'
import { app } from '@/app'

describe('Update driver (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update a driver', async () => {
    const createDriverResponse = await request(app.server)
      .post('/v1/drivers')
      .send({
        name: 'Passageiro 1',
        tagAccess: '123456',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    const driverId = createDriverResponse.body.uuid

    const updateDriverResponse = await request(app.server)
      .put(`/v1/drivers/${driverId}`)
      .send({
        name: 'Passageiro 2',
        tagAccess: '654321',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(updateDriverResponse.statusCode).toEqual(200)
  })
})

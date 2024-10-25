import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'

describe('Delete Vehicle (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a vehicle', async () => {
    const response = await request(app.server)
      .post('/v1/vehicles')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        uuid: '123e456',
        name: 'Fusca',
        model: '1300',
        brand: 'Volkswagen',
      })

    const vehicleId = response.body.uuid

    const getResponse = await request(app.server)
      .delete(`/v1/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(getResponse.statusCode).toEqual(200)
    expect(getResponse.body.vehicle.deletedAt).toEqual(expect.any(Number))
  })
})

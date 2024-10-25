import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'
import { app } from '@/app'

describe('Update vehicle (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update a vehicle', async () => {
    const createVehicleResponse = await request(app.server)
      .post('/v1/vehicles')
      .send({
        name: 'Fusca',
        brand: 'Volkswagen',
        model: '1300',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    const vehicleId = createVehicleResponse.body.uuid

    const updateVehicleResponse = await request(app.server)
      .put(`/v1/vehicles/${vehicleId}`)
      .send({
        name: 'Fusca 2.0',
        brand: 'Volkswagen',
        model: '1600',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(updateVehicleResponse.statusCode).toEqual(200)
  })
})

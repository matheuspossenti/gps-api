import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'
import type { Vehicle } from '@/entities/vehicle'

describe('Show Vehicle By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should show a vehicle by id', async () => {
    const createVehicleResponse = await request(app.server)
      .post('/v1/vehicles')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Fusca',
        brand: 'Volkswagen',
        model: '1300',
      })

    const vehicle = createVehicleResponse.body as Vehicle

    await request(app.server)
      .post('/v1/vehicles')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Gol',
        brand: 'Volkswagen',
        model: 'G4',
      })

    const response = await request(app.server)
      .get(`/v1/vehicles/${vehicle.uuid}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    // expect(response.body.vehicle.uuid).toEqual(randomUuid)
    // expect(response.body).toHaveLength(1)
    expect(response.statusCode).toEqual(200)
  })
})

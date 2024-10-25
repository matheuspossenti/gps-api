import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Create Coordinate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should create a coordinate', async () => {
    const driverResponse = await request(app.server)
      .post('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Motorista 1',
        tagAccess: '123456',
      })

    const vehicleResponse = await request(app.server)
      .post('/v1/vehicles')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Fusca',
        model: '1300',
        brand: 'Volkswagen',
      })

    const response = await request(app.server)
      .post('/v1/coordinates')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        latitude: 1,
        longitude: 1,
        pontoCardeal: 'N',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    expect(response.statusCode).toEqual(201)
  })
})

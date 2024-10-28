import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Get Coordinates (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all coordinates', async () => {
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

    await request(app.server)
      .post('/v1/coordinates')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        latitude: 1,
        longitude: 1,
        pontoCardeal: 'N',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    await request(app.server)
      .post('/v1/coordinates')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        latitude: 2,
        longitude: 2,
        pontoCardeal: 'N',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    const response = await request(app.server)
      .get('/v1/coordinates')
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.body.length).toBeGreaterThan(1)
    expect(response.statusCode).toEqual(200)
  })

  it('should not get all coordinates without token', async () => {
    const response = await request(app.server).get('/v1/coordinates')

    expect(response.statusCode).toEqual(401)
  })

  it('should not get all coordinates with invalid token', async () => {
    const response = await request(app.server)
      .get('/v1/coordinates')
      .set('Authorization', 'Bearer invalid-token')

    expect(response.statusCode).toEqual(403)
  })
})

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

    const coordinateReponse = await request(app.server)
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
      .get(`/v1/coordinates/${coordinateReponse.body.uuid}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.statusCode).toEqual(200)
  })

  it('should not get a coordinate with invalid uuid', async () => {
    const response = await request(app.server)
      .get('/v1/coordinates/123456')
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.statusCode).toEqual(400)
  })

  it('should not get a coordinate that doesnt exist', async () => {
    const response = await request(app.server)
      .get('/v1/coordinates/8b8f06b7-a8bb-4785-af30-08dfcbdd2462')
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.statusCode).toEqual(404)
  })

  it('should not get a coordinate without token', async () => {
    const response = await request(app.server).get(
      '/v1/coordinates/8b8f06b7-a8bb-4785-af30-08dfcbdd2462',
    )

    expect(response.statusCode).toEqual(401)
  })

  it('should not get a coordinate with invalid token', async () => {
    const response = await request(app.server)
      .get('/v1/coordinates/8b8f06b7-a8bb-4785-af30-08dfcbdd2462')
      .set('Authorization', 'Bearer invalid')

    expect(response.statusCode).toEqual(403)
  })
})

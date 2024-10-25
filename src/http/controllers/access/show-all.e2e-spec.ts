import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Get Accesss (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all accesss', async () => {
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

    const passengerResponse = await request(app.server)
      .post('/v1/passengers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Passageiro 1',
        tagAccess: '123456',
        biometryTemplate1: '123456',
        biometryTemplate2: '123456',
        biometryTemplate3: '123456',
      })

    await request(app.server)
      .post('/v1/access')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
        passengerUuid: `${passengerResponse.body.uuid}`,
        methodUsed: 'Biometry',
        latitude: 1,
        longitude: 1,
      })

    await request(app.server)
      .post('/v1/access')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
        passengerUuid: `${passengerResponse.body.uuid}`,
        methodUsed: 'Face',
        latitude: 1,
        longitude: 1,
      })

    const response = await request(app.server)
      .get('/v1/access')
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.body.length).toBeGreaterThan(1)
    expect(response.statusCode).toEqual(200)
  })
})

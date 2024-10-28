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

  it('should create a coordinate', async () => {
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

  it('should not create a coordinate with invalid driverUuid', async () => {
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
        driverUuid: 'invalid-uuid',
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    expect(response.statusCode).toEqual(400)
  })

  it('should not create a coordinate with invalid vehicleUuid', async () => {
    const driverResponse = await request(app.server)
      .post('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Motorista 1',
        tagAccess: '123456',
      })

    const response = await request(app.server)
      .post('/v1/coordinates')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        latitude: 1,
        longitude: 1,
        pontoCardeal: 'N',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: 'invalid-uuid',
      })

    expect(response.statusCode).toEqual(400)
  })

  it('should not create a coordinate without token', async () => {
    const response = await request(app.server).post('/v1/coordinates').send({
      latitude: 1,
      longitude: 1,
      pontoCardeal: 'N',
      driverUuid: 'invalid-uuid',
      vehicleUuid: 'invalid-uuid',
    })

    expect(response.statusCode).toEqual(401)
  })

  it('should not create a coordinate with invalid token', async () => {
    const response = await request(app.server)
      .post('/v1/coordinates')
      .set('Authorization', 'Bearer invalid-token')

    expect(response.statusCode).toEqual(403)
  })

  it('should not create a coordinate with invalid body', async () => {
    const response = await request(app.server)
      .post('/v1/coordinates')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        latitude: 'invalid',
        longitude: 'invalid',
        pontoCardeal: 'invalid',
        driverUuid: 'invalid-uuid',
        vehicleUuid: 'invalid-uuid',
      })

    expect(response.statusCode).toEqual(400)
  })

  it('should not create a coordinate with invalid pontoCardeal', async () => {
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
        pontoCardeal: 'invalid',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    expect(response.statusCode).toEqual(400)
  })

  it('should not create a coordinate with invalid latitude', async () => {
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
        latitude: 'invalid',
        longitude: 1,
        pontoCardeal: 'N',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    expect(response.statusCode).toEqual(400)
  })

  it('should not create a coordinate with invalid longitude', async () => {
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
        longitude: 'invalid',
        pontoCardeal: 'N',
        driverUuid: `${driverResponse.body.uuid}`,
        vehicleUuid: `${vehicleResponse.body.uuid}`,
      })

    expect(response.statusCode).toEqual(400)
  })
})

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Get Vehicles (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all vehicles', async () => {
    await request(app.server)
      .post('/v1/vehicles')
      .send({
        name: 'Fusca',
        model: '1300',
        brand: 'Volkswagen',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    await request(app.server)
      .post('/v1/vehicles')
      .send({
        name: 'Gol',
        model: 'G4',
        brand: 'Volkswagen',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    const response = await request(app.server)
      .get('/v1/vehicles')
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.body.length).toBeGreaterThan(1)
    expect(response.statusCode).toEqual(200)
  })
})

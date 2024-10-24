import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Create Vehicle (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a vehicle', async () => {
    const response = await request(app.server)
      .post('/v1/vehicles')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Fusca',
        brand: 'Volkswagen',
        model: '1300',
      })

    expect(response.statusCode).toEqual(201)
  })
})

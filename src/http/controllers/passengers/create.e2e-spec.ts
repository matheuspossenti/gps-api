import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Create Passenger (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a passenger', async () => {
    const response = await request(app.server)
      .post('/v1/passengers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Passageiro 1',
        tagAccess: '123456',
        biometryTemplate1: '123456',
        biometryTemplate2: '123456',
        biometryTemplate3: '123456',
      })

    expect(response.statusCode).toEqual(201)
  })
})

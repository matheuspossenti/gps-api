import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Create Driver (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a driver', async () => {
    const response = await request(app.server)
      .post('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Motorista 1',
        tagAccess: '123456',
      })

    expect(response.statusCode).toEqual(201)
  })
})

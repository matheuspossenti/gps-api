import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { env } from '@/env'

describe('Get Drivers (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all drivers', async () => {
    await request(app.server)
      .post('/v1/drivers')
      .send({
        name: 'John Doe',
        tagAccess: '123456',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    await request(app.server)
      .post('/v1/drivers')
      .send({
        name: 'Jane Doe',
        tagAccess: '123456',
      })
      .set('Authorization', `Bearer ${env.TOKEN}`)

    const response = await request(app.server)
      .get('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.body.length).toBeGreaterThan(1)
    expect(response.statusCode).toEqual(200)
  })
})

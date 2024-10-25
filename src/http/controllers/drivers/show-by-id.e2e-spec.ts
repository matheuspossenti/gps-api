import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'
import type { Driver } from '@/entities/driver'

describe('Show Driver By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should show a driver by id', async () => {
    const createDriverResponse = await request(app.server)
      .post('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'John Doe',
        tagAccess: '123456',
      })

    const driver = createDriverResponse.body as Driver

    await request(app.server)
      .post('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'Jane Doe',
        tagAccess: '123456',
      })

    const response = await request(app.server)
      .get(`/v1/drivers/${driver.uuid}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(response.statusCode).toEqual(200)
  })
})

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { env } from '@/env'

describe('Delete Driver (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a driver', async () => {
    const response = await request(app.server)
      .post('/v1/drivers')
      .set('Authorization', `Bearer ${env.TOKEN}`)
      .send({
        name: 'John Doe',
        tagAccess: '123456',
      })

    const driverId = response.body.uuid

    const getResponse = await request(app.server)
      .delete(`/v1/drivers/${driverId}`)
      .set('Authorization', `Bearer ${env.TOKEN}`)

    expect(getResponse.statusCode).toEqual(200)
    expect(getResponse.body.driver.deletedAt).toEqual(expect.any(Number))
  })
})

import type { Driver } from '../../entities/driver'
import type { IDriverRepository } from '../driver-repository'

export class InMemoryDriversRepository implements IDriverRepository {
  private items: Driver[] = []

  async getAll() {
    return this.items
  }

  async getDriverByUuid(uuid: string) {
    const driver = this.items.find((item) => item.uuid === uuid)

    if (!driver) {
      return null
    }

    return driver
  }

  async save(driver: Driver) {
    const driverIndex = this.items.findIndex(
      (driverItem) => driverItem.uuid === driver.uuid,
    )

    if (driverIndex === -1) {
      this.items.push(driver)
    } else {
      this.items[driverIndex] = driver
    }

    return driver
  }
}

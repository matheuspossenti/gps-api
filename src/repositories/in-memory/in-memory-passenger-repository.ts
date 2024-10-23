import type { Passenger } from '@/entities/passenger'
import type { IPassengerRepository } from '../passenger-repository'

export class InMemoryPassengersRepository implements IPassengerRepository {
  private items: Passenger[] = []

  async getAll() {
    return this.items
  }

  async getPassengerByUuid(uuid: string) {
    const passenger = this.items.find((item) => item.uuid === uuid)

    if (!passenger) {
      return null
    }

    return passenger
  }

  async save(passenger: Passenger) {
    const passengerIndex = this.items.findIndex(
      (passengerItem) => passengerItem.uuid === passenger.uuid,
    )

    if (passengerIndex === -1) {
      this.items.push(passenger)
    } else {
      this.items[passengerIndex] = passenger
    }

    return passenger
  }
}

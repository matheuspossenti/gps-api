import type { Passenger } from '../entities/passenger'

export interface IPassengerRepository {
  getAll(): Promise<Passenger[]>
  getPassengerByUuid(uuid: string): Promise<Passenger | null>
  save(passenger: Passenger): Promise<Passenger>
}

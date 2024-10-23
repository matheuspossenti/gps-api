import type { Coordinate } from '../../entities/coordinate'
import type { ICoordinateRepository } from '../coordinate-repository'

export class InMemoryCoordinatesRepository implements ICoordinateRepository {
  private items: Coordinate[] = []

  async getAll() {
    return this.items
  }

  async getCoordinateByUuid(uuid: string) {
    const coordinate = this.items.find((item) => item.uuid === uuid)

    if (!coordinate) {
      return null
    }

    return coordinate
  }

  async save(coordinate: Coordinate) {
    const coordinateIndex = this.items.findIndex(
      (coordinateItem) => coordinateItem.uuid === coordinate.uuid,
    )

    if (coordinateIndex === -1) {
      this.items.push(coordinate)
    } else {
      this.items[coordinateIndex] = coordinate
    }

    return coordinate
  }
}

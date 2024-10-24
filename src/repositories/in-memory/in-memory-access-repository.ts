import type { Access } from '@/entities/access'
import type { IAccessRepository } from '../access-repository'

export class InMemoryAccessRepository implements IAccessRepository {
  private items: Access[] = []

  async getAll() {
    return this.items
  }

  async getAccessByUuid(uuid: string) {
    const access = this.items.find((item) => item.uuid === uuid)

    if (!access) {
      return null
    }

    return access
  }

  async save(access: Access) {
    const accessIndex = this.items.findIndex(
      (accessItem) => accessItem.uuid === access.uuid,
    )

    if (accessIndex === -1) {
      this.items.push(access)
    } else {
      this.items[accessIndex] = access
    }

    return access
  }
}

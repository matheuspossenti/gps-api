import type { Access } from '../entities/access'

export interface IAccessRepository {
  getAll(): Promise<Access[]>
  getAccessByUuid(uuid: string): Promise<Access>
  save(access: Access): Promise<Access>
}

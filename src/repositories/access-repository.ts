import type { Access } from '../entities/access'

export interface IAccessRepository {
  getAll(): Promise<Access[]>
  getAccessByUuid(uuid: string): Promise<Access | null>
  save(access: Access): Promise<Access>
}

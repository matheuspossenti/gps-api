export type Access = {
  uuid?: string
  driverUuid: string
  vehicleUuid: string
  passengerUuid: string
  methodUsed: string
  latitude: number
  longitude: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

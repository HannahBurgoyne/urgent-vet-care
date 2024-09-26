import { Coords } from './Location'

export interface VetClinic {
  name: string
  address: string
  rating: number
  location: Coords
  placeId: string
  businessStatus: string
}

export interface OpeningHours {
  open_now: boolean
}

import { Coords } from './Location'

export interface VetClinic {
  name: string
  address: string
  rating: number
  location: Coords
  businessStatus: string
}

export interface OpeningHours {
  open_now: boolean
}

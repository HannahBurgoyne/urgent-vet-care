import { Geometry } from './Location'

export interface VetClinic {
  name: string
  vicinity: string
  rating: number
  user_ratings_total: number
  opening_hours: OpeningHours
  geometry: Geometry
}

export interface OpeningHours {
  open_now: boolean
}

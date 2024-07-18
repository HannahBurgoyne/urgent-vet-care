import { Geometry } from './Location'

export interface VetClinic {
  name: string
  vicinity: string
  rating: number
  user_ratings_total: number
  geometry: Geometry
}

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

export interface ClinicDetails {
  id: string
  name: string
  openingHours: DetailedOpeningHours
  placeId: string
  rating: number
  website: string
  formattedPhoneNumber: string
  formattedAddress: string
}

interface DetailedOpeningHours {
  openNow: boolean
  periods: OpeningPeriods[]
  weekdayText: string[]
}

interface OpeningPeriods {
  open: {
    day: number
    time: string
  }
  close: {
    day: number
    time: string
  }
}

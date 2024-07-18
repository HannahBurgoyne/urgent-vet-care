import { VetClinic } from '@/models/Clinics'
import axios from 'axios'

const apiKey: string | undefined = ''

if (!apiKey) {
  throw new Error('Google Maps API key is not defined in environment variables')
}

// TODO: make search radius adjustable by user
const radius = 5000 // Search radius in meters (adjust as needed)
const type = 'veterinary_care' // Place type to search for

//TODO: Make list of vet clinics, sorted by distance, to appear in a new component under/in different tab from Map
//TODO: Allow user to store data in persistent 'favourites' storage

export default async function fetchVetClinics(locationCoords: string) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoords}&radius=${radius}&type=${type}&opennow=true&key=${apiKey}`
    )
    const vetClinics = response.data.results as VetClinic[]

    vetClinics.forEach((clinic, index) => {
      console.log(`${index + 1}. ${clinic.name}`)
      console.log(`Address: ${clinic.vicinity}`)
      console.log(
        `Coords: ${clinic.geometry.location.lat}, ${clinic.geometry.location.lng}`
      )
      console.log(`Open now: ${clinic.opening_hours.open_now}`)
      console.log(`Rating: ${clinic.rating}`)
      console.log(`Total Ratings: ${clinic.user_ratings_total}`)
      console.log('---')
    })
    return vetClinics as VetClinic[]
  } catch (error) {
    console.error('Error fetching vet clinics:', error)
  }
}

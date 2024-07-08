import { VetClinic } from '@/components/ClinicMapPhone'
import axios from 'axios'
import Config from 'react-native-config'

const apiKey: string | undefined = ''

if (!apiKey) {
  throw new Error('Google Maps API key is not defined in environment variables')
}

// TODO: Check if the Places API can be used on Android. Look into the Places SDK for Android

const radius = 5000 // Search radius in meters (adjust as needed)
const type = 'veterinary_care' // Place type to search for

export default async function fetchVetClinics(
  // figure out shape of data from Places API and make TS interface for returning data
  locationCoords: string
) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationCoords}&radius=${radius}&type=${type}&key=${apiKey}`
    )
    console.log('res', response)
    const vetClinics = response.data.results as VetClinic[]

    vetClinics.forEach((clinic, index) => {
      console.log(clinic)
      // console.log(`${index + 1}. ${clinic.name}`)
      // console.log(`Address: ${clinic.vicinity}`)
      // console.log(`Rating: ${clinic.rating}`)
      // console.log(`Total Ratings: ${clinic.user_ratings_total}`)
      // console.log('---')
    })
    return vetClinics as VetClinic[]
  } catch (error) {
    console.error('Error fetching vet clinics:', error)
  }
}

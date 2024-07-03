import axios from 'axios'
import * as Location from 'expo-location'

const apiKey = process.env.GOOGLE_API_KEY
const radius = 5000 // Search radius in meters (adjust as needed)
const type = 'veterinary_care' // Place type to search for

export default async function fetchVetClinics(
  // figure out shape of data from Places API and make TS interface for returning data
  location: Location.LocationObject
) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${apiKey}`
    )

    const vetClinics = response.data.results

    vetClinics.forEach((clinic, index) => {
      console.log(`${index + 1}. ${clinic.name}`)
      console.log(`Address: ${clinic.vicinity}`)
      console.log(`Rating: ${clinic.rating}`)
      console.log(`Total Ratings: ${clinic.user_ratings_total}`)
      console.log('---')
    })
    return vetClinics
  } catch (error) {
    console.error('Error fetching vet clinics:', error)
  }
}

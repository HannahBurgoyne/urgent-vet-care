import { ClinicDetails, VetClinic } from '@/models/Clinics'
import { vetClinics, clinicDetails } from '../mockData/data'
import { Coords } from '@/models/Location'
import request from 'superagent'

// TODO: make search radius adjustable by user
const radius = 5000 // Search radius in meters (adjust as needed)
const type = 'veterinary_care' // Place type to search for

//TODO: Make list of vet clinics, sorted by distance, to appear in a new component under/in different tab from Map
//TODO: Allow user to store data in persistent 'favourites' storage

export async function fetchVetClinics(
  locationCoords: Coords
): Promise<VetClinic[] | undefined> {
  try {
    const lat = locationCoords.lat.toFixed(4)
    const lng = locationCoords.lng.toFixed(4)

    // console.log(lat)
    // console.log(lng)

    const response = await Promise.resolve({ body: vetClinics })

    // const response = await request.get(
    //   `http://localhost:5141/VetClinic/nearby-clinics?lat=${lat}&lng=${lng}&radius=5000`
    // )
    return response.body as VetClinic[]
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

export async function fetchClinicDetails(clinicId: string) {
  try {
    clinicId // not used right now while data is mocked
    const response = await Promise.resolve({ body: clinicDetails })

    return response.body as ClinicDetails
  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

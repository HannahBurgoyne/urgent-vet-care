import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import fetchVetClinics from '@/apis/vetclinics'
import ClinicMapPhone from './ClinicMapPhone'
import ClinicsList from './ClinicsList'
import { VetClinic } from '@/models/Clinics'

export default function Home() {
  const [location, setLocation] = useState<null | Location.LocationObject>(null)
  const [errorMsg, setErrorMsg] = useState<null | string>(null)
  const [vetClinics, setVetClinics] = useState<VetClinic[]>([])

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      if (status) {
        //console.log('if condition true')
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        })
        //console.log(location)
        setLocation(location)

        const locationString = `${location.coords.latitude},${location.coords.longitude}`

        const currentClinics = await fetchVetClinics(locationString)

        if (currentClinics) {
          setVetClinics(currentClinics)
          console.log(currentClinics)
        }
      }
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  }

  const mapData = {
    location: location,
    clinics: vetClinics,
  }

  return (
    <>
      <ClinicMapPhone location={location} clinics={vetClinics} />
      <ClinicsList clinics={vetClinics} />
    </>
  )
}

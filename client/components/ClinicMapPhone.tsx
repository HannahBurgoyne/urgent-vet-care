import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import fetchVetClinics from '@/apis/vetclinics'
import ClinicsList from './ClinicsList'

export interface Coords {
  lat: number
  lng: number
}

export interface Geometry {
  location: Coords
}

export interface VetClinic {
  name: string
  vicinity: string
  rating: number
  user_ratings_total: number
  geometry: Geometry
}

export default function ClinicMapPhone() {
  // TODO:

  // Separate concerns - make parent component and prop drill clinic data into map and list components respectively

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

  let string = JSON.stringify(location)

  return (
    <>
      {location && (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {vetClinics &&
              vetClinics.map((clinic, i) => (
                // TODO: make marker clickable so it takes user to clinic details and directions
                <Marker
                  key={`${i}: ${clinic.name}`}
                  coordinate={{
                    latitude: clinic.geometry.location.lat,
                    longitude: clinic.geometry.location.lng,
                  }}
                />
              ))}
          </MapView>
          <ClinicsList clinics={vetClinics} />
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
  },
})

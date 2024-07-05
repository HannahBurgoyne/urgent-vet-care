import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import fetchVetClinics from '@/apis/vetclinics'

interface VetClinic {
  name: string
  vicinity: string
  rating: number
  user_ratings_total: number
}

export default function ClinicMapPhone() {
  // TODO:

  // figure out why data isn't coming through (is api call actually returning data?)
  // Render each vet clinic as a marker on map in user's current location

  const [location, setLocation] = useState<null | Location.LocationObject>(null)
  const [errorMsg, setErrorMsg] = useState<null | string>(null)
  const [vetClinics, setVetClinics] = useState<null | VetClinic[]>(null)

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
        console.log(location)
        setLocation(location)

        const locationString = `${location.coords.latitude},${location.coords.longitude}`

        const currentClinics = await fetchVetClinics(locationString)
        setVetClinics(currentClinics)

        vetClinics?.map((clinic) => {
          console.log('clinic', clinic)
        })
      }
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  }

  let string = JSON.stringify(location)
  // console.log(location?.coords.latitude)
  //console.log(location?.coords.longitude)

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
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            {vetClinics && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
              />
            )}
          </MapView>
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

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

export default function App() {
  const [location, setLocation] = useState<null | Location.LocationObject>(null)
  const [errorMsg, setErrorMsg] = useState<null | string>(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  }

  return (
    <>
      {location && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        />
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

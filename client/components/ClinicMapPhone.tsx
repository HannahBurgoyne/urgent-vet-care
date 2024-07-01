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

      if (status) {
        console.log('if condition true')
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        })
        console.log(location)
        setLocation(location)
      }
    })()
  }, [])

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg
  }

  let string = JSON.stringify(location)
  console.log(location?.coords.latitude)
  console.log(location?.coords.longitude)

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
          />
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

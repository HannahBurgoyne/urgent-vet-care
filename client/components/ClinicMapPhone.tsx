import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions } from 'react-native'
import * as Location from 'expo-location'

export default async function App() {
  //TODO: sort this location function out
  let location = await Location.getCurrentPositionAsync({})

  return (
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

import { useThemeColor } from '@/hooks/useThemeColor'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { ImageBackground, SafeAreaView, View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function Map() {
  const initialRegion = {
    latitude: 37.78825, // Initial latitude
    longitude: -122.4324, // Initial longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          <Marker
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
            }}
            title="Your Location"
          />
        </MapView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import * as Location from 'expo-location'
import { VetClinic } from '@/models/Clinics'

interface Props {
  location: Location.LocationObject | null
  clinics: VetClinic[]
}

export default function ClinicMapPhone(props: Props) {
  const { location, clinics } = props
  // TODO:

  // Separate concerns - make parent component and prop drill clinic data into map and list components respectively

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
            {clinics &&
              clinics.map((clinic, i) => (
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

import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Dimensions } from 'react-native'
import * as Location from 'expo-location'
import { VetClinic } from '@/models/Clinics'

interface Props {
  location: Location.LocationObject
  clinics: VetClinic[]
}

export default function ClinicMapPhone({ location, clinics }: Props) {
  // console.log('location', location)
  // console.log('clinics', clinics)
  return (
    <>
      {location && (
        <>
          <MapView
            style={styles.map}
            // provider={PROVIDER_GOOGLE} // using apple maps on iOS
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
                    latitude: clinic.location.lat,
                    longitude: clinic.location.lng,
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

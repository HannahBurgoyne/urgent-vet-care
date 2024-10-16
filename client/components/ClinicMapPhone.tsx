import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Dimensions } from 'react-native'
import * as Location from 'expo-location'
import { ClinicDetails, VetClinic } from '@/models/Clinics'
import { useState } from 'react'
import { fetchClinicDetails } from '@/apis/vetclinics'
import ClinicDetailsModal from './ClinicDetailsModal'

interface Props {
  location: Location.LocationObject
  clinics: VetClinic[]
}

export default function ClinicMapPhone({ location, clinics }: Props) {
  const [selectedClinic, setSelectedClinic] = useState<ClinicDetails | null>(
    null
  )
  // console.log('location', location)
  // console.log('clinics', clinics)

  async function handleMarkerPress(clinicData: VetClinic) {
    console.log(`clicked on ${clinicData.name}`)
    const clinicDetails = await fetchClinicDetails(clinicData.placeId)
    console.log(clinicDetails)
    if (clinicDetails) setSelectedClinic(clinicDetails)
  }

  function closeModal() {
    setSelectedClinic(null)
  }

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
                <Marker
                  key={`${i}: ${clinic.name}`}
                  coordinate={{
                    latitude: clinic.location.lat,
                    longitude: clinic.location.lng,
                  }}
                  onPress={() => {
                    handleMarkerPress(clinic)
                  }}
                />
              ))}
          </MapView>
          {selectedClinic && (
            <ClinicDetailsModal
              closeModal={closeModal}
              selectedClinic={selectedClinic}
            />
          )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    color: 'blue',
    marginTop: 20,
    textAlign: 'center',
  },
})

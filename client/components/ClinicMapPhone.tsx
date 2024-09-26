import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, Dimensions, Modal, View } from 'react-native'
import * as Location from 'expo-location'
import { VetClinic } from '@/models/Clinics'
import { useState } from 'react'
import { Text } from 'react-native'

interface Props {
  location: Location.LocationObject
  clinics: VetClinic[]
}

export default function ClinicMapPhone({ location, clinics }: Props) {
  const [selectedClinic, setSelectedClinic] = useState<VetClinic | null>(null)
  // console.log('location', location)
  // console.log('clinics', clinics)

  function handleMarkerPress(clinicData: VetClinic) {
    console.log(`clicked on ${clinicData.name}`)
    setSelectedClinic(clinicData)
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
                // TODO: make marker clickable so it takes user to clinic details and directions
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
            <Modal
              transparent={true}
              animationType="fade"
              visible={!!selectedClinic}
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{selectedClinic.name}</Text>
                  <Text>Address: {selectedClinic.address}</Text>
                  <Text>Place Id: {selectedClinic.placeId}</Text>
                  <Text style={styles.closeButton} onPress={closeModal}>
                    Close
                  </Text>
                </View>
              </View>
            </Modal>
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

import { Modal, StyleSheet, Text, View } from 'react-native'
import { ClinicDetails } from '@/models/Clinics'

interface Props {
  closeModal: () => void
  selectedClinic: ClinicDetails
}

export default function ClinicDetailsModal({
  closeModal,
  selectedClinic,
}: Props) {
  return (
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
  )
}

const styles = StyleSheet.create({
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

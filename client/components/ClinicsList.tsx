import { fetchClinicDetails } from '@/apis/vetclinics'
import { ClinicDetails, VetClinic } from '@/models/Clinics'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

interface Props {
  clinics: VetClinic[]
}

export default function ClinicsList({ clinics }: Props) {
  const [clinicDetails, setClinicDetails] = useState<ClinicDetails[]>([])

  useEffect(() => {
    // Fetch clinic details when the component is mounted
    async function fetchDetails() {
      const detailsArray = await Promise.all(
        clinics.map(async (clinic) => {
          const details = await fetchClinicDetails(clinic.placeId)
          return details
        })
      )

      setClinicDetails(detailsArray as ClinicDetails[])
      console.log(detailsArray)
    }

    fetchDetails()
  }, [clinics])

  async function saveClinic(clinic: ClinicDetails) {
    console.log('button', clinic)
  }

  return (
    <FlatList
      style={styles.list}
      data={clinicDetails}
      keyExtractor={(item) => item.placeId}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => saveClinic(item)}>
              <Icon
                name="star-o"
                style={styles.icon}
                size={24}
                color="#FFD700"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text>{item.name}</Text>
            <Text>{item.formattedAddress}</Text>
            <Text>{item.formattedPhoneNumber}</Text>
            <Text>{item.website}</Text>
            <Text>{item.openingHours.weekdayText}</Text>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 6,
    margin: 8,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 8,
    position: 'relative', // Make the container relative
  },
  list: {
    backgroundColor: 'red',
    textAlign: 'left',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  textContainer: {
    paddingTop: 30,
  },
})

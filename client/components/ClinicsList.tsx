import { fetchClinicDetails } from '@/apis/vetclinics'
import { ClinicDetails, VetClinic } from '@/models/Clinics'
import { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
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
  }, [clinics]) // Dependency array ensures this runs once when clinics prop changes

  async function saveClinic(clinic: ClinicDetails) {
    console.log(clinic)
  }

  if (clinicDetails)
    return (
      <FlatList
        style={styles.list}
        data={clinicDetails}
        keyExtractor={(item, index) => `${item.placeId}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => saveClinic(item)}>
              <Icon
                name="star-o"
                style={styles.icon}
                size={24}
                color="#FFD700"
              />
              <Text style={styles.buttonText}>Save to Favourites</Text>
            </TouchableOpacity>
            <Text>{item.name}</Text>
            <Text>{item.formattedAddress}</Text>
            <Text>{item.formattedPhoneNumber}</Text>
            <Text>{item.website}</Text>
            <Text>{item.openingHours.weekdayText}</Text>
          </View>
        )}
      />
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: 'column',
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 6,
    margin: 8,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    // Shadow property for Android
    elevation: 8, // Higher value means a more pronounced shadow
  },
  list: {
    backgroundColor: 'red',
    textAlign: 'left',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  icon: {
    position: 'absolute',
    top: 10, // Adjust this value as needed
    right: 10, // Adjust this value as needed
    zIndex: 1, // Ensures the button is on top
    marginBottom: 8,
  },
})

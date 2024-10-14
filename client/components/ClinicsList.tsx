import { fetchClinicDetails } from '@/apis/vetclinics'
import { ClinicDetails, VetClinic } from '@/models/Clinics'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'

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
            <Text>{item.name}</Text>
            <Text>{item.formattedAddress}</Text>
            <Text>{item.formattedPhoneNumber}</Text>
            <Text>{item.website}</Text>
            <Text>{item.openingHours.weekdayText}</Text>
            <Button
              onPress={() => saveClinic(item)}
              title="Save clinic to favourites"
            />
          </View>
        )}
      />
    )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: 'column',
    bottom: 0,
  },
  list: {
    backgroundColor: 'white',
    textAlign: 'left',
  },
  clinic: {
    padding: 5,
    fontWeight: '500',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 1,
  },
})

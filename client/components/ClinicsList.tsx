import { fetchClinicDetails } from '@/apis/vetclinics'
import { ClinicDetails, VetClinic } from '@/models/Clinics'
import { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'

interface Props {
  clinics: VetClinic[]
}

export default function ClinicsList({ clinics }: Props) {
  // TODO: Add distance from user, sort by nearest first
  const [clinicDetails, setClinicDetails] = useState<ClinicDetails | null>(null)

  async function handlePress(clinic: VetClinic) {
    const clinicDetails = await fetchClinicDetails(clinic.placeId)
    console.log(clinicDetails)
    if (clinicDetails) {
      setClinicDetails(clinicDetails)
    }
  }

  async function saveClinic(clinic: ClinicDetails) {
    console.log(clinic)
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={clinics}
        renderItem={({ item }) => (
          <Text
            onPress={() => {
              handlePress(item)
            }}
            style={styles.clinic}
          >
            {item.name}
          </Text>
        )}
      />
      {clinicDetails && (
        <>
          <Text>{clinicDetails.formattedAddress}</Text>
          <Text>{clinicDetails.formattedPhoneNumber}</Text>
          <Text>{clinicDetails.website}</Text>
          <Text>{clinicDetails.openingHours.weekdayText}</Text>
          <Button
            onPress={() => saveClinic(clinicDetails)}
            title="Save clinic to favourites"
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    flexDirection: 'row',
    position: 'absolute',
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

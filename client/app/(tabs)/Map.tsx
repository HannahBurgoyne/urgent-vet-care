import { useRoute } from '@react-navigation/native'
import ClinicMapPhone from '@/components/ClinicMapPhone'
import { View, StyleSheet, Text } from 'react-native'
import * as Location from 'expo-location'
import { VetClinic } from '@/models/Clinics'

// Define the type of the route params
type TabParams = {
  location?: Location.LocationObject
  vetClinics: VetClinic[]
}

export default function Map() {
  const route = useRoute()
  const { location, vetClinics } = route.params as TabParams
  // console.log('vetClinics, ', vetClinics)

  if (!location || !vetClinics) {
    return <Text>Loading...</Text>
  }

  if (location && vetClinics)
    return (
      <View style={styles.container}>
        {/* Pass the unpacked params as props to ClinicMapPhone */}
        <ClinicMapPhone location={location} clinics={vetClinics} />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

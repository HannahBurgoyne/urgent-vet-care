import { useRoute } from '@react-navigation/native'
import { View, StyleSheet, Text } from 'react-native'
import { VetClinic } from '@/models/Clinics'
import ClinicsList from '@/components/ClinicsList'

// Define the type of the route params
type TabParams = {
  vetClinics: VetClinic[]
}

export default function List() {
  const route = useRoute()
  const { vetClinics } = route.params as TabParams
  // console.log(vetClinics)

  if (!vetClinics) {
    return <Text>Loading...</Text>
  }

  if (vetClinics)
    return (
      <View style={styles.container}>
        {/* Pass the unpacked params as props to ClinicsList */}
        <ClinicsList clinics={vetClinics} />
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

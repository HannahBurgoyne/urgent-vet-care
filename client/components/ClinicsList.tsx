import { VetClinic } from '@/models/Clinics'
import { View, Text, FlatList, StyleSheet } from 'react-native'

interface Props {
  clinics: VetClinic[]
}

export default function ClinicsList({ clinics }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={clinics}
        renderItem={({ item }) => (
          <Text style={styles.clinic}>{item.name}</Text>
        )}
      />
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

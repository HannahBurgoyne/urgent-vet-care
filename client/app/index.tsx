import ClinicMapPhone from '@/components/ClinicMapPhone'
import { Text, View } from 'react-native'

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClinicMapPhone />
    </View>
  )
}

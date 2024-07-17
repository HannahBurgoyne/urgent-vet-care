import { VetClinic } from './ClinicMapPhone'
import { View, Text, ViewComponent } from 'react-native'

interface Props {
  clinics: VetClinic[]
}

export default function ClinicsList(props: Props) {
  const { clinics } = props

  return clinics?.map((clinic, i) => (
    <View>
      <Text key={i}>{clinic.name}</Text>
    </View>
  ))
}

import { Text, View } from 'react-native'

// import {
//   useQuery,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
import ClinicMap from '../components/ClinicMap'

export default function Index() {
  // const queryClient = new QueryClient()

  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <ClinicMap />
      </View>
      {/* </QueryClientProvider> */}
    </>
  )
}

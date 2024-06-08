import Map from '@/components/Map'
import ClinicsList from '@/components/ClinicsList'
import { VetClinic } from '@/Models/Clinic'
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function HomeScreen() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Map />
        <ClinicsList />
      </QueryClientProvider>
    </>
  )
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// })

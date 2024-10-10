import { Tabs } from 'expo-router'
import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { fetchVetClinics } from '@/apis/vetclinics'
import * as Location from 'expo-location'
import { VetClinic } from '@/models/Clinics'
import { Coords } from '@/models/Location'

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [vetClinics, setVetClinics] = useState<VetClinic[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      })
      setLocation(currentLocation)

      const locationObj: Coords = {
        lat: currentLocation.coords.latitude,
        lng: currentLocation.coords.longitude,
      }
      const clinics = await fetchVetClinics(locationObj)
      if (clinics) {
        setVetClinics(clinics)
      }
      setIsLoading(false)
    })()
  }, [])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="Map"
        initialParams={{ location, vetClinics }}
        options={{ title: 'Map' }}
      />
      <Tabs.Screen
        name="List"
        initialParams={{ vetClinics }}
        options={{ title: 'List' }}
      />
    </Tabs>
  )
}

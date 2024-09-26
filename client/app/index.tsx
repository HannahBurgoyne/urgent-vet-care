import { useRouter, useRootNavigationState } from 'expo-router'
import { useEffect } from 'react'

export default function Index() {
  const router = useRouter()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    if (navigationState?.key) {
      // Wait until navigation is mounted before performing the replace
      router.replace('/(tabs)/Map')
    }
  }, [navigationState])

  return null
}

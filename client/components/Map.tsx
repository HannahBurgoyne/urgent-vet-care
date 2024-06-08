import { useThemeColor } from '@/hooks/useThemeColor'
import { setBackgroundColorAsync } from 'expo-system-ui'
import { ImageBackground } from 'react-native'

export default function Map() {
  return (
    <div
      style={{
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0.5,
      }}
    >
      <h1>This is the map component</h1>
    </div>
  )
}

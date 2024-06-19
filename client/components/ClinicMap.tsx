import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

export default function ClinicMap() {
  return (
    <APIProvider apiKey="AIzaSyBgTBFi5c5Zsoa6pdaybU3DZHldBlAYnh0">
      <Map
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      />
    </APIProvider>
  )
}

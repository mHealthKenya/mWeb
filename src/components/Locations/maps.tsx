import CenterComponent from '@components/Shared/Center'
import { Coordinate } from '@models/coordinate'
import { CircularProgress } from '@mui/material'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { FC, useMemo } from 'react'
import CustomMarker from '../../../public/assets/Flag.svg'
import styles from '../../styles/Map.module.css'

interface MarkerProps {
  lat: number
  lng: number
}
const LocationMapComponent: FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
    region: 'KE'
  })

  if (!isLoaded) {
    return (
      <CenterComponent>
        <CircularProgress />
      </CenterComponent>
    )
  }
  return <GoogleMapComponent coordinates={coordinates} />
}

const GoogleMapComponent: FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
  const center = useMemo(
    () => ({
      lat: -1.226956,
      lng: 36.885225
    }),
    []
  )

  const handleMarkerClick = (marker: MarkerProps) => {
    const latLng = {
      lat: marker.lat,
      lng: marker.lng
    }

    const infoWindowContent = `
      <div>
        <p>Click <a href="https://www.google.com/maps/dir/?api=1&destination=${marker.lat},${marker.lng}" target="_blank">here</a> to navigate</p>
      </div>
    `

    const infoWindow = new window.google.maps.InfoWindow({
      content: infoWindowContent
    })

    infoWindow.setPosition(latLng)
    infoWindow.open(window.google.maps.Map as any)
  }

  return (
    <GoogleMap zoom={14} center={center} mapContainerClassName={styles.map}>
      {coordinates.map((coordinate) => (
        <Marker
          key={coordinate.id}
          position={{
            lat: coordinate.lat,
            lng: coordinate.lng
          }}
          options={{
            icon: CustomMarker
          }}
          title="M+ Registered Facility"
          onClick={() =>
            handleMarkerClick({
              lat: coordinate.lat,
              lng: coordinate.lng
            })
          }
        />
      ))}
    </GoogleMap>
  )
}

export default LocationMapComponent

import { Location } from '@models/location'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'

export const allLocations = async () => {
  const locations: Location[] = await axiosInstance.get('locations/all').then((res) => res.data)
  return locations
}

const useAllLocations = (initialData: Location[]) =>
  useQuery({
    queryKey: ['allLocations'],
    queryFn: allLocations,
    initialData
  })

export default useAllLocations

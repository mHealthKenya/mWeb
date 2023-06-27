import { Coordinate } from '@models/coordinate'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'

export const getCoordinates = async () => {
  const coordinates: Coordinate[] = await axiosInstance
    .get('facilities/coordinates')
    .then((res) => res.data)

  return coordinates
}

const useCoordinates = (initialData: Coordinate[]) =>
  useQuery({
    queryKey: ['coordinates'],
    queryFn: getCoordinates,
    initialData
  })

export default useCoordinates

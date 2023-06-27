import { Facility } from '@models/facility'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'

export const allFacilities = async () => {
  const locations: Facility[] = await axiosInstance.get('facilities/all').then((res) => res.data)
  return locations
}

const useAllFacilities = (initialData: Facility[]) =>
  useQuery({
    queryKey: ['allFacilities'],
    queryFn: allFacilities,
    initialData
  })

export default useAllFacilities

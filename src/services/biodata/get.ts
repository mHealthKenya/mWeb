import { axiosConfig, baseURL } from '@config/axios'
import { FacilityBioData } from '@models/biodata'
import { useQuery } from '@tanstack/react-query'

interface NotBio {
  message: string
}

export const bioData = async (id: string) => {
  const axiosInstance = await axiosConfig()

  const bio = await axiosInstance.get(baseURL + 'biodata/id?motherId=' + id).then((res) => res.data)

  return bio
}

const useGetBioData = (data: FacilityBioData | NotBio, id: string) => {
  return useQuery({
    queryKey: [`bio${id}`],
    queryFn: () => bioData(id),
    initialData: data,
    enabled: !!id
  })
}

export default useGetBioData

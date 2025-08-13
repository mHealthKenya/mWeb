import { axiosConfig, baseURL } from '@config/axios'
import { useQuery } from '@tanstack/react-query'



export const allBioData = async () => {
  const axiosInstance = await axiosConfig()

  const bio = await axiosInstance.get(baseURL + 'biodata/all').then((res) => res.data)

  return bio
}

const useGetAllBioData = () => {
  return useQuery({
    queryKey: ['allBioData'],
    queryFn: () => allBioData(),
  })
}

export default useGetAllBioData

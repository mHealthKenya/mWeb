import { axiosConfig, baseURL } from '@config/axios'
import { useQuery } from '@tanstack/react-query'

export const getLatestVisit = async (motherId: string) => {
  const axiosInstance = await axiosConfig()

  const visit = await axiosInstance
    .get(baseURL + 'clinicvisit/latest?motherId=' + motherId)
    .then((res) => res.data)

  return visit
}

const useLatestVisit = (motherId: string) =>
  useQuery({
    queryFn: () => getLatestVisit(motherId),
    queryKey: ['latest', motherId],
    enabled: !!motherId
  })

export default useLatestVisit

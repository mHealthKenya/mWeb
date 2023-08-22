import { axiosConfig, baseURL } from '@config/axios'
import { ClinicalVisit } from '@models/clinicvisits'
import { useQuery } from '@tanstack/react-query'

export const getVisitsByFacility = async (facilityId: string) => {
  const axiosInstance = await axiosConfig()

  const visits = await axiosInstance
    .get(baseURL + 'clinicvisit/facility?id=' + facilityId)
    .then((res) => res.data)

  return visits
}

const useVisitsByFacility = (facilityId: string, data: ClinicalVisit[]) =>
  useQuery({
    queryKey: ['visit', facilityId],
    queryFn: () => getVisitsByFacility(facilityId),
    initialData: data,
    enabled: !!facilityId
  })

export default useVisitsByFacility

import { axiosConfig } from '@config/axios'
import { ChvMothers } from '@models/chvmothers'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const facilityTransactions = async () => {
  const axiosInstance = axiosConfig()
  const facilitytransactions = (await axiosInstance)
    .get('transactions/facility')
    .then((res) => res.data)
    .catch((error) => console.log(error))

  return facilitytransactions
}

const useAllFacilityTransactions = (data: ChvMothers): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ['facilitytransactions', data],
    queryFn: facilityTransactions
  })
}

export default useAllFacilityTransactions

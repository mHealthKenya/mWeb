import { axiosConfig } from '@config/axios'
import { ChvMothers } from '@models/chvmothers'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

export const motherTransactions = async () => {
  const axiosInstance = axiosConfig()
  const mothertransactions = (await axiosInstance)
    .get('transactions/mother')
    .then((res) => res.data)
    .catch((error) => console.log(error))

  return mothertransactions
}

const useAllMotherTransactions = (data: ChvMothers): UseQueryResult<any, unknown> => {
  return useQuery({
    queryKey: ['mothertransactions', data],
    queryFn: motherTransactions
  })
}

export default useAllMotherTransactions

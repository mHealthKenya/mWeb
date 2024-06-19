import { axiosConfig, baseURL } from '@config/axios'
import { WalletByUserID } from '@models/wallet'
import { useQuery } from '@tanstack/react-query'

export const walletStatus = async (userId: string) => {
  const axiosInstance = axiosConfig()
  const walletstatus = (await axiosInstance)
    .get(baseURL + 'wallet/user?userId=' + userId)
    .then((res) => res.data)
    .catch((error) => console.log(error))

  return walletstatus
}

const useWalletStatus = (userId: string, data: WalletByUserID[]) =>
  useQuery({
    queryKey: ['walletstatus', userId],
    initialData: data,
    queryFn: () => walletStatus(userId)
  })

export default useWalletStatus

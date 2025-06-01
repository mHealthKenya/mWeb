import { axiosConfig } from "@config/axios"
import { UserWallet } from "@models/userwallet"
import { useQuery } from "@tanstack/react-query"

const getAllUserWallets = async () => {
    const axiosInstance = await axiosConfig()
    const wallets = await axiosInstance.get(
        "wallet/all"
    ).then((res) => res.data)

    return wallets

}

const useUserWallets = (data: UserWallet[]) => {

    return useQuery({
        queryFn: getAllUserWallets,
        queryKey: ['wallets'],
        initialData: data
    })
}


export default useUserWallets
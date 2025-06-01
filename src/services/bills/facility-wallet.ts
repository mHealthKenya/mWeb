import { axiosConfig } from "@config/axios"
import { FacilityWallet } from "@models/facilitywallet"
import { useQuery } from "@tanstack/react-query"

const facilityWallet = async () => {
    const axiosInstance = await axiosConfig()
    const wallet = await axiosInstance.get(
        "wallet/facility"
    ).then((res) => res.data)

    return wallet
}

const useFacilityWallet = (facilityId: string, wallet: FacilityWallet) => {
    return useQuery({
        queryFn: facilityWallet,
        queryKey: ['facility-wallet', { facilityId }],
        initialData: wallet
    })
}


export default useFacilityWallet
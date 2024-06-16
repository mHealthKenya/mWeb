import { axiosConfig } from "@config/axios"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import checkBalanceAtom from "src/atoms/checkbalance"
import Swal from "sweetalert2"

export interface CheckPeriodPoints {
    startDate: string
    endDate: string
    facilityId: string
}

export interface Success {
    totalBalance: number | null
}

const multiApprove = async (data: CheckPeriodPoints) => {
    const axiosInstance = await axiosConfig()
    const bills = await axiosInstance.patch(
        "wallet/transactions/multiapprove", data
    ).then((res) => res.data)

    return bills

}

const useMultiApprove = () => {


    const [_, setBalance] = useAtom(checkBalanceAtom)

    return useMutation(
        {
            mutationFn: multiApprove,
            onSuccess: async () => {

                await setBalance((balance) => ({ ...balance, data: { totalBalance: null }, open: false }))

                Swal.fire({
                    title: 'All Approved!',
                    text: 'You have approved all transactions in the provided period',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            },

            onError: async () => {
                await setBalance((balance) => ({ ...balance, data: { totalBalance: null }, open: false }))
                Swal.fire({
                    title: 'Error!',
                    text: 'Could not check points',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }
    )
}

export default useMultiApprove
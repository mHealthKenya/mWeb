import { axiosConfig } from "@config/axios"
import { useMutation } from "@tanstack/react-query"
import { useAtom } from "jotai"
import checkBalanceAtom from "src/atoms/checkbalance"
import Swal from "sweetalert2"

interface CheckPeriodPoints {
    startDate: string
    endDate: string
    facilityId: string
}

export interface Success {
    totalBalance: number | null
}

const checkPeriodPoints = async (data: CheckPeriodPoints) => {
    const axiosInstance = await axiosConfig()
    const bills = await axiosInstance.post(
        "wallet/transactions/checkbalance", data
    ).then((res) => res.data)

    return bills

}

const useCheckPeriodPoints = () => {


    const [_, setBalance] = useAtom(checkBalanceAtom)

    return useMutation(
        {
            mutationFn: checkPeriodPoints,
            onSuccess: (data: Success) => {
                if (data.totalBalance === null) {
                    Swal.fire({
                        title: 'All Approved!',
                        text: 'You have approved all transactions in the provided period',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                } else {
                    setBalance({
                        open: true,
                        data,

                    })
                }

            },

            onError: async () => {

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

export default useCheckPeriodPoints
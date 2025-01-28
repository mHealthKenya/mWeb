import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

export enum Status {
    Approved = 'Approved',
    Rejected = 'Rejected',
}

interface Discharge {
    id: string
    status: Status
    walletAmount?: number
    settleAmount?: number
}

const discharge = async (data: Discharge) => {
    const axiosInstance = await axiosConfig()

    const request = await axiosInstance.patch('discharge/update', data).then((res) => res.data)

    return request
}

const useProcessDischarge = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: discharge,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['admissions'])
            Swal.fire({
                title: 'Success!',
                text: 'Discharge request has successfully been processed',
                icon: 'success',
                confirmButtonText: 'OK'

            })
        },
        onError: (error: any) =>
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'Could not process discharge',
                icon: 'error',
                confirmButtonText: 'OK'
            })
    })
}

export default useProcessDischarge
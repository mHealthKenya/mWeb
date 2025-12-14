import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"


interface AddDelivery {
    id: string
    delivered: boolean
    deliveryMethod: string
    comments: string
}

const addDeliveryStatus = async (data: AddDelivery) => {
    const axiosInstance = await axiosConfig()

    const request = await axiosInstance.patch('biodata/delivery', data).then((res) => res.data)

    return request
}

const useAddDelivery = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addDeliveryStatus,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['deliveries'])
            Swal.fire({
                title: 'Success!',
                text: 'Discharge request has successfully been submitted',
                icon: 'success',
                confirmButtonText: 'OK'

            })
        },
        onError: (error: any) => {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'Could not submit request',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}


export default useAddDelivery

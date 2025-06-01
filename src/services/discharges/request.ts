import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface RequestDischarge {
    id: string
    files: File[]
}

const requestDischarge = async ({ id, files }: RequestDischarge) => {
    const axiosInstance = await axiosConfig(true)

    const data = new FormData()

    data.append('admissionId', id)
    files.map((file) => data.append('files', file))

    const request = await axiosInstance.post('discharge/request', data).then((res) => res.data)

    return request
}

const useRequestDischarge = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: requestDischarge,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['admissions'])
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
                text: error?.response?.data?.message || 'Could not submit discharge request',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useRequestDischarge
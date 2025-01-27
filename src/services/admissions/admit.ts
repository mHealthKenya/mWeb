import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface Admit {
    userId: string
    facilityId: string
}

const admit = async (data: Admit) => {
    const axiosInstance = await axiosConfig()
    const admit = await axiosInstance.post('admissions', data).then((res) => res.data)

    return admit
}

const useAdmit = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: admit,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['admissions'])
            Swal.fire({
                title: 'Success!',
                text: 'Patient admitted!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },
        onError: async (error: any) => {

            console.log(error)
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'Could not admit patient',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useAdmit
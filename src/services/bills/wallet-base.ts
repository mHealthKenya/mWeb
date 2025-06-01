import { axiosConfig } from "@config/axios"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface Data {
    points: string
}

const walletBase = async (data: Data) => {
    const axiosInstance = await axiosConfig()
    const base = await axiosInstance.post('wallet/base', data).then((res) => res.data)

    return base
}


const useBase = () => {

    return useMutation({
        mutationFn: walletBase,
        onSuccess: async () => {
            Swal.fire({
                title: 'Success!',
                text: 'Base Set!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: async () => {
            Swal.fire({
                title: 'Error!',
                text: 'Could not set base',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}


export default useBase


import { axiosConfig } from "@config/axios"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"

const requestCode = async (userId: string) => {
    const axiosInstance = await axiosConfig()

    const data = {
        userId
    }

    const sendCode = await axiosInstance.post('wallet/requestcode', data).then((res) => res.data)

    return sendCode

}

const useSendBillCode = () => {

    return useMutation({
        mutationFn: requestCode,
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Code sent',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: () =>
            Swal.fire({
                title: 'Error!',
                text: 'Could not send code',
                icon: 'error',
                confirmButtonText: 'OK'
            })
    })
}

export default useSendBillCode
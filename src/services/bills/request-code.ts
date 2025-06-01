import { axiosConfig } from "@config/axios"
import { useMutation } from "@tanstack/react-query"
import Swal from "sweetalert2"

interface RequestCode {
    userId: string
    clinicVisitId: string
}

const requestCode = async (data: RequestCode) => {
    const axiosInstance = await axiosConfig()



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
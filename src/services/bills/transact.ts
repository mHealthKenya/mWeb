import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import billOpenAtom from "src/atoms/bill-open"
import Swal from "sweetalert2"

export interface Transact {
    code: string
    points: string
    userId: string
    clinicVisitId: string
}


const transact = async (data: Transact) => {
    const axiosInstance = await axiosConfig()
    const wall = await axiosInstance.post('wallet/transact', data).then((res) => res.data)

    return wall

}


const useTransact = () => {

    const queryClient = useQueryClient()

    const [_, setOpen] = useAtom(billOpenAtom)

    return useMutation({

        mutationFn: transact,
        onSuccess: async () => {
            await setOpen(false)
            queryClient.invalidateQueries(['bills'])
            queryClient.invalidateQueries(['facility-wallet'])
            Swal.fire({
                title: 'Success!',
                text: 'Bill sent!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: async () => {
            await setOpen(false)
            Swal.fire({
                title: 'Error!',
                text: 'Could not send bill',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}


export default useTransact
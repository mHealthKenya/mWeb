import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { approveAtom } from "src/atoms/approve"
import rejectAtom from "src/atoms/rejectatom"
import Swal from "sweetalert2"

interface Reject {
    id: string
    reason: string
}


const rejectTransaction = async (data: Reject) => {
    const axiosInstance = await axiosConfig()
    const reject = await axiosInstance.post('wallet/reverse', data).then((res) => res.data)

    return reject

}


const useReject = () => {

    const queryClient = useQueryClient()

    const [_, setReject] = useAtom(rejectAtom)
    const [__, setApproved] = useAtom(approveAtom)

    return useMutation({

        mutationFn: rejectTransaction,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['bills'])
            await queryClient.invalidateQueries(['wallets'])
            await queryClient.invalidateQueries(['facility-wallet'])
            await queryClient.invalidateQueries(['transactions'])

            await setApproved((approved) => ({ ...approved, data: null, open: false }))
            await setReject(false)

            Swal.fire({
                title: 'Success!',
                text: 'Bill rejected!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: async () => {
            await setApproved((approved) => ({ ...approved, data: null, open: false }))
            await setReject(false)
            Swal.fire({
                title: 'Error!',
                text: 'Could not reject bill',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    })
}


export default useReject
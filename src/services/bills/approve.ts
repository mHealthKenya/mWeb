import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { approveAtom } from "src/atoms/approve"
import Swal from "sweetalert2"

const approveTransaction = async (id: string) => {
    const axiosInstance = await axiosConfig()
    const data = {
        id
    }
    const wall = await axiosInstance.patch('wallet/approve', data).then((res) => res.data)

    return wall
}


const useApproveTransaction = () => {

    const queryClient = useQueryClient()

    const [_, setApproved] = useAtom(approveAtom)

    return useMutation({

        mutationFn: approveTransaction,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['bills'])
            await queryClient.invalidateQueries(['wallets'])
            await queryClient.invalidateQueries(['facility-wallet'])
            await queryClient.invalidateQueries(['transactions'])

            await setApproved((approved) => ({ ...approved, data: null, open: false }))

            Swal.fire({
                title: 'Success!',
                text: 'Bill approved!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: async () => {
            await setApproved((approved) => ({ ...approved, data: null, open: false }))
            Swal.fire({
                title: 'Error!',
                text: 'Could not approve transaction',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

    })
}


export default useApproveTransaction
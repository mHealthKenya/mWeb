import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAtom } from "jotai"
import updateWalletAtom from "src/atoms/update-wallet"
import Swal from "sweetalert2"

interface UpdateWallet {
    id: string
    balance: string
}

const updateWallet = async (data: UpdateWallet) => {
    const axiosInstance = await axiosConfig()
    const wall = await axiosInstance.patch('wallet/updatebalance', data).then((res) => res.data)

    return wall
}

const useUpdateWallet = () => {
    const queryClient = useQueryClient()
    const [_, updateWalletFn] = useAtom(updateWalletAtom)


    return useMutation({
        mutationFn: updateWallet,
        onSuccess: async () => {
            await updateWalletFn((wallet) => ({ ...wallet, wallet: null, open: false }))
            await queryClient.invalidateQueries(['wallets'])
            Swal.fire({
                title: 'Success!',
                text: 'Wallet updated!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },

        onError: async () => {
            await updateWalletFn((wallet) => ({ ...wallet, wallet: null, open: false }))
            Swal.fire({
                title: 'Error!',
                text: 'Could not update wallet',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useUpdateWallet
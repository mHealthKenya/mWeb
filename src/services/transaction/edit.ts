import { ManageTransactionProps } from '@components/Facilities/Wallet/managewallet'
import { axiosConfig } from '@config/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

interface ManageTransaction extends ManageTransactionProps {
  userId: string
}

export const manageTransaction = async (data: ManageTransaction) => {
  const axiosInstance = await axiosConfig()
  const managetransaction = await axiosInstance
    .patch('transactions/mother', data)
    .then((res) => res.data)
  return managetransaction
}

const useManageTransaction = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: manageTransaction,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries(['mother-transactions'])])
      completeFn()
      Swal.fire({
        title: 'Success!',
        text: 'Trasaction edited successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    onError: (error: any) => {
      completeFn()
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'An error occurred',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
}

export default useManageTransaction

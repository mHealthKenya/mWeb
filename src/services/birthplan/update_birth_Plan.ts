import { UpdateBirthPlanProps } from '@components/Birthplan/editBirthPlan'
import { axiosConfig } from '@config/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

interface UpdateBirthPlan extends UpdateBirthPlanProps {
  id: string
}

export const updateBirthPlan = async (data: UpdateBirthPlan) => {
  const axiosInstance = await axiosConfig()
  const updateUserBirthPlan = await axiosInstance.patch('birthplan/update', data)
  .then((res) => res.data)
  return updateUserBirthPlan
}

const useUpdateBirthPlan = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateBirthPlan,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries(['users-by-role-and-facility'])])
      completeFn()
      Swal.fire({
        title: 'Success!',
        text: 'Birth Plan updated successfully',
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

export default useUpdateBirthPlan

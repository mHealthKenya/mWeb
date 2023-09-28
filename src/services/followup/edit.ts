import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from "@config/axios";
import Swal from 'sweetalert2';
import { FollowUpUpdateProps } from '@components/Chv/Followup/edit';

interface FollowUp extends FollowUpUpdateProps {
    id: string
}

export const updateFollowUp = async (data: FollowUp) => {
    const axiosInstance = await axiosConfig()
    const updateUserFollowUp = await axiosInstance.patch('followup/update', data)
    .then((res) => res.data)
    return updateUserFollowUp
}

const useUpdateFollowUp = (completeFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateFollowUp,
        onSuccess: async () => {
            await Promise.all([queryClient.invalidateQueries(['allFollowUps'])])
            completeFn()
            Swal.fire({
              title: 'Success!',
              text: 'Follow up updated successfully',
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

export default useUpdateFollowUp
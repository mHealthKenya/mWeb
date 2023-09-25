import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosConfig } from "@config/axios"
import Swal from 'sweetalert2';
import { FollowUpProps } from '@components/Followup/Createfollowup';

interface FollowUp extends FollowUpProps{
    scheduleId: string
    // chvId: string
}

const followUp = async (data: FollowUp) => {
    const axiosInstance = await axiosConfig()
    const newFollowUp = await axiosInstance.post('followup/create', data)
    .then((res) => res.data)
    return newFollowUp
}

const useFollowUp = (completeFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation ({
        mutationFn: followUp,
        onSuccess: async () => {
            await Promise.all([
                // queryClient.invalidateQueries(['followup', data.scheduleId]),
                queryClient.invalidateQueries(['users-by-role'])
            ])
            Swal.fire({
                title: 'Success!',
                text: 'Follow Up Done',
                icon:'success',
                confirmButtonText:'OK'
            })
        },

        onError: (error: any) => {
            completeFn()
            Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'An Error Occured',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useFollowUp
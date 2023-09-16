import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddBirthPlanProps } from "@components/Birthplan/Create";
import { axiosConfig } from "@config/axios";
import Swal from 'sweetalert2';

interface AddBirthPlan extends AddBirthPlanProps {
    facilityId?: string,
}

export const addBirthPlan = async (data: AddBirthPlan) => {
    const axiosInstance = await axiosConfig()
    const birthPlan = await axiosInstance.post('birthplan/add', data)
    .then((res) => res.data)
    return birthPlan
}

const useAddBirthPlan = (completefn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation ({
        mutationFn: addBirthPlan,
        onSuccess: async () => {
            await Promise.all([queryClient.invalidateQueries(['users-by-role'])])
            completefn()
            Swal.fire({
                title: 'Success!',
                text: 'Birth Plan Added',
                icon: "success",
                confirmButtonText: 'OK'
            })
        },

        onError: (error: any) => {
            completefn()
            Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'An error occurred',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useAddBirthPlan
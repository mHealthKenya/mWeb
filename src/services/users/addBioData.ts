import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddBioDataFormProps } from "@components/Biodata/AddBioData"
import { axiosConfig } from "@config/axios"
import Swal from "sweetalert2"

interface AddBio extends AddBioDataFormProps {
    facilityId?: string,
  }

export const addBioData = async (data: AddBio) => {
    const axiosInstance = await axiosConfig()
    const bioData = await axiosInstance.post('biodata/add', data)
    .then((res) => res.data)
    return bioData
}

const useAddBioData = (completeFn: () => void) => {
    const queryClient = useQueryClient()
    return useMutation ({
        mutationFn: addBioData,
        onSuccess: async () => {
            await Promise.all([queryClient.invalidateQueries(['users-by-role'])])
            completeFn()
            Swal.fire({
                title: 'Success!',
                text: 'Bio Data Added',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            // .then(() => {
            //     completeFn()
            // })
        },

        onError: (error: any) => {
            completeFn() 
            Swal.fire({
                title: 'Error',
                text: error?.response?.data?.message || 'An error occurred',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    })
}

export default useAddBioData
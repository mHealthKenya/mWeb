import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"
import { AddBioDataProps } from "@components/Biodata/AddBioData"
import { axiosConfig } from "@config/axios"

interface AddBio extends AddBioDataProps {
    id?: string
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
            await Promise.all([queryClient.invalidateQueries(['user-bio-data'])])
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
import { EditBioDataProps } from '@components/Biodata/editBioData'
import { axiosConfig } from '@config/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

interface EditBioData extends EditBioDataProps {
  userId: string
}

export const editUserBioData = async (data: EditBioData) => {
  const axiosInstance = await axiosConfig()
  const editedBio = await axiosInstance.patch('biodata/update', data)
  .then((res) => res.data)
  return editedBio
}

const useEditUserBioData = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editUserBioData,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries(['users-by-role-and-facility'])])
      completeFn()
      Swal.fire({
        title: 'Success!',
        text: 'Mother edited successfully',
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

export default useEditUserBioData

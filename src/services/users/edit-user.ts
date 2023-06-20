import { EditForm } from '@components/Users/Edit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'
import Swal from 'sweetalert2'

interface EditUser extends EditForm {
  id: string
}

const editUser = async (data: EditUser) => {
  const edited = await axiosInstance.patch('users/update', data).then((res) => res.data)
  return edited
}

const useEditUser = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editUser,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries(['users-by-role'])])
      completeFn()
      Swal.fire({
        title: 'Success!',
        text: 'User edited successfully',
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

export default useEditUser
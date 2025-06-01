import { AddUserFormProps } from '@components/Users/Add'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { axiosConfig } from '../../config/axios'

export const addUser = async (data: AddUserFormProps) => {
  const axiosInstance = await axiosConfig()
  const newUser = await axiosInstance.post('users/add', data).then((res) => res.data)

  return newUser
}

const useAddUser = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addUser,
    onSuccess: async () => {
      await Promise.all([queryClient.invalidateQueries(['users-by-role'])])
      Swal.fire({
        title: 'Success!',
        text: 'User added',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        completeFn()
      })
    },

    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'An error occurred',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
}

export default useAddUser

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { axiosConfig } from '../../config/axios'
import { AddMotherFormProps, AddMotherProps } from '@components/Chv/Mothers/add'
import { UserByRole } from '@models/user-by-role'


export const addMother = async (data: AddMotherProps) => {
  const axiosInstance = await axiosConfig()
  const newMother = await axiosInstance.post('users/add', data).then((res) => res.data)

  return newMother
}

const useAddMother = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addMother,
    onSuccess: async (data) => {
      await Promise.all([queryClient.invalidateQueries([`users-by-role${data.facilityId}`])])
      Swal.fire({
        title: 'Success!',
        text: 'Mother added successfully',
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

export default useAddMother

import { axiosConfig } from '@config/axios'
import { AddBirthPlan } from '@models/birthplan'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

const addBirthPlan = async (data: AddBirthPlan) => {
  const axiosInstance = await axiosConfig()

  const newPlan = await axiosInstance.post('birthplan/add', data).then((res) => res.data)

  return newPlan
}

const useAddBirthPlan = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addBirthPlan,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([`plan${data.motherId}`])

      Swal.fire({
        title: 'Success!',
        text: 'Birth has successfully been updated',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },

    onError: () =>
      Swal.fire({
        title: 'Error!',
        text: 'Could not update birthplan',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  })
}

export default useAddBirthPlan

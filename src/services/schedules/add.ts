import { axiosConfig } from '@config/axios'
import { AddSchedule } from '@models/schedules'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

export const addSchedule = async (data: AddSchedule) => {
  const axiosInstance = await axiosConfig()

  const schedule = await axiosInstance.post('schedules/create', data).then((res) => res.data)

  return schedule
}

const useAddSchedule = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addSchedule,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([`schedules${data.motherId}`])

      Swal.fire({
        title: 'Success!',
        text: 'Schedule has successfully been created',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        completeFn()
      })
    },

    onError: () =>
      Swal.fire({
        title: 'Error!',
        text: 'Could not create schedule',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  })
}

export default useAddSchedule

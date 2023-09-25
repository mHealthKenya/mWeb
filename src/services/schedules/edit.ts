import { axiosConfig } from '@config/axios'
import { AddSchedule } from '@models/schedules'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

interface EditSchedule extends AddSchedule {
  id: string
  chvId?: string
}

const editSchedule = async (data: EditSchedule) => {
  const axiosInstance = await axiosConfig()

  const schedule = await axiosInstance.patch('schedules/update', data).then((res) => res.data)

  return schedule
}

const useEditSchedule = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: editSchedule,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([`schedules${data.motherId}`])

      completeFn()

      Swal.fire({
        title: 'Success!',
        text: 'Schedule has successfully been edited',
        icon: 'success',
        confirmButtonText: 'OK'
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

export default useEditSchedule

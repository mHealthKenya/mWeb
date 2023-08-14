import { axiosConfig } from "@config/axios"
import { Schedule } from "@models/schedule"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Swal from "sweetalert2"


interface Results {
  message: string
  data: Schedule
}

const addSchedule = async (data: Schedule) => {
  const axiosInstance = await axiosConfig()

  const newSchedule: Results = await axiosInstance.post('', {data}).then((res) => res.data)
  .catch((error) => console.log(error))

  return newSchedule
}

const useAddSchedule = (completeFn: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addSchedule,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(['allSchedules'])
      ])
      Swal.fire({
        title: 'Success!',
        text: 'Schedule Created Successful',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },

    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred' + error,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
}

export default useAddSchedule
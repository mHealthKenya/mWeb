import { axiosConfig } from "@config/axios";
import { ScheduleUpdate } from "@models/schedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const updateSchedule =async (data:ScheduleUpdate) => {
  const axiosInstance = axiosConfig()

  const newSchedule = (await axiosInstance).patch('', {data})
    .then((res) => res.data)
    .catch((error) => console.log(error))

    return newSchedule
}

const useUpdateSchedule = (completeFn: () => void) =>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateSchedule,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(['allSchedules'])
      ])
      Swal.fire({
        title: 'Success!',
        text: 'Schedule Updated Successful',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() =>{
        completeFn()
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

export default useUpdateSchedule
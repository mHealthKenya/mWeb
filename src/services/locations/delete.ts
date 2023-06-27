import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'
import Swal from 'sweetalert2'

const deleteFacility = async (id: string) => {
  const del = await axiosInstance.delete('facilities/delete?id=' + id).then((res) => res.data)

  return del
}

const useDeleteFacility = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFacility,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(['allFacilities']),
        queryClient.invalidateQueries(['coordinates'])
      ])
      Swal.fire({
        title: 'Success!',
        text: 'Location deleted',
        icon: 'success'
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

export default useDeleteFacility

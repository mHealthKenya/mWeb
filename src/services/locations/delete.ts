import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'
import Swal from 'sweetalert2'

const deleteLocation = async (id: string) => {
  const del = await axiosInstance.delete('locations/delete?id=' + id).then((res) => res.data)

  return del
}

const useDeleteLocation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries(['allLocations']),
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

export default useDeleteLocation

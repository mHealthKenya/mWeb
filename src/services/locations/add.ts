import { Location } from '@models/location'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'
import Swal from 'sweetalert2'

const addLocation = async (location_name: string) => {
  const newLocation: Location = await axiosInstance
    .post('locations/add', {
      location_name
    })
    .then((res) => res.data)

  return newLocation
}

const useAddLocation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addLocation,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(['allLocations']),
        queryClient.invalidateQueries(['coordinates'])
      ])
      Swal.fire({
        title: 'Success!',
        text: data.location_name + ' added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
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

export default useAddLocation

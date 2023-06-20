import { Location } from '@models/location'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'
import Swal from 'sweetalert2'

export interface UpdateLocation {
  id: string
  location_name: string
}
const updateLocation = async (locationData: UpdateLocation) => {
  const update: Location = await axiosInstance
    .patch('locations/update', {
      ...locationData
    })
    .then((res) => res.data)

  return update
}

const useUpdateLocation = (handleToggle: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateLocation,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(['allLocations']),
        queryClient.invalidateQueries(['coordinates'])
      ])
      Swal.fire({
        title: 'Success!',
        text: data.location_name + ' updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })

      handleToggle()
    },

    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'An error occurred',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      handleToggle()
    }
  })
}

export default useUpdateLocation

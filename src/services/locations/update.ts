import { Facility } from '@models/facility'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosConfig } from 'src/config/axios'
import Swal from 'sweetalert2'

export interface UpdateFacility {
  id: string
  name: string
}
const updateFacility = async (locationData: UpdateFacility) => {
  const axiosInstance = await axiosConfig()
  const update: Facility = await axiosInstance
    .patch('facilities/update', {
      ...locationData
    })
    .then((res) => res.data)

  return update
}

const useUpdateFacility = (handleToggle: () => void) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateFacility,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(['allFacilities']),
        queryClient.invalidateQueries(['coordinates'])
      ])
      Swal.fire({
        title: 'Success!',
        text: data.name + ' updated successfully',
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

export default useUpdateFacility

import { Facility } from '@models/facility'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from 'src/config/axios'
import Swal from 'sweetalert2'

interface Results {
  message: string
  data: Facility
}

const addFacility = async (name: string) => {
  const newLocation: Results = await axiosInstance
    .post('facilities/add', {
      name
    })
    .then((res) => res.data)

  return newLocation
}

const useAddFacility = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addFacility,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(['allFacilities']),
        queryClient.invalidateQueries(['coordinates'])
      ])
      Swal.fire({
        title: 'Success!',
        text: data.data.name + ' added successfully',
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

export default useAddFacility

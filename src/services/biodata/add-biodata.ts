import { axiosConfig } from '@config/axios'
import { AddBioData } from '@models/biodata'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Swal from 'sweetalert2'

export const addBioData = async (data: AddBioData) => {
  const axiosInstance = await axiosConfig()

  const newBio = await axiosInstance.post('biodata/add', data).then((res) => res.data)

  return newBio
}

const useAddBioData = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addBioData,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([`bio${data.userId}`])

      Swal.fire({
        title: 'Success!',
        text: 'Biodata has successfully been updated',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },

    onError: () =>
      Swal.fire({
        title: 'Error!',
        text: 'Could not update biodata',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  })
}

export default useAddBioData

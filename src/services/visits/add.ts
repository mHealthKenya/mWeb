import { axiosConfig } from '@config/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

interface Visit {
  motherId: string
  facilityId: string
  weight: string
  hiv: string
  hbLevel: string
  bloodGroup: string
  rhesusFactor: string
  urinalysis: string
  vdrl: string
  bloodRBS: string
  hepatitisB: string
  notes: string
  TB: string
}
const addVisit = async (data: Visit) => {
  const axiosInstance = await axiosConfig()
  const newVisit = await axiosInstance.post('clinicvisit/add', data).then((res) => res.data)

  return newVisit
}

const useAddVisit = (isAdmin?: boolean) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addVisit,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(['visit', data.facilityId]),
        queryClient.invalidateQueries(['latest', data.motherId])
      ])
      Swal.fire({
        title: 'Success!',
        text: 'Clinic visit recorded',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          switch (isAdmin) {
            case true:
              router.push('/sadmin/visits/all')
              break

            default:
              router.push('/facility/visits/all')
              break
          }
        }
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

export default useAddVisit

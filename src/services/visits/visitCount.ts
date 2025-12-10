import { axiosConfig } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import axios from "axios"

interface Visit {
  userId: string
  count: number
}

const visitCount = async (data: Visit) => {
  const axiosInstance = await axiosConfig()
  const response = await axiosInstance.post('/visit-count', data)
  return response.data
}

const useVisitCount = (isAdmin?: boolean) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: visitCount,
    onSuccess: async () => {
      queryClient.invalidateQueries(['visits'])


      await Swal.fire({
        title: 'Success!',
        text: 'Clinic visit recorded',
        icon: 'success',
        confirmButtonText: 'OK'
      })

      if (isAdmin) {
        router.push('/sadmin/outpatient')
      } else {
        router.push('/facility/visits/all')
      }
    },
    onError: (error: unknown) => {
      let message = 'An error occurred'

      if (axios.isAxiosError(error)) {
        const data = error.response?.data

        if (data && typeof data === 'object' && 'message' in data) {
          message = (data as { message: string }).message
        } else if (typeof data === 'string') {
          message = data
        }
      }

      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  })
}

export default useVisitCount

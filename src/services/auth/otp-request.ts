import { Reset } from "@components/Auth/requestreset"
import { baseURL } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
// import { baseURL } from "src/config/axios"

export const otpRequest = async ({ email }: Reset) => {
  const otpRequestD = await axios.post(baseURL + 'users/passwordrequest', { email }).then(async (res) =>
    res.data)
  return otpRequestD
}

const useOtpRequest = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: otpRequest,
    onSuccess: async (data) => {
      await Promise.all([queryClient.invalidateQueries([])])
      Swal.fire({
        title: 'Success!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/passwordreset/passwordreset')
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

export default useOtpRequest
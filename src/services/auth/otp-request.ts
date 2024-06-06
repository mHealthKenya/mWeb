import { baseURL } from "@config/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { OTP } from "../../pages/passwordreset/otp-request"
import Swal from "sweetalert2"
import axios from "axios"
import { useRouter } from "next/router"
import Cookies from "js-cookie"
// import { baseURL } from "src/config/axios"

export const otpRequest =async ({email}: OTP) => {
  console.log('Email HERE')
  console.log(email)
  // const axiosInstance = await axiosConfig()
  const otpRequestD = await axios.post(baseURL +'users/passwordrequest', {email}).then(async (res) => 
    // Cookies.set('otp_email', email),
    res.data)

  console.log(otpRequestD)
  Cookies.set('otp_email', email)
  return otpRequestD
}

const useOtpRequest = (compeleteFn: () => void) => {
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
      }).then(() =>{
        compeleteFn()
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
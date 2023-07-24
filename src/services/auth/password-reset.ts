import { baseURL } from "@config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2"
import { Passrest } from "src/pages/passwordreset/passwordreset";
import { useRouter } from "next/router";


export const passwordReset =async ({code, email, password}:Passrest) => {
  const passreset = await axios.post(baseURL + 'users/resetpassword', {code, email, password})
      .then((res) => res.data)
      
      return passreset;
  
}


const usePasswordReset =  () =>{
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: passwordReset,
    onSuccess: async (data) => {
      await Promise.all([queryClient.invalidateQueries(['passwordReset'])])
      Swal.fire({
        title: 'Success!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() =>{
        router.push('/login')
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

export default usePasswordReset
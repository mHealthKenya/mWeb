import { PasswordReset } from "@components/Auth/reset";
import { baseURL } from "@config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";


const passwordReset = async ({ code, password }: PasswordReset) => {
  const passReset = await axios.post(baseURL + 'users/resetpassword', { code, password }).then(async (res) => res.data)

  return passReset
};




export const usePasswordReset = () => {
  const queryClient = useQueryClient();
  const router = useRouter();


  return useMutation({
    mutationFn: passwordReset,
    onSuccess: async (data) => {
      await Promise.all([queryClient.invalidateQueries([])])
      Swal.fire({
        title: 'Success!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/login');
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'An error occurred',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  })
};

export default usePasswordReset;

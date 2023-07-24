import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "@config/axios";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Passrest } from "src/pages/passwordreset/passwordreset";

export const usePasswordReset = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const passwordReset = async ({ code, email, password }: Passrest) => {
    try {
      const passreset = await axios.post(baseURL + 'users/resetpassword', { code, email, password });
      return passreset.data;
    } catch (error) {
      throw error;
    }
  };

  return useMutation(passwordReset, {
    onSuccess: async (data) => {
      await Promise.all([queryClient.invalidateQueries(['passwordReset'])]);
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
  });
};

export default usePasswordReset;

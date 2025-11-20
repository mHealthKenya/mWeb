import { LoginCredentials } from '@components/Auth/login'
import { LoginSuccess } from '@models/login'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
// import { LoginCredentials } from '../../pages/login'
import { baseURL } from 'src/config/axios'
import Swal from 'sweetalert2'

const userLogin = async ({ email, password }: LoginCredentials) => {
  const user: LoginSuccess = await axios
    .post(baseURL + 'users/login', {
      email,
      password
    })
    .then(async (res) => {
      console.log('res', res)
      return res.data
    })

  return user
}

const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: userLogin,
    onSuccess: async (data) => {
      const { token } = data
      await Cookies.set('access-token', token)
      router.push('/')
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

export default useLogin

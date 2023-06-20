import { LoginSuccess } from '@models/login'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { LoginCredentials } from '../../pages/login'

const userLogin = async ({ email, password }: LoginCredentials) => {
  const user: LoginSuccess = await axios
    .post('https://mimbaplus.mhealthkenya.org/users/login', {
      email,
      password
    })
    .then(async (res) => {
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
    }
  })
}

export default useLogin

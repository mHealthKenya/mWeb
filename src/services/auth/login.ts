import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../config/axios'
import { LoginCredentials } from '../../pages/login'
import Cookies from 'js-cookie'
import { LoginSuccess } from '@models/login'
import { useRouter } from 'next/router'
import * as jwt from 'jsonwebtoken'
import { Users } from 'src/helpers/enums/users.enum'

const userLogin = async ({ email, password }: LoginCredentials) => {
  const user: LoginSuccess = await axiosInstance
    .post('users/login', {
      email,
      password
    })
    .then((res) => res.data)

  return user
}

const useLogin = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: userLogin,
    onSuccess: async (data) => {
      const { token } = data
      Cookies.set('access-token', token, { expires: 1 })
      router.push('/')
    }
  })
}

export default useLogin

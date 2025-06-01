import axios from 'axios'
import Cookies from 'js-cookie'

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosConfig = async (multipart?: boolean) => {
  const token = await Cookies.get('access-token')
  return await axios.create({
    baseURL,
    timeout: 100000,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': multipart ? 'multipart/form-data' : 'application/json'
    }
  })
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 100000,
  headers: {
    Authorization: `Bearer ${Cookies.get('access-token')}`
  }
})

export default axiosInstance

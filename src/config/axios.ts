import axios from 'axios'
import Cookies from 'js-cookie'

// export const baseURL = 'https://mimbaplus.mhealthkenya.org/'
// export const baseURL = 'http://localhost:8000/'
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosConfig = async () => {
  const token = await Cookies.get('access-token')
  return await axios.create({
    baseURL,
    timeout: 100000,
    headers: {
      Authorization: 'Bearer ' + token
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

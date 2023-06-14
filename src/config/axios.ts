import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'https://mimbaplus.mhealthkenya.org/',
  timeout: 100000,
  headers: {
    Authorization: `Bearer ${Cookies.get('access-token')}`
  }
})

export default axiosInstance

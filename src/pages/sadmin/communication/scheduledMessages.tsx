
import ScheduledMessagesComponent from '@components/ScheduleMessages/ScheduledMessages'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'

const ScheduledMessages = () => {
  return (
    <AdminLayout>
      <ScheduledMessagesComponent />
    </AdminLayout>
  )
}

export default ScheduledMessages

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== 'SuperAdmin') {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const usersD = axios
      .get(baseURL + 'users/roles?role=Mother', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const facilitiesD = axios.get(baseURL + 'facilities/all').then((res) => res.data)

    const [users, facilities] = await Promise.all([usersD, facilitiesD])
    return {
      props: {
        user,
        users,
        facilities
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}

import UsersByRoleComponent from '@components/Users/Role'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import useUsersByRole from 'src/services/users/by-role'

const CHVUsers = ({ users, facilities }: any) => {
  const { data } = useUsersByRole('CHV', users)

  return (
    <AdminLayout>
      <UsersByRoleComponent users={data} facility={true} facilities={facilities} />
    </AdminLayout>
  )
}

export default CHVUsers

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

    const facilitiesD = axios.get(baseURL + 'facilities/all').then((res) => res.data)
    const usersD = axios
      .get(baseURL + 'users/roles?role=CHV', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const [facilities, users] = await Promise.all([facilitiesD, usersD])

    return {
      props: {
        user,
        facilities,
        users
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

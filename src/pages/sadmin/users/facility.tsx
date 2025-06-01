import UsersByRoleComponent from '@components/Users/Role'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import useUsersByRole from 'src/services/users/by-role'

const FacilityAdminUsers = ({ users }: any) => {
  const { data } = useUsersByRole('Facility', users)

  return (
    <AdminLayout>
      <UsersByRoleComponent users={data} facility={true} />
    </AdminLayout>
  )
}

export default FacilityAdminUsers

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

    const users = await axios
      .get(baseURL + 'users/roles?role=Facility', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)
    return {
      props: {
        user,
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

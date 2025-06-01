import RegisteredMothersComponent from '@components/Users/Registered'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { Registered } from '@models/registered'
import { User } from '@models/user'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'

const CHVUsers = ({ users, user }: { users: Registered; user: User }) => {
  return (
    <AdminLayout>
      <RegisteredMothersComponent data={users} user={user} />
    </AdminLayout>
  )
}

export default CHVUsers

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const id = ctx?.params?.id

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

    const uss = axios
      .get(baseURL + 'users/mothers-registered?userId=' + id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const us = axios
      .get(baseURL + 'users/user?id=' + id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const [users, client] = await Promise.all([uss, us])

    return {
      props: { users, user: client }
    }
  } catch (error) {
    console.log({error})
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}

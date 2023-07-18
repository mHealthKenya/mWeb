import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import AdminLayout from '@layout/AdminLayout/AdminLayout'

const SuperAdmin = () => {
  return <AdminLayout> SuperAdminPage</AdminLayout>
}

export default SuperAdmin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    return {
      props: {
        user
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

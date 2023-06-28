import NAdminLayout from '@layout/NAdminLayout/NAdminLayout'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const Admin = () => {
  return <NAdminLayout> Admin Pages</NAdminLayout>
}

export default Admin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user?.role !== Users.Admin) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
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

import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import CHVLayout from "@layout/CHVLayout/CHVLayout"
import { GetServerSideProps } from 'next'

const CHVDashBoard = () => {
  return <CHVLayout>CHP</CHVLayout>
}

export default CHVDashBoard


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
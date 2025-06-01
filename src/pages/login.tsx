//

import LoginComponent from '@components/Auth/login'
import { GetServerSideProps } from 'next'
import React from 'react'
import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'

const Login = () => {
  return <LoginComponent />
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  console.log('baseURL', baseURL)

  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    if (user) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }
  } catch (err) {
    return {
      props: {}
    }
  } finally {
    return {
      props: {}
    }
  }
}

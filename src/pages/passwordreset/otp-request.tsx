import RequestReset from '@components/Auth/requestreset'
import React from 'react'
import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'

const OTPRequest = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <RequestReset />
    </div>
  )
}

export default OTPRequest

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

import { GetServerSideProps } from 'next'
import React from 'react'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'
import * as jwt from 'jsonwebtoken'

const Home = () => {
  return <div>Home</div>
}

export default Home

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.JWT_SECRET}`)

    switch (user.role) {
      case Users.SuperAdmin:
        return {
          redirect: {
            destination: '/sadmin',
            permanent: false
          }
        }

      case Users.Admin: {
        return {
          redirect: {
            destination: '/admin',
            permanent: false
          }
        }
      }

      case Users.CHV: {
        return {
          redirect: {
            destination: '/chv',
            permanent: false
          }
        }
      }

      default:
        return {
          redirect: {
            destination: '/mother',
            permanent: false
          }
        }
    }
  } catch (error) {
    return {
      props: {
        data: 'Unauthenticated User'
      }
    }
  }
}

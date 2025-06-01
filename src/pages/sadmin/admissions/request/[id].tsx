import DischargeSummary from '@components/Admissions/summary'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { DischargeRequest } from '@models/discharge-request'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import React, { FC } from 'react'
import { Users } from 'src/helpers/enums/users.enum'

const RequestPage: FC<{ request: DischargeRequest }> = ({ request }) => {
  return (
    <AdminLayout>
      <DischargeSummary data={request} />
    </AdminLayout>
  )
}

export default RequestPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  const cookie = cookies['access-token']
  const { id } = context.params!

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== Users.SuperAdmin) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const request = await axios
      .get(baseURL + 'discharge/request?id=' + id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        request
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}

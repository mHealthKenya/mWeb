import { DeliveryForm } from '@components/Chv/Deliveries/form'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import { GetServerSideProps } from 'next'
import React from 'react'
import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import axios from 'axios'
import { baseURL } from '@config/axios'
import { BiodataUser } from '@models/biodatauser'

interface PageProps {
  bioData: BiodataUser
}

const Delivery = ({ bioData }: PageProps) => {
  return (
    <CHVLayout>
      <DeliveryForm bioData={bioData} />
    </CHVLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const { id } = ctx.params as { id: string }

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    console.log({ user })

    if (user.role !== 'CHV') {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const userDBio = axios
      .get(baseURL + 'biodata/id?motherId=' + id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const [bioData] = await Promise.all([userDBio])

    console.log({ bioData })

    return {
      props: { bioData }
    }
  } catch (error) {
    console.log({ error })
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // Fetch data using the id
  // const data = await fetchData(id)

  return {
    props: {
      id
      // data
    }
  }
}

export default Delivery

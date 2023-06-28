import AddUserComponent from '@components/Users/Add'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { GetServerSideProps } from 'next'
import React from 'react'
import nookies from 'nookies'
import axios from 'axios'
import { baseURL } from 'src/config/axios'
import * as jwt from 'jsonwebtoken'
import useAllFacilities from 'src/services/locations/all'

const AddUsers = ({ facilities }: any) => {
  const { data: allFacilities } = useAllFacilities(facilities)
  return (
    <AdminLayout>
      <AddUserComponent facilities={allFacilities} />
    </AdminLayout>
  )
}

export default AddUsers

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

    const facilities = await axios.get(baseURL + 'facilities/all').then((res) => res.data)

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
        users,
        facilities
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

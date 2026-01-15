import { PatientVisitsDisplay } from '@components/Visits/Dashboard'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { GetServerSideProps } from 'next'
import React from 'react'
import nookies from 'nookies'
import axios, { AxiosRequestConfig } from 'axios'
import * as jwt from 'jsonwebtoken'
import { baseURL } from '@config/axios'
import { VisitsDashBoard } from '@models/visits-dash'
const Outpatient = ({
  patientData,
}: {
  patientData: VisitsDashBoard[]
}) => {
  return (
    <AdminLayout>
      <PatientVisitsDisplay patientData={patientData} />
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  const config = (url: string) => {
    const item: AxiosRequestConfig = {
      method: 'GET',
      url,
      headers: {
        Authorization: 'Bearer ' + cookie
      }
    }
    return item
  }

  const patientData = await axios(config(baseURL + 'clinicvisit/visitcount')).then(
    (res) => res.data
  )

  const zeroVisits = await axios(config(baseURL + 'stats/no-visit-mothers')).then((res) => res.data)

  try {
    await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    return {
      props: {
        patientData,
        zeroVisits
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

export default Outpatient

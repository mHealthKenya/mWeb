import { GetServerSideProps } from 'next'
import React from 'react'
import nookies from 'nookies'
import axios from 'axios'
import { baseURL } from '@config/axios'
import * as jwt from 'jsonwebtoken'
import FacilityBioDataComponent from '@components/Facilities/Admissions/biodata'
import { FacilityBioData } from '@models/biodata'

const Mothers = ({ bioData, facilityId }: { bioData: FacilityBioData[]; facilityId: string }) => {
  return (
    <div className="py-6 px-4">
      <FacilityBioDataComponent bioData={bioData} facilityId={facilityId} />
    </div>
  )
}

export default Mothers

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== 'Facility') {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    const userDetails = await axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const facilityId = userDetails.facilityId

    const bioData = await axios
      .get(baseURL + 'biodata/facility?facilityId=' + facilityId, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        bioData,
        facilityId
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

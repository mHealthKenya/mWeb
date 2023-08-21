import VisitTabs from '@components/Facilities/visittab'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import useVisitsByFacility from '@services/visits/byfacility'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'

const AllVisits = ({ clinicalVisits, bioData, userDetails }: any) => {
  const { data: visits } = useVisitsByFacility(userDetails.facilityId, clinicalVisits)

  return (
    <AdminLayout>
      <VisitTabs visits={visits} bioData={bioData} admin={true} />
    </AdminLayout>
  )
}

export default AllVisits

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

    const userDetails = await axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const bioData = await axios
      .get(baseURL + 'biodata/facility?facilityId=' + userDetails.facilityId, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const clinicalVisits = await axios
      .get(baseURL + 'clinicvisit/facility?facilityId=' + userDetails.facilityId, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        user,
        userDetails,
        clinicalVisits,
        bioData
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

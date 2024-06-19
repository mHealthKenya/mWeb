import WalletTabs from '@components/Facilities/Wallet/wallettab'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import useVisitsByFacility from '@services/visits/byfacility'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'

const WalletPage = ({ clinicalVisits, userDetails, status, bioData }: any) => {
  const { data: visits } = useVisitsByFacility(userDetails.facilityId, clinicalVisits)

  return (
    <FacilityLayout>
      <WalletTabs visits={visits} bioData={bioData} status={status} admin={false} />
    </FacilityLayout>
  )
}

export default WalletPage
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
      .get(`${baseURL}users/user?id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    if (!userDetails.facilityId || typeof userDetails.facilityId !== 'string') {
      throw new Error('Invalid facilityId')
    }

    const bioData = await axios
      .get(`${baseURL}biodata/facility?facilityId=${userDetails.facilityId}`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const clinicalVisits = await axios
      .get(`${baseURL}clinicvisit/facility?facilityId=${userDetails.facilityId}`, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const status = await axios
      .get(`${baseURL}wallet/user?userId=20946634-166e-4d43-ba12-e2eb1578fd60`, {
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
        bioData,
        status
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

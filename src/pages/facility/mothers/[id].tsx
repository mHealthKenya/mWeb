import BioDataTabs from '@components/BioData/BioDataTab'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { UserSchedule } from '@models/schedules'
import { User } from '@models/user'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

export interface MotherAndUserDetails {
  userDetails: User
  motherDetails: User
  bioData: any
  schedules: UserSchedule[]
}

const MotherPage = ({ userDetails, motherDetails, bioData, schedules }: MotherAndUserDetails) => {
  return (
    <FacilityLayout>
      <BioDataTabs
        data={{
          biodata: bioData,
          userId: motherDetails?.id,
          facilityId: userDetails?.facilityId,
          schedules,
          user: motherDetails
        }}
      />
    </FacilityLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx?.params?.id
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    if (user?.role !== Users.Facility) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const userD = axios.get(baseURL + 'users/user?id=' + user.id, {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const motherD = axios.get(baseURL + 'users/user?id=' + id, {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const scheds = axios.get(baseURL + 'schedules/mother?motherId=' + id, {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const [userDetails, motherDetails, schedules] = await Promise.all([userD, motherD, scheds])

    const bioData = await axios
      .get(baseURL + 'biodata/id?motherId=' + motherDetails?.data?.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        user,
        userDetails: userDetails.data,
        motherDetails: motherDetails.data,
        bioData,
        schedules: schedules.data
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

export default MotherPage

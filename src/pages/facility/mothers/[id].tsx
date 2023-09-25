import BioDataTabs from '@components/BioData/BioDataTab'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { BirthPlan } from '@models/birthplan'
import { Facility } from '@models/facility'
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
  facilities: Facility[]
  birthPlan: BirthPlan
  chvs: User[]
}

const MotherPage = ({
  userDetails,
  motherDetails,
  bioData,
  schedules,
  facilities,
  birthPlan,
  chvs
}: MotherAndUserDetails) => {
  return (
    <FacilityLayout>
      <BioDataTabs
        data={{
          biodata: bioData,
          userId: motherDetails?.id,
          facilityId: userDetails?.facilityId,
          schedules,
          user: motherDetails,
          chvs
        }}
        facilities={facilities}
        birthPlan={birthPlan}
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

    const bplan = axios.get(baseURL + 'birthplan/mother?motherId=' + id, {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const bio = axios.get(baseURL + 'biodata/id?motherId=' + id, {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const facs = axios.get(baseURL + 'facilities/all')

    const [userDetails, motherDetails, schedules, facilities, birthPlan, bioData] =
      await Promise.all([userD, motherD, scheds, facs, bplan, bio])

    const finalFacilities = facilities.data.filter(
      (item: Facility) => item.id !== userDetails.data.facilityId
    )

    const chvs = await axios
      .get(baseURL + `users/roleandfacility?facilityId=${userDetails?.data?.facilityId}&role=CHV`, {
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
        bioData: bioData.data,
        schedules: schedules.data,
        facilities: finalFacilities,
        birthPlan: birthPlan.data,
        chvs
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

import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import { GetServerSideProps } from 'next'
import { Motherstats, TotalMotherstats } from '@models/chvmothers'
import { Users } from 'src/helpers/enums/users.enum'
import { baseURL } from '@config/axios'
import axios from 'axios'
import CHVHome from '@components/Chv/Dashboard/Dashboard'
import { Followupstats } from '@models/chvfollowupstats'
import { Enquirystats } from '@models/enquiry'

interface HomeCHV {
  mother_stats: Motherstats
  total_mother_stats: TotalMotherstats
  followup_stats: Followupstats[]
  enquiry_stats: Enquirystats
}

const CHVDashBoard = ({
  mother_stats,
  total_mother_stats,
  followup_stats,
  enquiry_stats
}: HomeCHV) => {
  return (
    <CHVLayout>
      <CHVHome
        mother_stats={mother_stats}
        total_mother_stats={total_mother_stats}
        followup_stats={followup_stats}
        enquiry_stats={enquiry_stats}
      />
    </CHVLayout>
  )
}

export default CHVDashBoard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user?.role !== Users.CHV) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const MotherDist = axios.get(baseURL + 'stats/chvmothers', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const TotalMotherDist = axios.get(baseURL + 'stats/motherschv', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const FollowupDist = axios.get(baseURL + `stats/chvfollowups`, {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const EnquiryDist = axios.get(baseURL + 'stats/enquiries', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const [MotherDist1, TotalMotherDist1, FollowupDist1, EnquiryDist1] = await Promise.all([
      MotherDist,
      TotalMotherDist,
      FollowupDist,
      EnquiryDist
    ])

    const mother_stats: Motherstats = MotherDist1.data
    const total_mother_stats: TotalMotherstats = TotalMotherDist1.data
    const followup_stats: Followupstats[] = FollowupDist1.data
    const enquiry_stats: Enquirystats = EnquiryDist1.data

    return {
      props: {
        user,
        mother_stats,
        total_mother_stats,
        followup_stats,
        enquiry_stats
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

import Home from '@components/Dashboard/Dashboard'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { SMSCost } from '@models/sms'
import { SMSStats } from '@models/smsstats'
import { MotherDistribution, TotalUsers, TotalVisits, UserDistribution } from '@models/user'
import axios from 'axios'

import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

interface HomeAdmin {
  total_sms_cost: number
  total_users: number
  total_facilities: number
  total_visits: number
  mother_distribution: MotherDistribution[]
  chv_distribution: MotherDistribution[]
  smsStats: SMSStats[]
  visits_distribution: MotherDistribution[]
  user_distribution: UserDistribution[]
  monthly_sms_count: TotalVisits
  total_sms_count: TotalVisits
  monthly_sms_cost: number
  monthly_clinic_visits: TotalVisits
}

const SuperAdmin = ({
  total_sms_cost,
  total_users,
  total_facilities,
  total_visits,
  mother_distribution,
  smsStats,
  chv_distribution,
  visits_distribution,
  user_distribution,
  monthly_sms_count,
  total_sms_count,
  monthly_sms_cost,
  monthly_clinic_visits
}: HomeAdmin) => {
  return (
    <AdminLayout>
      {' '}
      <Home
        total_sms_cost={total_sms_cost}
        total_users={total_users}
        total_facilities={total_facilities}
        total_visits={total_visits}
        mother_distribution={mother_distribution}
        smsStats={smsStats}
        chv_distribution={chv_distribution}
        visits_distribution={visits_distribution}
        users_distribution={user_distribution}
        monthly_sms_count={monthly_sms_count}
        total_sms_count={total_sms_count}
        monthly_sms_cost={monthly_sms_cost}
        monthly_clinic_visits={monthly_clinic_visits}
      />
    </AdminLayout>
  )
}

export default SuperAdmin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user?.role !== Users.SuperAdmin) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const sCost = axios.get(baseURL + 'sms/cost', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const mSCost = axios.get(baseURL + 'sms/cost/month', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const tUsers = axios.get(baseURL + 'users/count', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const mDist = axios.get(baseURL + 'users/facilitydistribution', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const cDist = axios.get(baseURL + 'users/facilitychvdistribution', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const smStat = axios.get(baseURL + 'sms/stats', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const tVisit = axios.get(baseURL + 'clinicvisit/count', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const vDist = axios.get(baseURL + 'clinicvisit/visits/count', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const userDist = axios.get(baseURL + 'users/distribution', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const mSMSC = axios.get(baseURL + 'sms/count/month', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const smsC = axios.get(baseURL + 'sms/count/all', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const mVistC = axios.get(baseURL + 'clinicvisit/monthly/count', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })

    const [
      smsCost1,
      smsMCost1,
      totalUsers1,
      mDist1,
      smsStat,
      cDist1,
      totalVisit1,
      vDist1,
      userDist1,
      mSMSC1,
      smsC1,
      mVistC1
    ] = await Promise.all([
      sCost,
      mSCost,
      tUsers,
      mDist,
      smStat,
      cDist,
      tVisit,
      vDist,
      userDist,
      mSMSC,
      smsC,
      mVistC
    ])

    const smsCost: SMSCost = smsCost1.data
    const smsMCost: SMSCost = smsMCost1.data
    const totalUsers: TotalUsers = totalUsers1.data
    const mother_distribution = mDist1.data
    const smsStats: SMSStats = smsStat.data
    const chv_distribution = cDist1.data
    const visits_distribution = vDist1.data
    const total_visits: TotalVisits = totalVisit1.data
    const user_distribution: UserDistribution[] = userDist1.data
    const monthly_sms_count: TotalVisits = mSMSC1.data
    const total_sms_count: TotalVisits = smsC1.data
    const monthly_clinic_visits: TotalVisits = mVistC1.data

    return {
      props: {
        user,
        total_sms_cost: smsCost._sum.cost,
        monthly_sms_cost: smsMCost._sum.cost,
        total_users: totalUsers.total_users,
        total_facilities: 10,
        total_visits: total_visits.count,
        mother_distribution,
        chv_distribution,
        smsStats,
        visits_distribution,
        user_distribution,
        monthly_sms_count,
        total_sms_count,
        monthly_clinic_visits
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

import Home from '@components/Dashboard/Dashboard'
import { baseURL } from '@config/axios'
import NAdminLayout from '@layout/NAdminLayout/NAdminLayout'
import { SMSCost } from '@models/sms'
import { SMSStats } from '@models/smsstats'
import { MotherDistribution, TotalUsers } from '@models/user'
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
}

const Admin = ({
  total_sms_cost,
  total_users,
  total_facilities,
  total_visits,
  mother_distribution,
  smsStats,
  chv_distribution
}: HomeAdmin) => {
  return (
    <NAdminLayout>
      {' '}
      <Home
        total_sms_cost={total_sms_cost}
        total_users={total_users}
        total_facilities={total_facilities}
        total_visits={total_visits}
        mother_distribution={mother_distribution}
        smsStats={smsStats}
        chv_distribution={chv_distribution}
      />
    </NAdminLayout>
  )
}

export default Admin

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user?.role !== Users.Admin) {
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

    const [smsCost1, totalUsers1, mDist1, smsStat, cDist1] = await Promise.all([
      sCost,
      tUsers,
      mDist,
      smStat,
      cDist
    ])

    const smsCost: SMSCost = smsCost1.data
    const totalUsers: TotalUsers = totalUsers1.data
    const mother_distribution = mDist1.data
    const smsStats: SMSStats = smsStat.data
    const chv_distribution = cDist1.data

    return {
      props: {
        user,
        total_sms_cost: smsCost._sum.cost,
        total_users: totalUsers.total_users,
        total_facilities: 10,
        total_visits: 300,
        mother_distribution,
        chv_distribution,
        smsStats
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

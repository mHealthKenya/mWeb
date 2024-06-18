// import WalletDashboard from '@components/Dashboard/wallets'
import WalletDashboard from '@components/Dashboard/wallets/dashboard'
import { WalletTotalProps } from '@components/Dashboard/wallets/totals'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import axios, { AxiosRequestConfig } from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'
import dayjs from 'dayjs'

const Dashboard = ({
  facility,
  mother,
  todaysTransactionsTotal,
  weeksTransactionsTotal,
  monthsTransactionsTotal
}: {
  facility: WalletTotalProps
  mother: WalletTotalProps
  todaysTransactionsTotal: WalletTotalProps
  weeksTransactionsTotal: WalletTotalProps
  monthsTransactionsTotal: WalletTotalProps
}) => {
  return (
    <AdminLayout>
      <WalletDashboard
        facility={facility}
        mother={mother}
        todaysTransactionsTotal={todaysTransactionsTotal}
        weeksTransactionsTotal={weeksTransactionsTotal}
        monthsTransactionsTotal={monthsTransactionsTotal}
      />
    </AdminLayout>
  )
}

export default Dashboard

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

    const fac = axios(config(baseURL + 'wallet/facility/balance')).then((res) => res.data)

    const moth = axios(config(baseURL + 'wallet/mothers/balance')).then((res) => res.data)

    const date = new Date()

    const startOfToday = dayjs(date).startOf('day').toDate().toISOString()
    const endOfToday = dayjs(date).endOf('day').toDate().toISOString()

    const startOfWeek = dayjs(date).startOf('week').toDate().toISOString()
    const endOfWeek = dayjs(date).endOf('week').toDate().toISOString()

    const startOfMonth = dayjs(date).startOf('month').toDate().toISOString()
    const endOfMonth = dayjs(date).endOf('month').toDate().toISOString()

    const todayTransactionTotal = axios(
      config(
        baseURL +
          `wallet/transactions/totals/period?startDate=${startOfToday}&endDate=${endOfToday}`
      )
    ).then((res) => res.data)

    const weekTransactionTotal = axios(
      config(
        baseURL + `wallet/transactions/totals/period?startDate=${startOfWeek}&endDate=${endOfWeek}`
      )
    ).then((res) => res.data)

    const monthTransactionTotal = axios(
      config(
        baseURL +
          `wallet/transactions/totals/period?startDate=${startOfMonth}&endDate=${endOfMonth}`
      )
    ).then((res) => res.data)

    const [
      facility,
      mother,
      todaysTransactionsTotal,
      weeksTransactionsTotal,
      monthsTransactionsTotal
    ] = await Promise.all([
      fac,
      moth,
      todayTransactionTotal,
      weekTransactionTotal,
      monthTransactionTotal
    ])

    return {
      props: {
        facility: {
          title: 'Facilities',
          amount: facility.totalBalance,
          description: 'Real-time snapshot of total points owed to facilities. '
        },
        mother: {
          title: 'Mothers',
          amount: mother.totalBalance,
          description: 'Real-time snapshot of total points in mothers wallets. '
        },

        todaysTransactionsTotal: {
          title: 'Today',
          amount: todaysTransactionsTotal?.totalPoints || 0,
          description: 'All approved transactions today'
        },

        weeksTransactionsTotal: {
          title: 'This Week',
          amount: weeksTransactionsTotal?.totalPoints || 0,
          description: 'All approved transactions this week'
        },

        monthsTransactionsTotal: {
          title: 'This Month',
          amount: monthsTransactionsTotal?.totalPoints || 0,
          description: 'All approved transactions this month'
        }
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

import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import { Users } from 'src/helpers/enums/users.enum'
import axios, { AxiosRequestConfig } from 'axios'
import { baseURL } from '@config/axios'
import FDashboard from '@components/Facilities/Dashboard/dashboard'

const FacilityDashBoard = ({
  totalchvs,
  totalmothers,
  totalvisits,
  mothlyvisits,
  mothersmonthly,
  data
}: any) => {
  return (
    <FacilityLayout>
      <FDashboard
        totalchvs={totalchvs}
        totalmothers={totalmothers}
        totalvisits={totalvisits}
        mothlyvisits={mothlyvisits}
        mothersmonthly={mothersmonthly}
        dist={data}
      />
    </FacilityLayout>
  )
}

export default FacilityDashBoard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

    const tvisits = axios(config(baseURL + 'stats/totalvisits')).then((res) => res.data)
    const tmothers = axios(config(baseURL + 'stats/totalmothers')).then((res) => res.data)
    const tchv = axios(config(baseURL + 'stats/totalchvs')).then((res) => res.data)
    const mvisits = axios(config(baseURL + 'stats/monthlyvisits')).then((res) => res.data)
    const mmothers = axios(config(baseURL + 'stats/monthlymothers')).then((res) => res.data)
    const dist = axios(config(baseURL + 'stats/scheduledist')).then((res) => res.data)

    const [totalchvs, totalmothers, totalvisits, mothlyvisits, mothersmonthly, data] =
      await Promise.all([tchv, tmothers, tvisits, mvisits, mmothers, dist])

    return {
      props: {
        totalchvs,
        totalmothers,
        totalvisits,
        mothlyvisits,
        mothersmonthly,
        data
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

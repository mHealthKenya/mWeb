import Bills from '@components/billing/bills'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { BillVisit } from '@models/billvisit'
import { FacilityWallet } from '@models/facilitywallet'
import { User } from '@models/user'
import axios, { AxiosRequestConfig } from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const AllBills = ({
  billable,
  user,
  facilityWallet
}: {
  billable: BillVisit[]
  user: User
  facilityWallet: FacilityWallet
}) => {
  return (
    <FacilityLayout>
      <Bills bills={billable} facilityId={user?.facilityId} wallet={facilityWallet} />
    </FacilityLayout>
  )
}

export default AllBills

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

    const bill = axios(config(baseURL + 'clinicvisit/unbilled')).then((res) => res.data)

    const actualUser = axios(config(baseURL + 'users/individual')).then((res) => res.data)

    const wallTot = axios(config(baseURL + 'wallet/facility')).then((res) => res.data)

    const [billable, aUser, facilityWallet] = await Promise.all([bill, actualUser, wallTot])

    return {
      props: {
        user: aUser,
        billable,
        facilityWallet
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

import AllWallets from '@components/wallet/tabs/allwallets'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { Facility } from '@models/facility'
import { FacilityWallet } from '@models/facilitywallets'
import { MotherBalances } from '@models/mother-balances'
import { UserWallet } from '@models/userwallet'
import { allFacilities } from '@services/locations/all'
import axios, { AxiosRequestConfig } from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const AllTransactionsMade = ({
  allFacilityWallets,
  wallets,
  facilities,
  balances
}: {
  allFacilityWallets: FacilityWallet[]
  wallets: UserWallet[]
  facilities: Facility[]
  balances: MotherBalances[]
}) => {
  return (
    <AdminLayout>
      <AllWallets
        allFacilityWallets={allFacilityWallets}
        wallets={wallets}
        facilities={facilities}
        balances={balances}
      />
    </AdminLayout>
  )
}

export default AllTransactionsMade

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

    const fac = axios(config(baseURL + 'wallet/facility/all')).then((res) => res.data)

    const facs = allFacilities()

    const wall = axios(config(baseURL + 'wallet/all')).then((res) => res.data)

    const bals = axios(config(baseURL + 'wallet/balances')).then((res) => res.data)

    const [allFacilityWallets, wallets, facilities, balances] = await Promise.all([
      fac,
      wall,
      facs,
      bals
    ])

    return {
      props: {
        allFacilityWallets,
        wallets,
        facilities,
        balances
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

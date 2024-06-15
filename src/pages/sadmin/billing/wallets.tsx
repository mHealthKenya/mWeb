import AllWallets from '@components/wallet/tabs/allwallets'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { FacilityWallet } from '@models/facilitywallets'
import { UserWallet } from '@models/userwallet'
import axios, { AxiosRequestConfig } from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const AllTransactionsMade = ({
  allFacilityWallets,
  wallets
}: {
  allFacilityWallets: FacilityWallet[]
  wallets: UserWallet[]
}) => {
  return (
    <AdminLayout>
      <AllWallets allFacilityWallets={allFacilityWallets} wallets={wallets} />
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

    const wall = axios(config(baseURL + 'wallet/all')).then((res) => res.data)

    const [allFacilityWallets, wallets] = await Promise.all([fac, wall])

    return {
      props: {
        allFacilityWallets,
        wallets
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

import AllTransactions from '@components/transactions/all'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { AllTransactionsType } from '@models/alltransactions'
import { User } from '@models/user'
import axios, { AxiosRequestConfig } from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const AllTransactionsMade = ({
  allTransactions,
  user
}: {
  allTransactions: AllTransactionsType[]
  user: User
}) => {
  return (
    <AdminLayout>
      <AllTransactions bills={allTransactions} />
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

    const trans = axios(config(baseURL + 'wallet/transactions/all')).then((res) => res.data)

    const actualUser = axios(config(baseURL + 'users/individual')).then((res) => res.data)

    const [allTransactions, aUser] = await Promise.all([trans, actualUser])

    return {
      props: {
        user: aUser,
        allTransactions
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

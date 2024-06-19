import ManageWalletComponent from '@components/Facilities/Wallet/all'
import NAdminLayout from '@layout/NAdminLayout/NAdminLayout'
import useManageTransaction from '@services/transaction/edit'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import { Users } from 'src/helpers/enums/users.enum'

const MotherWallet = ({ users, status, transactions }: any) => {
  const { data } = useManageTransaction(transactions)

  return (
    <NAdminLayout>
      <ManageWalletComponent
        facility={true}
        admin={true}
        status={status}
        transactions={transactions}
        users={users}
        data={data}
      />
    </NAdminLayout>
  )
}

export default MotherWallet

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== Users.Admin) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const users = await axios
      .get(baseURL + 'users/roles?role=Mother', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const userDetails = await axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const status = await axios
      .get(baseURL + 'wallet/user?userId=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const transactions = await axios
      .get(baseURL + 'transactions/mother', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        user,
        users,
        userDetails,
        status,
        transactions
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

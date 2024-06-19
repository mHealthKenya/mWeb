import ManageWalletComponent from '@components/Facilities/Wallet/all'
import NAdminLayout from '@layout/NAdminLayout/NAdminLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import { Users } from 'src/helpers/enums/users.enum'
import useUsersByRole from 'src/services/users/by-role'

const FacilityWallet = ({ users, status }: any) => {
  const { data } = useUsersByRole('Facility', users)

  return (
    <NAdminLayout>
      <ManageWalletComponent
        facility={true}
        users={data}
        admin={true}
        status={status}
        transactions={[]} data={undefined}      />
    </NAdminLayout>
  )
}

export default FacilityWallet

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== Users.Admin) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const users = await axios
      .get(baseURL + 'users/roles?role=Facility', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const status = await axios
      .get(baseURL + 'wallet/user?userId=20946634-166e-4d43-ba12-e2eb1578fd60', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)
    return {
      props: {
        user,
        users,
        status
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

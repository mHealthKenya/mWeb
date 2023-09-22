import UsersByRoleComponent from '@components/Users/Role'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const MothersPage = ({ mothers }: any) => {
  return (
    <FacilityLayout>
      <UsersByRoleComponent users={mothers} facility={true} isFacility={true} />{' '}
    </FacilityLayout>
  )
}

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

    const userDetails = await axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const mothers = await axios
      .get(
        baseURL +
          'users/roleandfacility?facilityId=' +
          userDetails?.facilityId +
          '&role=' +
          Users.Mother,
        {
          headers: {
            Authorization: `Bearer ${cookie}`
          }
        }
      )
      .then((res) => {
        return res.data
      })

    return {
      props: {
        user,
        mothers
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

export default MothersPage

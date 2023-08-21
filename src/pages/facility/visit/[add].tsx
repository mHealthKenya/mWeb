import AddVisitComponent from '@components/Facilities/addvisit'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'

const AddVisitPage = ({ lastVisit, userDetails, bioDataId }: any) => {
  return (
    <FacilityLayout>
      <AddVisitComponent
        clinicVisit={lastVisit}
        facilityAdmin={userDetails}
        admin={false}
        bioDataId={bioDataId}
      />
    </FacilityLayout>
  )
}

export default AddVisitPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx

  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== 'Facility') {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const userD = axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const lastV = axios
      .get(baseURL + 'clinicvisit/latest?bioDataId=' + params?.add, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const [userDetails, lastVisit] = await Promise.all([userD, lastV])

    return {
      props: {
        user,
        userDetails,
        lastVisit,
        bioDataId: params?.add
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

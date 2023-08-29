import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import axios from 'axios'
import { baseURL } from '@config/axios'
import AddVisitComponent from '@components/Facilities/addvisit'

const AddVisitPage = ({ lastVisit, userDetails, bioDataId, userDetailsBio }: any) => {
  return (
    <AdminLayout>
      <AddVisitComponent
        clinicVisit={lastVisit}
        facilityAdmin={userDetails}
        admin={true}
        bioDataId={bioDataId}
        userDetails={userDetailsBio}
      />
    </AdminLayout>
  )
}

export default AddVisitPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx

  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== 'SuperAdmin') {
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

    const userDBio = axios
      .get(baseURL + 'biodata/byid?id=' + params?.add, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const [userDetails, lastVisit, userDetailsBio] = await Promise.all([userD, lastV, userDBio])

    return {
      props: {
        user,
        userDetails,
        lastVisit,
        bioDataId: params?.add,
        userDetailsBio
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

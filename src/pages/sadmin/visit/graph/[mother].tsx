import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import * as jwt from 'jsonwebtoken'
import axios from 'axios'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import WeightChart from '@components/Facilities/weightchart'

const MotherWeightGraph = ({ mother }: any) => {
  return (
    <AdminLayout>
      <WeightChart visits={mother} />
    </AdminLayout>
  )
}

export default MotherWeightGraph

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx

  const mother = params?.mother

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

    const mthr = axios
      .get(baseURL + 'clinicvisit/bio?bioDataId=' + mother, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const userD = axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const [userDetails, motherV] = await Promise.all([userD, mthr])

    const reversed = motherV.reverse()

    return {
      props: {
        user,
        userDetails,
        mother: reversed
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

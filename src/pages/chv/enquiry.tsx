import { AddEnquiriesComponent } from '@components/Chv/Enquiries/Add'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
// import { Users } from 'src/helpers/enums/users.enum'

const EnquiriesPage = ({}: any) => {
  // const { data: allChvMothers } = useAllChvMothers(userDetails)

  return (
    <CHVLayout>
      <AddEnquiriesComponent />
    </CHVLayout>
  )
}

export default EnquiriesPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== 'CHV') {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    // const userDetails = await axios
    //   .get(baseURL + 'users/user?id=' + user.id, {
    //     headers: {
    //       Authorization: `Bearer ${cookie}`
    //     }
    //   })
    //   .then((res) => {
    //     return res.data
    //   })

    return {
      props: {
        user,
        // userDetails
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

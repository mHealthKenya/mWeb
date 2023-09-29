import AddEnquiriesComponent from '@components/Chv/Enquiries/Add'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'

const EnquiriesPage = ({data}: any) => {

  return (
    <CHVLayout>
      <AddEnquiriesComponent data={data} />
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

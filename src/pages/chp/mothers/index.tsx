import ChvMothersComponent from '@components/Chv/Mothers/all'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
// import { Users } from 'src/helpers/enums/users.enum'

const MotherChv = ({ chvmothers, target, userDetails }: any) => {
  // const { data: allChvMothers } = useAllChvMothers(userDetails)

  return (
    <CHVLayout>
      <ChvMothersComponent data={chvmothers} user={userDetails} chv={chvmothers} target={target} />
    </CHVLayout>
  )
}

export default MotherChv

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

    const userDetails = await axios
      .get(baseURL + 'users/individual', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const chvmothers = await axios
      .get(baseURL + 'users/chvmothers', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const target = await axios
      .get(baseURL + 'targets/chvtarget', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    return {
      props: {
        user,
        userDetails,
        chvmothers,
        target
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

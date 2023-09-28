import ChvMothersComponent from '@components/Chv/Mothers/chv-mothers'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import useAllChvMothers from '@services/chvmother/all'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import { Users } from 'src/helpers/enums/users.enum'

const MotherChv = ({ chvmothers }: any) => {
  const { data: allChvMothers } = useAllChvMothers(chvmothers)

  return (
    <CHVLayout>
      <ChvMothersComponent data={{ chvmothers: allChvMothers }} />
    </CHVLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const id = ctx?.params?.id
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    // const chvmothers = await allChvMothers()

    if (user.role !== Users.CHV) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    // const users = await axios
    //   .get(baseURL + 'users/user?id=' + user.id, {
    //     headers: {
    //       Authorization: `Bearer ${cookie}`
    //     }
    //   })
    //   .then((res) => res.data)

    const chvmothers = await axios
      .get(baseURL + 'users/chvmothers', {
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
        // users,
        chvmothers: chvmothers || null
        // data
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

export default MotherChv

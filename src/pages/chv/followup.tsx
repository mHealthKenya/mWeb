import AllFollowUpComponent from '@components/Followup/all'
import { baseURL } from '@config/axios'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import { FollowUp } from '@models/followup'
import useAllFollowUp, { allFollowUps } from '@services/followup/all'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { useState } from 'react'
import { Users } from 'src/helpers/enums/users.enum'

const ChvFollowUp = ({ User, followups }: any) => {
  const { data: allFollowUps } = useAllFollowUp( followups )

  const [followUpEdit, setFollowWUpEdit] = useState<FollowUp>({} as FollowUp)

  return (
    <CHVLayout>
      <AllFollowUpComponent data={{ followups: allFollowUps }} followUpUpdate={followUpEdit} />
    </CHVLayout>
  )
}

export default ChvFollowUp

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    const followups = await allFollowUps()

    if (user?.role !== Users.CHV) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const users = await axios
      .get(baseURL + 'followup/all', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)
    return {
      props: {
        user,
        users,
        followups: followups || null
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

import AllAppointmentsCompoent from '@components/Chv/Appointments/all'
import { baseURL } from '@config/axios'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import useAllAppointments, { allAppointments } from '@services/appointments/all'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const AppointmentsPage = ({ appointments }: any) => {
  const { data: allAppointments } = useAllAppointments(appointments)

  return (
    <CHVLayout>
      <AllAppointmentsCompoent data={{ appointments: allAppointments }} />
    </CHVLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    const appointments = await allAppointments()

    if (user?.role !== Users.CHV) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const appointmentD = await axios
      .get(baseURL + 'schedules/appointments', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        user,
        appointmentD,
        appointments: appointments || null
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

export default AppointmentsPage

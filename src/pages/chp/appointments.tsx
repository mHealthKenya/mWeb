<<<<<<< HEAD:src/pages/chp/appointments.tsx
import { ViewAppointmentCoomponent } from '@components/Chv/Appointment/all'
import { baseURL } from '@config/axios'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import useAppointments, { allAppointments } from '@services/appointment/all'
=======
import AllAppointmentsCompoent from '@components/Chv/Appointments/all'
import { baseURL } from '@config/axios'
import CHVLayout from '@layout/CHVLayout/CHVLayout'
import useAllAppointments, { allAppointments } from '@services/appointments/all'
>>>>>>> 3d1c2bfacd986175f0e582b3e1534adf0b842c54:src/pages/chv/appointments.tsx
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

<<<<<<< HEAD:src/pages/chp/appointments.tsx
const AppointmentPage = ({ appointments }: any) => {
  const { data: allAppointments } = useAppointments(appointments)

  return (
    <CHVLayout>
      <ViewAppointmentCoomponent data={{ appointments: allAppointments }} />
=======
const AppointmentsPage = ({ appointments }: any) => {
  const { data: allAppointments } = useAllAppointments(appointments)

  return (
    <CHVLayout>
      <AllAppointmentsCompoent data={{ appointments: allAppointments }} />
>>>>>>> 3d1c2bfacd986175f0e582b3e1534adf0b842c54:src/pages/chv/appointments.tsx
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

<<<<<<< HEAD:src/pages/chp/appointments.tsx
    const users = await axios
=======
    const appointmentD = await axios
>>>>>>> 3d1c2bfacd986175f0e582b3e1534adf0b842c54:src/pages/chv/appointments.tsx
      .get(baseURL + 'schedules/appointments', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    return {
      props: {
        user,
<<<<<<< HEAD:src/pages/chp/appointments.tsx
        users,
=======
        appointmentD,
>>>>>>> 3d1c2bfacd986175f0e582b3e1534adf0b842c54:src/pages/chv/appointments.tsx
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

<<<<<<< HEAD:src/pages/chp/appointments.tsx
export default AppointmentPage
=======
export default AppointmentsPage
>>>>>>> 3d1c2bfacd986175f0e582b3e1534adf0b842c54:src/pages/chv/appointments.tsx

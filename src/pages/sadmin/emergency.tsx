import AllEmergencyContacts from '@components/Facilities/EmergencyContacts/all'
import EmergencyContactByAdmin from '@components/Facilities/EmergencyContacts/created-by-admin'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { Contact } from '@models/emergency-contact'
import { Facility } from '@models/facility'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const Base = ({ facilities, contacts }: { facilities: Facility[]; contacts: Contact[] }) => {
  return (
    <AdminLayout>
      <EmergencyContactByAdmin facilities={facilities} />
      <AllEmergencyContacts contacts={contacts} />
    </AdminLayout>
  )
}

export default Base

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    if (user?.role !== Users.SuperAdmin) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const allContacts = axios
      .get(baseURL + 'facilities/coordinates', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const allFacilities = axios
      .get(baseURL + 'facilities/all', {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => res.data)

    const [contacts, facilities] = await Promise.all([allContacts, allFacilities])

    return {
      props: {
        contacts,
        facilities
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

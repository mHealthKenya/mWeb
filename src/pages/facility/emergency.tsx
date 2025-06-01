import EmergencyContactByFacility from '@components/Facilities/EmergencyContacts/created-by-facility'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { Contact } from '@models/emergency-contact'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

const EmergencyContactsPage = ({
  contact,
  facilityId
}: {
  contact: Contact | null
  facilityId: string
}) => {
  return (
    <FacilityLayout>
      <EmergencyContactByFacility facilityId={facilityId} contact={contact} />
    </FacilityLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    if (user?.role !== Users.Facility) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const userDetails = await axios
      .get(baseURL + 'users/user?id=' + user.id, {
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      })
      .then((res) => {
        return res.data
      })

    const { facilityId } = userDetails

    const contact = await axios
      .get(baseURL + `facilities/emergencycontact?facilityId=${facilityId}`)
      .then((res) => res.data)

    return {
      props: {
        contact,
        facilityId
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

export default EmergencyContactsPage

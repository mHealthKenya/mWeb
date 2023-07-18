import AllLocationsComponent from '@components/Facilities/all'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { Stack } from '@mui/material'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'
import useAllFacilities, { allFacilities } from 'src/services/locations/all'

const NewLocation = ({ user, facilities }: any) => {
  const { data: allFacilities } = useAllFacilities(facilities)
  return (
    <FacilityLayout>
      <Stack spacing={1}>
        <AllLocationsComponent
          data={{
            user,
            facilities: allFacilities
          }}
        />
      </Stack>
    </FacilityLayout>
  )
}

export default NewLocation

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    const facilities = await allFacilities()
    if (user?.role !== Users.Facility) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {
        user,
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

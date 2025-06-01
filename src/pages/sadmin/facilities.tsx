import NewLocationComponent from '@components/Facilities/add'
import AllLocationsComponent from '@components/Facilities/all'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { Stack } from '@mui/material'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'
import useAllFacilities, { allFacilities } from 'src/services/locations/all'

const NewLocation = ({ user, facilities }: any) => {
  const { data: allFacilities } = useAllFacilities(facilities)
  return (
    <AdminLayout>
      <Stack spacing={1}>
        <NewLocationComponent />
        <AllLocationsComponent
          data={{
            user,
            facilities: allFacilities
          }}
        />
      </Stack>
    </AdminLayout>
  )
}

export default NewLocation

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)
    const facilities = await allFacilities()
    if (user?.role !== Users.SuperAdmin) {
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

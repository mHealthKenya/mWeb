import NewLocationComponent from '@components/Locations/add'
import AllLocationsComponent from '@components/Locations/all'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { Stack } from '@mui/material'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'
import useAllLocations, { allLocations } from 'src/services/locations/all'

const NewLocation = ({ user, locations }: any) => {
  const { data: allLocations } = useAllLocations(locations)
  return (
    <AdminLayout>
      <Stack spacing={1}>
        <NewLocationComponent />
        <AllLocationsComponent
          data={{
            user,
            locations: allLocations
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
    const locations = await allLocations()
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
        locations
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

import LocationMapComponent from '@components/Facilities/maps'
import NAdminLayout from '@layout/NAdminLayout/NAdminLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import { Users } from 'src/helpers/enums/users.enum'
import useCoordinates from 'src/services/locations/coverage'

const ProjectCoverage = ({ coordinates }: any) => {
  const { data } = useCoordinates(coordinates)
  return (
    <NAdminLayout>
      <LocationMapComponent coordinates={data} />
    </NAdminLayout>
  )
}

export default ProjectCoverage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  const coordinates = await axios
    .get(baseURL + 'facilities/coordinates', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })
    .then((res) => res.data)

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user?.role !== Users.Admin) {
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
        coordinates
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

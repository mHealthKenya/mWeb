import LocationMapComponent from '@components/Locations/maps'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import useCoordinates from 'src/services/locations/coverage'

const ProjectCoverage = ({ coordinates }: any) => {
  const { data } = useCoordinates(coordinates)
  return (
    <AdminLayout>
      <LocationMapComponent coordinates={data} />
    </AdminLayout>
  )
}

export default ProjectCoverage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  const cookie = cookies['access-token']

  const coordinates = await axios
    .get('https://mimbaplus.mhealthkenya.org/locations/coordinates', {
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    })
    .then((res) => res.data)

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

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

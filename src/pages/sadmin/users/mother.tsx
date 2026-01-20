import { DeliveryAnalytics, DeliveryMethodData } from '@components/Users/charts'
import UsersByRoleComponent from '@components/Users/Role'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { BiodataUser } from '@models/biodatauser'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { baseURL } from 'src/config/axios'
import useUsersByRole from 'src/services/users/by-role'

const MotherUsers = ({
  users,
  activeMothers,
  facilities,
  deliveredCount,
  notDeliveredCount,
  deliveryMethodData,
  deliveryStatusData
}: any) => {
  const { data } = useUsersByRole('Mother', users)

  const displayUsers = data ?? users

  return (
    <AdminLayout>
      <DeliveryAnalytics
        mothers={activeMothers}
        deliveredCount={deliveredCount}
        notDeliveredCount={notDeliveredCount}
        deliveryMethodData={deliveryMethodData}
        deliveryStatusData={deliveryStatusData}
      />

      <UsersByRoleComponent
        users={displayUsers}
        facility={true}
        facilities={facilities}
      />
    </AdminLayout>
  )
}

export default MotherUsers

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const cookie = cookies['access-token']

  try {
    const user: any = jwt.verify(
      cookie,
      `${process.env.NEXT_PUBLIC_JWT_SECRET}`
    )

    if (user.role !== 'SuperAdmin') {
      return {
        redirect: { destination: '/login', permanent: false }
      }
    }

    const usersD = axios
      .get(baseURL + 'users/roles?role=Mother', {
        headers: { Authorization: `Bearer ${cookie}` }
      })
      .then((res) => res.data)

    const facilitiesD = axios
      .get(baseURL + 'facilities/all')
      .then((res) => res.data)

    const bioD = axios
      .get(baseURL + 'biodata/all', {
        headers: { Authorization: `Bearer ${cookie}` }
      })
      .then((res) => res.data)

    const [users, facilities, bioData]: [
      any[],
      any[],
      BiodataUser[]
    ] = await Promise.all([usersD, facilitiesD, bioD])

    
    const activeMothers = users.filter(
      (u) => u.active === true
    )

    const activeMotherIds = new Set(
      activeMothers.map((u) => u.id)
    )

    const activeBioData = bioData.filter((item) =>
      activeMotherIds.has(item.userId)
    )

    const deliveredCount = activeBioData.filter(
      (item) => item.delivered === true
    ).length

    const notDeliveredCount = activeBioData.filter(
      (item) => item.delivered === false
    ).length

    const deliveryMethodData: DeliveryMethodData = [
      ['Method', 'Count'],
      ...Object.entries(
        activeBioData.reduce((acc, item) => {
          const method = item?.deliveryMethod || 'Not Specified'
          acc[method] = (acc[method] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      )
    ]

    const deliveryStatusData: DeliveryMethodData = [
      ['Status', 'Count'],
      ...Object.entries(
        activeBioData.reduce((acc, item) => {
          const status = item.delivered
            ? 'Delivered'
            : 'Not Delivered'
          acc[status] = (acc[status] || 0) + 1
          return acc
        }, {} as Record<string, number>)
      )
    ]
    return {
      props: {
        user,
        users,
        activeMothers,
        facilities,
        deliveredCount,
        notDeliveredCount,
        deliveryMethodData,
        deliveryStatusData
      }
    }
  } catch {
    return {
      redirect: { destination: '/login', permanent: false }
    }
  }
}

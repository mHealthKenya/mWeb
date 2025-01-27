import AdmissionsTabs from '@components/Admissions/all'
import { baseURL } from '@config/axios'
import AdminLayout from '@layout/AdminLayout/AdminLayout'
import { Admission } from '@models/admission'
import { DischargeRequest } from '@models/discharge-request'
import { AdmissionStatus } from '@services/admissions/facility-admissions'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'
import { Users } from 'src/helpers/enums/users.enum'

export enum DischargeRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected'
}

const AllAdmissions = ({
  active,
  processing,
  discharged,
  rejected
}: {
  active: Admission[]
  processing: DischargeRequest[]
  discharged: Admission[]
  rejected: Admission[]
}) => {
  return (
    <AdminLayout>
      <div className="py-6 px-4">
        <AdmissionsTabs
          active={active}
          processing={processing}
          discharged={discharged}
          rejected={rejected}
        />
      </div>
    </AdminLayout>
  )
}

export default AllAdmissions

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== Users.SuperAdmin) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const status = [AdmissionStatus.Admitted, AdmissionStatus.Discharged, AdmissionStatus.Rejected]

    const dischargeStatus = [DischargeRequestStatus.Pending]

    const [processing] = await Promise.all(
      dischargeStatus.map((status) =>
        axios
          .get(baseURL + 'discharge/requests?status=' + status, {
            headers: {
              Authorization: `Bearer ${cookie}`
            }
          })
          .then((res) => res.data)
      )
    )

    const [active, discharged, rejected] = await Promise.all(
      status.map((status) =>
        axios
          .get(baseURL + 'admissions?status=' + status, {
            headers: {
              Authorization: `Bearer ${cookie}`
            }
          })
          .then((res) => res.data)
      )
    )

    return {
      props: {
        active,
        processing,
        discharged,
        rejected
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

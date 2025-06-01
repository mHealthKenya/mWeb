import AdmissionsTabs from '@components/Facilities/Admissions'
import { baseURL } from '@config/axios'
import FacilityLayout from '@layout/FacilityLayout/FacilityLayout'
import { Admission } from '@models/admission'
import { AdmissionStatus } from '@services/admissions/facility-admissions'
import axios from 'axios'
import * as jwt from 'jsonwebtoken'
import { GetServerSideProps } from 'next'
import nookies from 'nookies'

const AllAdmissions = ({
  active,
  processing,
  discharged,
  rejected
}: {
  active: Admission[]
  processing: Admission[]
  discharged: Admission[]
  rejected: Admission[]
}) => {
  return (
    <FacilityLayout>
      <div className="py-6 px-4">
        <AdmissionsTabs
          active={active}
          processing={processing}
          discharged={discharged}
          rejected={rejected}
        />
      </div>
    </FacilityLayout>
  )
}

export default AllAdmissions

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)
  const cookie = cookies['access-token']

  try {
    const user: any = await jwt.verify(cookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`)

    if (user.role !== 'Facility') {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    const status = [
      AdmissionStatus.Admitted,
      AdmissionStatus.Processing,
      AdmissionStatus.Discharged,
      AdmissionStatus.Rejected
    ]

    const [active, processing, discharged, rejected] = await Promise.all(
      status.map((status) =>
        axios
          .get(baseURL + 'admissions/facility?status=' + status, {
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

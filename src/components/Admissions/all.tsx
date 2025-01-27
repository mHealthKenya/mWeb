import AdmissionsMonitorComponent from '@components/Facilities/Admissions/admissions-monitor'
import { Admission } from '@models/admission'
import { DischargeRequest } from '@models/discharge-request'
import { TabsContent } from '@radix-ui/react-tabs'
import useAdmissions from '@services/admissions/all'
import { AdmissionStatus } from '@services/admissions/facility-admissions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@ui/ui/tabs'
import { FC } from 'react'
import DischargeRequestsComponent from './discharge-requests'

interface Props {
  active: Admission[]
  processing: DischargeRequest[]
  discharged: Admission[]
  rejected: Admission[]
}

const AdmissionsTabs: FC<Props> = ({ active, processing, discharged, rejected }) => {
  const { data: activeAdmissions } = useAdmissions({
    admissions: active,
    status: AdmissionStatus.Admitted
  })

  const { data: dischargedAdmissions } = useAdmissions({
    admissions: discharged,
    status: AdmissionStatus.Discharged
  })

  const { data: rejectedAdmissions } = useAdmissions({
    admissions: rejected,
    status: AdmissionStatus.Rejected
  })

  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-4 ">
        <TabsTrigger value="active">Active </TabsTrigger>
        <TabsTrigger value="processing">Processing</TabsTrigger>
        <TabsTrigger value="discharged">Discharged</TabsTrigger>
        <TabsTrigger value="rejected">Rejected</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <Card className="py-4 mt-2">
          <CardHeader>
            <CardTitle>Active Admissions</CardTitle>
            <CardDescription>
              Real-time, list of all patients currently admitted across facilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AdmissionsMonitorComponent admissions={activeAdmissions} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="processing">
        <Card className="py-4 mt-2">
          <CardHeader>
            <CardTitle>Under Review</CardTitle>
            <CardDescription>
              A list of all discharge requests that are currently under review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DischargeRequestsComponent requests={processing} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="discharged">
        <Card className="py-4 mt-2">
          <CardHeader>
            <CardTitle>Discharged</CardTitle>
            <CardDescription>
              A list of all patients that have been discharged across all facilities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AdmissionsMonitorComponent admissions={dischargedAdmissions} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="rejected">
        <Card className="py-4 mt-2">
          <CardHeader>
            <CardTitle>Rejected Discharges</CardTitle>
            <CardDescription>
              A list of all discharge requests that have been rejected.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AdmissionsMonitorComponent admissions={rejectedAdmissions} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default AdmissionsTabs

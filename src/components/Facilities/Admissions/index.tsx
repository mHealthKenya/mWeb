import { Admission } from '@models/admission'
import { TabsContent } from '@radix-ui/react-tabs'
import useFacilityAdmissions, { AdmissionStatus } from '@services/admissions/facility-admissions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@ui/ui/tabs'
import { FC } from 'react'
import AdmissionsComponent from './admissions'
import AdmissionsMonitorComponent from './admissions-monitor'

interface Props {
  active: Admission[]
  processing: Admission[]
  discharged: Admission[]
  rejected: Admission[]
}

const AdmissionsTabs: FC<Props> = ({ active, processing, discharged, rejected }) => {
  const { data: activeAdmissions } = useFacilityAdmissions({
    admissions: active,
    status: AdmissionStatus.Admitted
  })

  const { data: processingAdmissions } = useFacilityAdmissions({
    admissions: processing,
    status: AdmissionStatus.Processing
  })

  const { data: dischargedAdmissions } = useFacilityAdmissions({
    admissions: discharged,
    status: AdmissionStatus.Discharged
  })

  const { data: rejectedAdmissions } = useFacilityAdmissions({
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
              Real-time, list of all patients currently admitted in your facility.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <AdmissionsComponent admissions={activeAdmissions} facility />
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
            <AdmissionsMonitorComponent admissions={processingAdmissions} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="discharged">
        <Card className="py-4 mt-2">
          <CardHeader>
            <CardTitle>Discharged</CardTitle>
            <CardDescription>
              A list of all patients that have been discharged from your facility.
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

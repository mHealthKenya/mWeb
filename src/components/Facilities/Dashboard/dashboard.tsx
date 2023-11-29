/* eslint-disable react/no-unescaped-entities */
import {
  FacilityMonthlyMothers,
  FacilityMonthlyVisits,
  SchedulesDist,
  TotalFacilityCHVS,
  TotalFacilityMothers,
  TotalFacilityVisits
} from '@models/facilitydash/all'
import { Box } from '@mui/material'
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js'
import { FC } from 'react'
import { Card } from 'react-bootstrap'
import FacilitySchedulesDistribution from './schedulesist'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const FDashboard: FC<{
  totalchvs: TotalFacilityCHVS
  totalmothers: TotalFacilityMothers
  totalvisits: TotalFacilityVisits
  mothlyvisits: FacilityMonthlyVisits
  mothersmonthly: FacilityMonthlyMothers
  dist: SchedulesDist
}> = ({ totalchvs, totalmothers, totalvisits, mothlyvisits, mothersmonthly, dist }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const currentDate = new Date()
  const currentMonth = months[currentDate.getMonth()]

  return (
    <>
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">{totalchvs.chvsInFacility}</div>
                  <div>Total CHVs</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-6 col-lg-4">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{totalmothers.mothersInFacility}</div>
                <div>Total Mothers</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-4">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{totalvisits.totalVisits}</div>
                <div>Total Clinic Visits</div>
              </Box>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-6 col-lg-6">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{mothlyvisits.monthlyVisits}</div>
                <div>Visits in the month of {currentMonth}</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-6">
          <Card bg="secondary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">
                    {mothersmonthly.mothersRegisteredThisMonth}
                  </div>
                  <div>Mothers Registered in {currentMonth}</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>

        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <h4 className="mb-1">Schedules Distribution</h4>
                <div className="small text-black-50 mb-3">All time schedules distribution</div>
              </div>
            </div>
            <div style={{ width: '100%', height: '500px' }}>
              <FacilitySchedulesDistribution data={dist} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default FDashboard

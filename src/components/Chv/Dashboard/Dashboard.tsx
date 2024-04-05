/* eslint-disable react/no-unescaped-entities */

import { Followupstats } from '@models/chvfollowupstats'
import { Motherstats, TotalMotherstats } from '@models/chvmothers'
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
import FollowupDistributionChart from './FollowupDistribution'
import { Enquirystats } from '@models/enquiry'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const CHVHome: FC<{
  mother_stats: Motherstats
  total_mother_stats: TotalMotherstats
  followup_stats: Followupstats
  enquiry_stats: Enquirystats
  // monthly_enquiry_stats: MonthlyEnquirystats
}> = ({ mother_stats, total_mother_stats, followup_stats, enquiry_stats }) => {
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
        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">{mother_stats.totalMothersRegistered}</div>
                  <div>{currentMonth} Mother Registrations</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{total_mother_stats.totalMothersRegistered}</div>
                <div>Total Registrations</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{enquiry_stats.totalEnquiries}</div>
                <div>Total Enquiries</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        {/* <div className="col-sm-6 col-lg-3">
          <Card bg="success" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{monthly_enquiry_stats.enquiriesThisMonth}</div>
                <div>Monthly Enquiries</div>
              </Box>
            </Card.Body>
          </Card>
        </div> */}
      </div>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">Follow up Distribution</h4>
              <div className="small text-black-50">All time Follow-ups distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <FollowupDistributionChart data={followup_stats} />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default CHVHome

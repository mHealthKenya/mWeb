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

  //   const currencyCode = 'KSH'
  //   const locale = 'en-KE'

  //   const currencyFormatter = new Intl.NumberFormat(locale, {
  //     style: 'currency',
  //     currency: currencyCode
  //   })

  //   let extended_list_of_strings: string[] = []

  // const list_of_strings: string[] = ['success', 'info', 'warning', 'danger', 'primary']

  //   if (visits_distribution.length > list_of_strings.length) {
  //     const repeat_times: number = Math.floor(visits_distribution.length / list_of_strings.length)

  //     for (let i = 0; i < repeat_times; i++) {
  //       extended_list_of_strings = extended_list_of_strings.concat(list_of_strings)
  //     }

  //     const remaining_numbers: number = visits_distribution.length % list_of_strings.length
  //     if (remaining_numbers > 0) {
  //       extended_list_of_strings = extended_list_of_strings.concat(
  //         list_of_strings.slice(0, remaining_numbers)
  //       )
  //     }
  //   } else {
  //     extended_list_of_strings = list_of_strings.slice(0, visits_distribution.length)
  //   }

  return (
    <>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
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
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{currencyFormatter.format(total_sms_cost)}</div>
                <div>Total SMS Cost</div>
              </Box>
            </Card.Body>
          </Card>
        </div> */}

        {/* <div className="col-sm-6 col-lg-3">
          <Card bg="secondary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">{total_sms_count.count.toLocaleString()}</div>
                  <div>Total SMS Count</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div> */}

        {/* <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{monthly_sms_count.count.toLocaleString()}</div>
                <div>{currentMonth} SMS Count</div>
              </Box>
            </Card.Body>
          </Card>
        </div> */}

        {/* <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{currencyFormatter.format(monthly_sms_cost)}</div>
                <div>{currentMonth} SMS Cost</div>
              </Box>
            </Card.Body>
          </Card>
        </div> */}
        {/* 
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">
                  {monthly_clinic_visits.count.toLocaleString()}
                </div>
                <div>{currentMonth} Clinic Visits</div>
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

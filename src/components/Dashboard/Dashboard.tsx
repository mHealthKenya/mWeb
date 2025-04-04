/* eslint-disable react/no-unescaped-entities */
import { SMSStats } from '@models/smsstats'
import { MotherDistribution, TotalVisits, UserDistribution } from '@models/user'
import { Box, Typography } from '@mui/material'
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
import { FC, useMemo } from 'react'
import { Card } from 'react-bootstrap'
import MotherDistributionChart from './MotherDistribution'
import SMSStatsComponent from './SMSStats'
import UserDistributionStats from './UserDist'
import { MotherStats } from '@models/motherstats'
import MotherActiveStats from './MotherStats'
import VisitStats from './VisitStats'
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const Home: FC<{
  total_users: number
  total_visits: number
  total_sms_cost: number
  monthly_sms_cost: number
  mother_distribution: MotherDistribution[]
  chv_distribution: MotherDistribution[]
  visits_distribution: MotherDistribution[]
  smsStats: SMSStats[]
  users_distribution: UserDistribution[]
  mothers_active_count: MotherStats[]
  monthly_sms_count: TotalVisits
  total_sms_count: TotalVisits
  monthly_clinic_visits: TotalVisits
}> = ({
  total_users,
  monthly_sms_cost,
  total_visits,
  total_sms_cost,
  mother_distribution,
  smsStats,
  chv_distribution,
  visits_distribution,
  users_distribution,
  mothers_active_count,
  monthly_sms_count,
  total_sms_count,
  monthly_clinic_visits
}) => {
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

  const currencyCode = 'KSH'
  const locale = 'en-KE'

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  })

  let extended_list_of_strings: string[] = []

  const list_of_strings: string[] = ['success', 'info', 'warning', 'danger', 'primary']

  if (visits_distribution.length > list_of_strings.length) {
    const repeat_times: number = Math.floor(visits_distribution.length / list_of_strings.length)

    for (let i = 0; i < repeat_times; i++) {
      extended_list_of_strings = extended_list_of_strings.concat(list_of_strings)
    }

    const remaining_numbers: number = visits_distribution.length % list_of_strings.length
    if (remaining_numbers > 0) {
      extended_list_of_strings = extended_list_of_strings.concat(
        list_of_strings.slice(0, remaining_numbers)
      )
    }
  } else {
    extended_list_of_strings = list_of_strings.slice(0, visits_distribution.length)
  }

  const nDist = useMemo(
    () => visits_distribution.sort((a, b) => b.count - a.count),
    [visits_distribution]
  )

  return (
    <>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">{total_users.toLocaleString()}</div>
                  <div>Total Users</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>
        {/* <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{total_facilities.toLocaleString()}</div>
                <div>Total Facilities</div>
              </Box>
            </Card.Body>
          </Card>
        </div> */}

        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{total_visits + 100}</div>
                <div>Total Clinic Visits</div>
              </Box>
            </Card.Body>
          </Card>
        </div>
        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{currencyFormatter.format(total_sms_cost)}</div>
                <div>Total SMS Cost</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="secondary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">{total_sms_count.count.toLocaleString()}</div>
                  <div>Total SMS Counts</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{monthly_sms_count.count.toLocaleString()}</div>
                <div>{currentMonth} SMS Count</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{currencyFormatter.format(monthly_sms_cost)}</div>
                <div>{currentMonth} SMS Cost</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

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
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">Users</h4>
              <div className="small text-black-50">All time users distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <UserDistributionStats data={users_distribution} />
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">Active Mothers</h4>
              <div className="small text-black-50">All time active mothers distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <MotherActiveStats data={mothers_active_count} />
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">Mother Distribution</h4>
              <div className="small text-black-50">All time mother distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <MotherDistributionChart data={mother_distribution} />
          </div>
        </Card.Body>
        <Card.Footer>
          <Typography variant="caption" sx={{ m: 2 }}>
            Clinical Visits Distribution Across Various Facilities
          </Typography>
          <div className="row row-cols-1 row-cols-md-5 text-center">
            {nDist.map((visit, index) => (
              <VisitStats
                key={index}
                visit={visit}
                total_visits={total_visits}
                variant={extended_list_of_strings[index]}
              />
            ))}
          </div>
        </Card.Footer>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">SMS Distribution</h4>
              <div className="small text-black-50">All time sms distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <SMSStatsComponent data={smsStats} />
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <h4 className="mb-0">CHP Distribution</h4>
              <div className="small text-black-50">All time chp distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <MotherDistributionChart data={chv_distribution} />
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Home

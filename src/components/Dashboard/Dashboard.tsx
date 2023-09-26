import {
  faCcAmex,
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
  faFacebookF,
  faLinkedinIn,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'
import {
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MotherDistribution } from '@models/user'
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
import Image from 'next/image'
import React, { FC } from 'react'
import { Card, Dropdown, ProgressBar } from 'react-bootstrap'
import MotherDistributionChart from './MotherDistribution'
import SMSStatsComponent from './SMSStats'
import { SMSStats } from '@models/smsstats'

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Filler)

const Home: FC<{
  total_users: number
  total_facilities: number
  total_visits: number
  total_sms_cost: number
  mother_distribution: MotherDistribution[]
  chv_distribution: MotherDistribution[]
  smsStats: SMSStats[]
}> = ({
  total_users,
  total_facilities,
  total_visits,
  total_sms_cost,
  mother_distribution,
  smsStats,
  chv_distribution
}) => {
  const currencyCode = 'KSH'
  const locale = 'en-KE'

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  })

  return (
    <>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <Box sx={{ m: 2 }}>
                  <div className="fs-4 fw-semibold">{total_users.toLocaleString()}</div>
                  <div>Users</div>
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{total_facilities.toLocaleString()}</div>
                <div>Facilities</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{total_visits.toLocaleString()}</div>
                <div>Clinic Visits</div>
              </Box>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <Box sx={{ m: 2 }}>
                <div className="fs-4 fw-semibold">{currencyFormatter.format(total_sms_cost)}</div>
                <div>SMS Cost</div>
              </Box>
            </Card.Body>
          </Card>
        </div>
      </div>

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
          <div className="row row-cols-1 row-cols-md-5 text-center">
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Visits</div>
              <div className="fw-semibold">29.703 Users (40%)</div>
              <ProgressBar className="progress-thin mt-2" variant="success" now={40} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Unique</div>
              <div className="fw-semibold">24.093 Users (20%)</div>
              <ProgressBar className="progress-thin mt-2" variant="info" now={20} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Page views</div>
              <div className="fw-semibold">78.706 Views (60%)</div>
              <ProgressBar className="progress-thin mt-2" variant="warning" now={60} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">New Users</div>
              <div className="fw-semibold">22.123 Users (80%)</div>
              <ProgressBar className="progress-thin mt-2" variant="danger" now={80} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Bounce Rate</div>
              <div className="fw-semibold">40.15%</div>
              <ProgressBar className="progress-thin mt-2" variant="primary" now={40} />
            </div>
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
              <h4 className="mb-0">CHV Distribution</h4>
              <div className="small text-black-50">All time chv distribution</div>
            </div>
          </div>
          <div style={{ width: '100%', height: '500px' }}>
            <MotherDistributionChart data={chv_distribution} />
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="row row-cols-1 row-cols-md-5 text-center">
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Visits</div>
              <div className="fw-semibold">29.703 Users (40%)</div>
              <ProgressBar className="progress-thin mt-2" variant="success" now={40} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Unique</div>
              <div className="fw-semibold">24.093 Users (20%)</div>
              <ProgressBar className="progress-thin mt-2" variant="info" now={20} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Page views</div>
              <div className="fw-semibold">78.706 Views (60%)</div>
              <ProgressBar className="progress-thin mt-2" variant="warning" now={60} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">New Users</div>
              <div className="fw-semibold">22.123 Users (80%)</div>
              <ProgressBar className="progress-thin mt-2" variant="danger" now={80} />
            </div>
            <div className="col mb-sm-2 mb-0">
              <div className="text-black-50">Bounce Rate</div>
              <div className="fw-semibold">40.15%</div>
              <ProgressBar className="progress-thin mt-2" variant="primary" now={40} />
            </div>
          </div>
        </Card.Footer>
      </Card>

      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <Card className="mb-4" style={{ '--bs-card-cap-bg': '#3b5998' } as React.CSSProperties}>
            <Card.Header className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faFacebookF}
                fixedWidth
                size="3x"
                className="my-4 text-white"
              />
            </Card.Header>
            <Card.Body>
              <div className="row text-center">
                <div className="col">
                  <div className="fs-5 fw-semibold">89k</div>
                  <div className="text-uppercase text-black-50 small">friends</div>
                </div>
                <div className="vr p-0" />
                <div className="col">
                  <div className="fs-5 fw-semibold">459</div>
                  <div className="text-uppercase text-black-50 small">feeds</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-4">
          <Card className="mb-4" style={{ '--bs-card-cap-bg': '#00aced' } as React.CSSProperties}>
            <Card.Header className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon icon={faTwitter} fixedWidth size="3x" className="my-4 text-white" />
            </Card.Header>
            <Card.Body>
              <div className="row text-center">
                <div className="col">
                  <div className="fs-5 fw-semibold">973k</div>
                  <div className="text-uppercase text-black-50 small">followers</div>
                </div>
                <div className="vr p-0" />
                <div className="col">
                  <div className="fs-5 fw-semibold">1.792</div>
                  <div className="text-uppercase text-black-50 small">tweets</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-4">
          <Card className="mb-4" style={{ '--bs-card-cap-bg': '#4875b4' } as React.CSSProperties}>
            <Card.Header className="d-flex justify-content-center align-items-center">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                fixedWidth
                size="3x"
                className="my-4 text-white"
              />
            </Card.Header>
            <Card.Body>
              <div className="row text-center">
                <div className="col">
                  <div className="fs-5 fw-semibold">500+</div>
                  <div className="text-uppercase text-black-50 small">contacts</div>
                </div>
                <div className="vr p-0" />
                <div className="col">
                  <div className="fs-5 fw-semibold">292</div>
                  <div className="text-uppercase text-black-50 small">feeds</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <Card>
            <Card.Header>Traffic &amp; Sales</Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-sm-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="border-start border-4 border-info px-3 mb-3">
                        <small className="text-black-50">New Clients</small>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="border-start border-4 border-danger px-3 mb-3">
                        <small className="text-black-50">Recurring Clients</small>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-0" />

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Monday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={34} />
                      <ProgressBar className="progress-thin" variant="danger" now={78} />
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Tuesday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={56} />
                      <ProgressBar className="progress-thin" variant="danger" now={94} />
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Wednesday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={12} />
                      <ProgressBar className="progress-thin" variant="danger" now={67} />
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Thursday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={43} />
                      <ProgressBar className="progress-thin" variant="danger" now={91} />
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Friday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={22} />
                      <ProgressBar className="progress-thin" variant="danger" now={73} />
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Saturday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={53} />
                      <ProgressBar className="progress-thin" variant="danger" now={82} />
                    </div>
                  </div>

                  <div className="row mb-4 align-items-center">
                    <div className="col-3">
                      <span className="text-black-50 small">Sunday</span>
                    </div>
                    <div className="col">
                      <ProgressBar className="progress-thin mb-1" variant="primary" now={9} />
                      <ProgressBar className="progress-thin" variant="danger" now={69} />
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="row">
                    <div className="col-6">
                      <div className="border-start border-4 border-warning px-3 mb-3">
                        <small className="text-black-50">Pageviews</small>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="border-start border-4 border-success px-3 mb-3">
                        <small className="text-black-50">Organic</small>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-0" />

                  <div className="mb-5">
                    <div className="mb-3">
                      <div className="d-flex mb-1">
                        <div>
                          <FontAwesomeIcon className="me-2" icon={faMars} fixedWidth />
                          Male
                        </div>
                        <div className="ms-auto fw-semibold">43%</div>
                      </div>
                      <ProgressBar className="progress-thin" variant="warning" now={43} />
                    </div>

                    <div className="mb-3">
                      <div className="d-flex mb-1">
                        <div>
                          <FontAwesomeIcon className="me-2" icon={faVenus} fixedWidth />
                          Female
                        </div>
                        <div className="ms-auto fw-semibold">37%</div>
                      </div>
                      <ProgressBar className="progress-thin" variant="warning" now={37} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex mb-1">
                      <div>
                        <FontAwesomeIcon className="me-2" icon={faSearch} fixedWidth />
                        Organic Search
                      </div>
                      <div className="ms-auto fw-semibold me-2">191.235</div>
                      <div className="text-black-50 small">(56%)</div>
                    </div>
                    <ProgressBar className="progress-thin" variant="success" now={56} />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex mb-1">
                      <div>
                        <FontAwesomeIcon className="me-2" icon={faFacebookF} fixedWidth />
                        Facebook
                      </div>
                      <div className="ms-auto fw-semibold me-2">51.223</div>
                      <div className="text-black-50 small">(15%)</div>
                    </div>
                    <ProgressBar className="progress-thin" variant="success" now={15} />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex mb-1">
                      <div>
                        <FontAwesomeIcon className="me-2" icon={faTwitter} fixedWidth />
                        Twitter
                      </div>
                      <div className="ms-auto fw-semibold me-2">37.564</div>
                      <div className="text-black-50 small">(11%)</div>
                    </div>
                    <ProgressBar className="progress-thin" variant="success" now={11} />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex mb-1">
                      <div>
                        <FontAwesomeIcon className="me-2" icon={faLinkedinIn} fixedWidth />
                        LinkedIn
                      </div>
                      <div className="ms-auto fw-semibold me-2">27.319</div>
                      <div className="text-black-50 small">(8%)</div>
                    </div>
                    <ProgressBar className="progress-thin" variant="success" now={8} />
                  </div>
                </div>
              </div>

              <br />

              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th className="text-center">
                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                      </th>
                      <th>User</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            className="rounded-circle"
                            src="/assets/img/avatars/1.jpg"
                            alt="user@email.com"
                          />
                          <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white" />
                        </div>
                      </td>
                      <td>
                        <div>Yiorgos Avraamu</div>
                        <div className="small text-black-50">
                          <span>New</span> | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">50%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="success" now={50} />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">10 sec ago</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user1">
                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger" href="#/action-3">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            className="rounded-circle"
                            src="/assets/img/avatars/2.jpg"
                            alt="user@email.com"
                          />
                          <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-danger rounded-circle border border-white" />
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-black-50">
                          <span>Recurring</span> | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">10%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="info" now={10} />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCcVisa} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">5 minutes ago</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user2">
                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger" href="#/action-3">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            className="rounded-circle"
                            src="/assets/img/avatars/3.jpg"
                            alt="user@email.com"
                          />
                          <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-warning rounded-circle border border-white" />
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-black-50">
                          <span>New</span> | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">74%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="warning" now={74} />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCcStripe} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">1 hour ago</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user3">
                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger" href="#/action-3">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            className="rounded-circle"
                            src="/assets/img/avatars/4.jpg"
                            alt="user@email.com"
                          />
                          <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-secondary rounded-circle border border-white" />
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-black-50">
                          <span>New</span> | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">98%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="danger" now={98} />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCcPaypal} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">Last month</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user4">
                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger" href="#/action-3">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            className="rounded-circle"
                            src="/assets/img/avatars/5.jpg"
                            alt="user@email.com"
                          />
                          <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white" />
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-black-50">
                          <span>New</span> | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">22%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="info" now={22} />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCcApplePay} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">Last week</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user5">
                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger" href="#/action-3">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            className="rounded-circle"
                            src="/assets/img/avatars/6.jpg"
                            alt="user@email.com"
                          />
                          <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-danger rounded-circle border border-white" />
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-black-50">
                          <span>New</span> | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">43%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">Jun 11, 2020 - Jul 10, 2020</small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="success" now={43} />
                      </td>
                      <td className="text-center">
                        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">Yesterday</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user6">
                            <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                            <Dropdown.Item className="text-danger" href="#/action-3">
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home

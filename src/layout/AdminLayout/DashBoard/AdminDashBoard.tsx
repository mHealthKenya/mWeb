import BarChart from '@components/Graphs/Barchart'
// import DoughnutChart from '@components/Graphs/DoughnutChart'
// import PieChart from '@components/Graphs/Piechart'
import RecentActivities from '@components/RecentUpadate/RecentActivities'
import TopCard from '@components/StatsCard/TopCard'
// import { Container } from '@mui/material'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AdminDashBoard() {
  return (
    <div className="min-h-screen bg-slate-100">
    {/* <Header /> */}
    <TopCard />
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <Container fluid>
        <Row>
          <Col sm={12} md={8} lg={8}>
            <Row>
              <BarChart />
            </Row>
            <Row>
              <Col>
                {/* <PieChart/> */}
              </Col>
              <Col>
                {/* <DoughnutChart/> */}
              </Col>
            </Row>
            
          </Col>
          <Col sm={12} md={4} lg={4}>
            <RecentActivities />
          </Col>
        </Row>
      </Container>
      
      
    </div>
  </div>
  )
}

export default AdminDashBoard

import BarChart from '@components/Graphs/Barchart'
import RecentActivities from '@components/RecentUpadate/RecentActivities'
import TopCard from '@components/StatsCard/TopCard'
import React from 'react'

function FacilityDashBoard() {
  return (
    <div className="min-h-screen bg-slate-100">
    {/* <Header /> */}
    <TopCard />
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      <BarChart />
      <RecentActivities />
    </div>
  </div>
  )
}

export default FacilityDashBoard

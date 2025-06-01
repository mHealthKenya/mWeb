import { MotherDistribution } from '@models/user'
import { FC } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { createAcronym } from './MotherDistribution'
import { Tooltip } from '@mui/material'

const VisitStats: FC<{ visit: MotherDistribution; total_visits: number; variant: string }> = ({
  visit,
  total_visits,
  variant
}) => {
  return (
    <div>
      <div className="col mb-sm-2 mb-0">
        <div className="text-black-50">{createAcronym(visit.facilityName)}</div>
        <div className="fw-semibold">{`${((visit.count / total_visits) * 100).toFixed(2)} %`}</div>
        <Tooltip title={visit.facilityName}>
          <ProgressBar
            className="progress-thin mt-2"
            variant={variant}
            // now={Math.floor((visit.count / total_visits) * 100)}
            now={Math.floor((visit.count / total_visits) * 100)}
          />
        </Tooltip>
      </div>{' '}
    </div>
  )
}

export default VisitStats

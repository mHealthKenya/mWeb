import AddScheduleComponent from '@components/Schedules/Add'
import SchedulesListComponent from '@components/Schedules/List'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import AddBiodata, { MotherDetailsProps } from './Add'
import useFindSchedulesByMotherId from '@services/schedules/find-by-mother-id'
import AddBirthPlanComponent from '@components/BirthPlan/Add'
import { Facility } from '@models/facility'
import { BirthPlan } from '@models/birthplan'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const BioDataTabs: React.FC<{
  data: MotherDetailsProps
  facilities: Facility[]
  birthPlan?: BirthPlan
}> = ({ data, facilities, birthPlan }) => {
  const { chvs } = data

  const [value, setValue] = React.useState(0)

  const { data: freshSchedules } = useFindSchedulesByMotherId(data?.schedules, data?.user?.id)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Bio Data" {...a11yProps(0)} />
          <Tab label="Schedules" {...a11yProps(1)} />
          <Tab label="Birth Plan" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddBiodata data={data} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box sx={{ m: 1 }}>
          <AddScheduleComponent data={data} />
        </Box>
        <Box sx={{ m: 1 }}>
          <Box sx={{ mt: 4 }}>
            <SchedulesListComponent schedules={freshSchedules} chvs={chvs} />
          </Box>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AddBirthPlanComponent
          facilities={facilities}
          user={data?.user}
          birthPlan={birthPlan}
          facilityId={data?.facilityId || ''}
        />
      </CustomTabPanel>
    </Box>
  )
}

export default BioDataTabs

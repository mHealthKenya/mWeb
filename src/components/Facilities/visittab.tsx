import { FacilityBioData } from '@models/biodata'
import { ClinicalVisit } from '@models/clinicvisits'
import { Alert } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import BioDataByFacility from './facility-biodata'
import ClinicalVisitsComponent, { VisitMessage } from './visits'

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

const VisitTabs: React.FC<{
  visits: ClinicalVisit[]
  bioData: FacilityBioData[]
  admin: boolean
}> = ({ visits, bioData, admin }) => {
  const [value, setValue] = React.useState(0)
  const [open, setOpen] = React.useState(true)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleClose = () => {
    setOpen((open) => !open)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Visit" {...a11yProps(0)} />
          <Tab label="View Visits" {...a11yProps(1)} />
          <Tab label="View Graphs" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {open && (
          <Alert severity="info" sx={{ mt: 1, mb: 1 }} onClose={handleClose}>
            Clinic visits can only be recorded for patients with an existing bio data profile
          </Alert>
        )}
        <BioDataByFacility bioData={bioData} admin={admin} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClinicalVisitsComponent visits={visits} admin={admin} message={VisitMessage.View} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ClinicalVisitsComponent visits={visits} admin={admin} message={VisitMessage.Redirect} />
      </CustomTabPanel>
    </Box>
  )
}

export default VisitTabs

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import RecordsComponent from './records'
import ManageWalletComponent from './all'
import { UserByRole } from '@models/user-by-role'

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

const WalletTabs: React.FC<{
  admin: boolean
  isFacility?: boolean
  facility?: boolean
  users: UserByRole
  // bioData: FacilityBioData[]
  // visits: ClinicalVisit[]
  data: any
}> = ({ admin }) => {
  const [value, setValue] = React.useState(0)
  const [_open, setOpen] = React.useState(true)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleToggleClose = () => {
    setOpen((open) => !open)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Record" {...a11yProps(0)} />
          <Tab label="View Transactions" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        {open && (
          <Alert severity="info" sx={{ mt: 1, mb: 1 }} onClose={handleClose}>
            Clinic visits can only be recorded for patients with an existing bio data profile
          </Alert>
        )}
      </CustomTabPanel> */}

      <CustomTabPanel value={value} index={0}>
        <ManageWalletComponent sadmin={admin} isFacility={true} facility={true} users={[]} />{' '}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RecordsComponent data={undefined} handleClose={handleToggleClose} />
      </CustomTabPanel>
    </Box>
  )
}

export default WalletTabs

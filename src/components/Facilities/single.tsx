import { AuthenticatedUser } from '@models/authenticateduser'
import { Facility } from '@models/facility'
import { ListItem, ListItemButton, ListItemText, Tooltip } from '@mui/material'
import { FC, useState } from 'react'
import EditOrDeleteLocationComponent from './modal'

export interface LocationData {
  facility: Facility
  user?: AuthenticatedUser
}

const SingleLocationComponent: FC<{ locationData: LocationData }> = ({ locationData }) => {
  const user = locationData?.user
  const location = locationData.facility
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    if (user?.role === 'SuperAdmin' || user?.role === 'Admin') {
      setOpen(true)
      return
    }

    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((open) => !open)
  }

  return (
    <>
      <ListItem>
        <ListItemButton onClick={handleClick}>
          <Tooltip title="Click to Edit Or Delete">
            <ListItemText id={location.id} primary={location.name} />
          </Tooltip>
        </ListItemButton>{' '}
      </ListItem>
      <EditOrDeleteLocationComponent
        locationData={locationData}
        open={open}
        handleToggle={handleToggle}
      />
    </>
  )
}

export default SingleLocationComponent

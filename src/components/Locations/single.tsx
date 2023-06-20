import { AuthenticatedUser } from '@models/authenticateduser'
import { Location } from '@models/location'
import { ListItem, ListItemButton, ListItemText, Tooltip } from '@mui/material'
import { FC, useState } from 'react'
import EditOrDeleteLocationComponent from './modal'

export interface LocationData {
  location: Location
  user?: AuthenticatedUser
}

const SingleLocationComponent: FC<{ locationData: LocationData }> = ({ locationData }) => {
  const user = locationData?.user
  const location = locationData.location
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
            <ListItemText id={location.id} primary={location.location_name} />
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

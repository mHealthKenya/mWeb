import { AuthenticatedUser } from '@models/authenticateduser'
import { Location } from '@models/location'
import { List, ListSubheader } from '@mui/material'
import { FC } from 'react'
import SingleLocationComponent from './single'

export interface LocationsData {
  locations: Location[]
  user: AuthenticatedUser
}

const AllLocationsComponent: FC<{ data: LocationsData }> = ({ data }) => {
  const { user, locations } = data
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>All Locations</ListSubheader>}>
      {locations.map((location) => (
        <SingleLocationComponent
          key={location.id}
          locationData={{
            location,
            user
          }}
        />
      ))}
    </List>
  )
}

export default AllLocationsComponent

import { AuthenticatedUser } from '@models/authenticateduser'
import { Facility } from '@models/facility'
import { List, ListSubheader } from '@mui/material'
import { FC } from 'react'
import SingleLocationComponent from './single'

export interface FacilitiesData {
  facilities: Facility[]
  user: AuthenticatedUser
}

const AllFacilitiesComponent: FC<{ data: FacilitiesData }> = ({ data }) => {
  const { user, facilities } = data

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={<ListSubheader>All Facilities</ListSubheader>}>
      {facilities.map((facility) => (
        <SingleLocationComponent
          key={facility.id}
          locationData={{
            facility,
            user
          }}
        />
      ))}
    </List>
  )
}

export default AllFacilitiesComponent
